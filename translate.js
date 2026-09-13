/**
 * CodeLoop — Google Translate Auto-Translation Script
 * ====================================================
 * Run this ONCE to auto-translate all website text using Google Cloud Translation API.
 * The output is saved directly to js/translations.js — ready to use, no API key in the browser.
 *
 * Usage:
 *   1. npm install @google-cloud/translate
 *   2. Set your API key in the GOOGLE_API_KEY variable below
 *   3. node translate.js
 *   4. Done! Check js/translations.js for the result.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// ─────────────────────────────────────────────────────────────
// CONFIGURATION — paste your Google Cloud API key here
// ─────────────────────────────────────────────────────────────
const GOOGLE_API_KEY = "PASTE_YOUR_API_KEY_HERE";

// Path to output file (relative to this script)
const OUTPUT_PATH = path.join(__dirname, "js", "translations.js");

// ─────────────────────────────────────────────────────────────
// ENGLISH SOURCE — all text that needs to be translated
// ─────────────────────────────────────────────────────────────
const englishSource = {
  "nav.services": "Services",
  "nav.portfolio": "Portfolio",
  "nav.process": "Process",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.letsTalk": "Let's Talk",
  "hero.badge": "Top Rated Development Agency",
  "hero.subtitle": "CodeLoop delivers enterprise-grade web and software development to businesses worldwide.",
  "hero.ctaPrimary": "Start a Project",
  "hero.ctaSecondary": "View Portfolio",
  "contact.heading": "Ready to Loop In?",
  "contact.subheading": "Let's discuss your project.",
  "contact.fullName": "Full Name",
  "contact.email": "Email Address",
  "contact.serviceNeeded": "Service Needed",
  "contact.budgetRange": "Budget Range",
  "contact.projectDetails": "Project Details",
  "contact.sendMsg": "Send Message",
  "contact.selectService": "-- Select Service --",
  "contact.selectBudget": "-- Select Budget --",
  "contact.disclaimer": "Final pricing depends on project scope — this is a starting guide."
};

// HTML strings that contain tags — translated with format=html
const htmlStrings = {
  "hero.title": 'We build digital products that <span class="text-gradient">scale</span>'
};

// ─────────────────────────────────────────────────────────────
// TARGET LANGUAGES
// ─────────────────────────────────────────────────────────────
const languages = [
  { code: "ur",  googleCode: "ur",    name: "Urdu" },
  { code: "ar",  googleCode: "ar",    name: "Arabic" },
  { code: "de",  googleCode: "de",    name: "German" },
  { code: "fr",  googleCode: "fr",    name: "French" },
  { code: "nl",  googleCode: "nl",    name: "Dutch" },
  { code: "es",  googleCode: "es",    name: "Spanish" },
  { code: "it",  googleCode: "it",    name: "Italian" },
  { code: "hi",  googleCode: "hi",    name: "Hindi" },
  { code: "fil", googleCode: "tl",    name: "Filipino" },
  { code: "zh",  googleCode: "zh-CN", name: "Chinese (Simplified)" }
];

// ─────────────────────────────────────────────────────────────
// GOOGLE TRANSLATE API CALL
// ─────────────────────────────────────────────────────────────
function translateText(text, targetLang, isHtml = false) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      q: text,
      target: targetLang,
      source: "en",
      format: isHtml ? "html" : "text"
    });

    const options = {
      hostname: "translation.googleapis.com",
      path: `/language/translate/v2?key=${GOOGLE_API_KEY}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            reject(new Error(`Google API Error: ${parsed.error.message}`));
          } else {
            resolve(parsed.data.translations[0].translatedText);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ─────────────────────────────────────────────────────────────
// HELPER: Build nested object from flat key "nav.services"
// ─────────────────────────────────────────────────────────────
function setNestedValue(obj, keyPath, value) {
  const keys = keyPath.split(".");
  let curr = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!curr[keys[i]]) curr[keys[i]] = {};
    curr = curr[keys[i]];
  }
  curr[keys[keys.length - 1]] = value;
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────
async function main() {
  if (GOOGLE_API_KEY === "PASTE_YOUR_API_KEY_HERE") {
    console.error("❌ ERROR: Please set your GOOGLE_API_KEY in translate.js before running.");
    process.exit(1);
  }

  console.log("🌐 CodeLoop Translation Script");
  console.log("================================");
  console.log(`Translating ${Object.keys(englishSource).length + Object.keys(htmlStrings).length} strings into ${languages.length} languages...\n`);

  // Start with English (source of truth)
  const allTranslations = {
    en: {
      nav: {
        services: englishSource["nav.services"],
        portfolio: englishSource["nav.portfolio"],
        process: englishSource["nav.process"],
        about: englishSource["nav.about"],
        contact: englishSource["nav.contact"],
        letsTalk: englishSource["nav.letsTalk"]
      },
      hero: {
        badge: englishSource["hero.badge"],
        title: htmlStrings["hero.title"],
        subtitle: englishSource["hero.subtitle"],
        ctaPrimary: englishSource["hero.ctaPrimary"],
        ctaSecondary: englishSource["hero.ctaSecondary"]
      },
      contact: {
        heading: englishSource["contact.heading"],
        subheading: englishSource["contact.subheading"],
        fullName: englishSource["contact.fullName"],
        email: englishSource["contact.email"],
        serviceNeeded: englishSource["contact.serviceNeeded"],
        budgetRange: englishSource["contact.budgetRange"],
        projectDetails: englishSource["contact.projectDetails"],
        sendMsg: englishSource["contact.sendMsg"],
        selectService: englishSource["contact.selectService"],
        selectBudget: englishSource["contact.selectBudget"],
        disclaimer: englishSource["contact.disclaimer"]
      }
    }
  };

  // Translate each language
  for (const lang of languages) {
    console.log(`⏳ Translating to ${lang.name} (${lang.code})...`);
    const langObj = {};

    // Translate plain text strings
    for (const [key, value] of Object.entries(englishSource)) {
      try {
        const translated = await translateText(value, lang.googleCode, false);
        setNestedValue(langObj, key, translated);
        // Small delay to be polite to the API
        await new Promise(r => setTimeout(r, 50));
      } catch (err) {
        console.warn(`  ⚠ Failed to translate "${key}": ${err.message}`);
        setNestedValue(langObj, key, value); // fallback to English
      }
    }

    // Translate HTML strings (preserves <span> tags)
    for (const [key, value] of Object.entries(htmlStrings)) {
      try {
        const translated = await translateText(value, lang.googleCode, true);
        setNestedValue(langObj, key, translated);
        await new Promise(r => setTimeout(r, 50));
      } catch (err) {
        console.warn(`  ⚠ Failed to translate HTML "${key}": ${err.message}`);
        setNestedValue(langObj, key, value); // fallback to English
      }
    }

    allTranslations[lang.code] = langObj;
    console.log(`  ✓ Done — ${lang.name}`);
  }

  // Write output file
  const fileContent = `// AUTO-GENERATED by translate.js — DO NOT EDIT MANUALLY
// Run "node translate.js" to regenerate with fresh translations.
// Generated: ${new Date().toISOString()}

const translations = ${JSON.stringify(allTranslations, null, 2)};
`;

  fs.writeFileSync(OUTPUT_PATH, fileContent, "utf8");
  console.log(`\n✅ Done! Translations written to:\n   ${OUTPUT_PATH}`);
  console.log("\nDo a hard refresh (Cmd+Shift+R) in your browser to see the changes.");
}

main().catch(err => {
  console.error("❌ Fatal error:", err.message);
  process.exit(1);
});
