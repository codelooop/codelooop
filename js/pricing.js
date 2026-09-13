const countryPricingData = {
  "PK": { "name": "Pakistan", "lang": "ur", "currency": "PKR", "symbol": "Rs ", "webDev": [300, 1500], "shopify": [400, 2000], "wordpress": [250, 1200], "crm": [1500, 8000], "woocommerce": [400, 2000] },
  "US": { "name": "United States", "lang": "en", "currency": "USD", "symbol": "$", "webDev": [2000, 12000], "shopify": [2500, 15000], "wordpress": [1500, 8000], "crm": [8000, 50000], "woocommerce": [2500, 15000] },
  "UK": { "name": "United Kingdom", "lang": "en", "currency": "GBP", "symbol": "£", "webDev": [1800, 10000], "shopify": [2200, 13000], "wordpress": [1300, 7000], "crm": [7000, 45000], "woocommerce": [2200, 13000] },
  "CA": { "name": "Canada", "lang": "en", "currency": "CAD", "symbol": "C$", "webDev": [1800, 10000], "shopify": [2200, 13000], "wordpress": [1300, 7000], "crm": [7000, 45000], "woocommerce": [2200, 13000] },
  "AU": { "name": "Australia", "lang": "en", "currency": "AUD", "symbol": "A$", "webDev": [1800, 10000], "shopify": [2200, 13000], "wordpress": [1300, 7000], "crm": [7000, 45000], "woocommerce": [2200, 13000] },
  "AE": { "name": "UAE", "lang": "ar", "currency": "AED", "symbol": "AED ", "webDev": [1500, 9000], "shopify": [2000, 12000], "wordpress": [1000, 6000], "crm": [6000, 40000], "woocommerce": [2000, 12000] },
  "SA": { "name": "Saudi Arabia", "lang": "ar", "currency": "SAR", "symbol": "SAR ", "webDev": [1500, 9000], "shopify": [2000, 12000], "wordpress": [1000, 6000], "crm": [6000, 40000], "woocommerce": [2000, 12000] },
  "DE": { "name": "Germany", "lang": "de", "currency": "EUR", "symbol": "€", "webDev": [1700, 9500], "shopify": [2000, 12000], "wordpress": [1200, 6500], "crm": [6500, 42000], "woocommerce": [2000, 12000] },
  "FR": { "name": "France", "lang": "fr", "currency": "EUR", "symbol": "€", "webDev": [1600, 9000], "shopify": [1900, 11500], "wordpress": [1100, 6000], "crm": [6000, 40000], "woocommerce": [1900, 11500] },
  "NL": { "name": "Netherlands", "lang": "nl", "currency": "EUR", "symbol": "€", "webDev": [1700, 9500], "shopify": [2000, 12000], "wordpress": [1200, 6500], "crm": [6500, 42000], "woocommerce": [2000, 12000] },
  "ES": { "name": "Spain", "lang": "es", "currency": "EUR", "symbol": "€", "webDev": [1300, 7500], "shopify": [1600, 9500], "wordpress": [900, 5000], "crm": [5000, 32000], "woocommerce": [1600, 9500] },
  "IT": { "name": "Italy", "lang": "it", "currency": "EUR", "symbol": "€", "webDev": [1300, 7500], "shopify": [1600, 9500], "wordpress": [900, 5000], "crm": [5000, 32000], "woocommerce": [1600, 9500] },
  "IE": { "name": "Ireland", "lang": "en", "currency": "EUR", "symbol": "€", "webDev": [1700, 9500], "shopify": [2000, 12000], "wordpress": [1200, 6500], "crm": [6500, 42000], "woocommerce": [2000, 12000] },
  "SG": { "name": "Singapore", "lang": "zh", "currency": "SGD", "symbol": "S$", "webDev": [1600, 9000], "shopify": [1900, 11000], "wordpress": [1100, 5800], "crm": [6000, 38000], "woocommerce": [1900, 11000] },
  "QA": { "name": "Qatar", "lang": "ar", "currency": "QAR", "symbol": "QAR ", "webDev": [1500, 9000], "shopify": [2000, 12000], "wordpress": [1000, 6000], "crm": [6000, 40000], "woocommerce": [2000, 12000] },
  "KW": { "name": "Kuwait", "lang": "ar", "currency": "KWD", "symbol": "KWD ", "webDev": [1500, 9000], "shopify": [2000, 12000], "wordpress": [1000, 6000], "crm": [6000, 40000], "woocommerce": [2000, 12000] },
  "IN": { "name": "India", "lang": "hi", "currency": "INR", "symbol": "₹", "webDev": [500, 2500], "shopify": [700, 3500], "wordpress": [400, 2000], "crm": [2500, 12000], "woocommerce": [700, 3500] },
  "PH": { "name": "Philippines", "lang": "fil", "currency": "PHP", "symbol": "₱", "webDev": [500, 2500], "shopify": [700, 3500], "wordpress": [400, 2000], "crm": [2500, 12000], "woocommerce": [700, 3500] },
  "NG": { "name": "Nigeria", "lang": "en", "currency": "NGN", "symbol": "₦", "webDev": [500, 2800], "shopify": [700, 3800], "wordpress": [400, 2200], "crm": [2800, 14000], "woocommerce": [700, 3800] },
  "ZA": { "name": "South Africa", "lang": "en", "currency": "ZAR", "symbol": "R ", "webDev": [800, 4000], "shopify": [1000, 5500], "wordpress": [600, 3000], "crm": [4000, 22000], "woocommerce": [1000, 5500] },
  "NZ": { "name": "New Zealand", "lang": "en", "currency": "NZD", "symbol": "NZ$", "webDev": [1800, 10000], "shopify": [2200, 13000], "wordpress": [1300, 7000], "crm": [7000, 45000], "woocommerce": [2200, 13000] }
};

// Function to populate the budget dropdown based on selected country
function updatePricingDropdown(countryCode) {
  const data = countryPricingData[countryCode] || countryPricingData["US"]; // Fallback to US
  const budgetSelect = document.getElementById("form-budget");
  
  if (!budgetSelect) return;

  // Clear existing options
  budgetSelect.innerHTML = "";
  
  // Create default option (needs i18n support)
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = translations[data.lang]?.contact?.selectBudget || "-- Select Budget --";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  budgetSelect.appendChild(defaultOption);

  // Format currency
  const formatCurrency = (val) => {
    return data.symbol + val.toLocaleString();
  };

  // Add the ranges
  const services = [
    { key: "webDev", label: "Web Development (Custom)" },
    { key: "shopify", label: "Shopify Store" },
    { key: "wordpress", label: "WordPress Site" },
    { key: "crm", label: "Custom CRM/Software" },
    { key: "woocommerce", label: "WooCommerce Store" }
  ];

  services.forEach(service => {
    const range = data[service.key];
    const option = document.createElement("option");
    option.value = service.key;
    option.textContent = `${service.label} (${formatCurrency(range[0])} - ${formatCurrency(range[1])})`;
    budgetSelect.appendChild(option);
  });
}

