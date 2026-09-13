// js/i18n.js
// Handles language switching, translation rendering, and RTL styling.

document.addEventListener("DOMContentLoaded", () => {
  if (typeof translations === "undefined") {
    console.error("Translations dictionary not found.");
    return;
  }

  let currentLang = localStorage.getItem("codeloop_lang") || "en";
  let currentCountry = localStorage.getItem("codeloop_country") || "US";

  const htmlTag = document.documentElement;
  const bodyTag = document.body;

  // Initialize
  setLanguage(currentLang, currentCountry);

  // Custom Dropdown Logic
  const customDropdowns = document.querySelectorAll(".custom-dropdown");
  
  customDropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const label = dropdown.querySelector(".dropdown-label");
    const items = dropdown.querySelectorAll(".dropdown-item");

    // Open/Close
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });

    // Close when clicking outside
    document.addEventListener("click", () => {
      dropdown.classList.remove("open");
    });

    // Handle Item Selection
    items.forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const selectedCountry = item.getAttribute("data-value");
        const selectedText = item.textContent;
        
        // Update label
        label.textContent = selectedText;
        
        // Update active state
        items.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        
        // Close dropdown
        dropdown.classList.remove("open");

        // Set Language
        const lang = getLanguageForCountry(selectedCountry);
        setLanguage(lang, selectedCountry);
      });

      // Set initial active state
      if (item.getAttribute("data-value") === currentCountry) {
        item.classList.add("active");
        label.textContent = item.textContent;
      }
    });
  });

  // Setup global English toggle (if used)
  const engToggles = document.querySelectorAll(".lang-toggle-en");
  engToggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      setLanguage("en", "US"); // Default back to US English
      
      // Update custom dropdowns
      customDropdowns.forEach(dropdown => {
        const label = dropdown.querySelector(".dropdown-label");
        const items = dropdown.querySelectorAll(".dropdown-item");
        items.forEach(item => {
          if (item.getAttribute("data-value") === "US") {
            item.classList.add("active");
            label.textContent = item.textContent;
          } else {
            item.classList.remove("active");
          }
        });
      });
    });
  });

  function getLanguageForCountry(countryCode) {
    if (typeof countryPricingData !== "undefined" && countryPricingData[countryCode]) {
      return countryPricingData[countryCode].lang;
    }
    return "en";
  }

  function setLanguage(lang, countryCode) {
    currentLang = lang;
    currentCountry = countryCode;
    localStorage.setItem("codeloop_lang", lang);
    localStorage.setItem("codeloop_country", countryCode);

    // Update HTML lang attribute
    htmlTag.setAttribute("lang", lang);

    // Handle RTL (Text only, layout stays LTR)
    if (lang === "ar" || lang === "ur") {
      bodyTag.classList.add("rtl-mode");
      htmlTag.removeAttribute("dir"); // Prevent full layout mirroring
    } else {
      bodyTag.classList.remove("rtl-mode");
      htmlTag.removeAttribute("dir");
    }

    // Apply translations
    translateDOM();

    // Trigger pricing update if function exists
    if (typeof updatePricingDropdown === "function") {
      updatePricingDropdown(countryCode);
    }
  }

  function translateDOM() {
    const dict = translations[currentLang] || translations["en"];
    
    // Find all elements with data-i18n attribute
    const elements = document.querySelectorAll("[data-i18n]");
    
    elements.forEach(el => {
      const keyString = el.getAttribute("data-i18n");
      const keys = keyString.split(".");
      
      let value = dict;
      for (const key of keys) {
        if (value === undefined || value[key] === undefined) {
          // Fallback to English if translation is missing
          value = getNestedValue(translations["en"], keys);
          break;
        }
        value = value[key];
      }

      if (value) {
        if (el.tagName.toLowerCase() === "input" || el.tagName.toLowerCase() === "textarea") {
          el.setAttribute("placeholder", value);
        } else {
          el.innerHTML = value;
        }
      }
    });
  }

  function getNestedValue(obj, keys) {
    return keys.reduce((o, k) => (o || {})[k], obj);
  }
});
