const converterForm = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

// Currency data with symbols, country names, and flag emojis
const currencyData = {
  USD: { symbol: "$", country: "United States", flag: "🇺🇸" },
  EUR: { symbol: "€", country: "European Union", flag: "🇪🇺" },
  GBP: { symbol: "£", country: "United Kingdom", flag: "🇬🇧" },
  JPY: { symbol: "¥", country: "Japan", flag: "🇯🇵" },
  AUD: { symbol: "$", country: "Australia", flag: "🇦🇺" },
  CAD: { symbol: "$", country: "Canada", flag: "🇨🇦" },
  CHF: { symbol: "CHF", country: "Switzerland", flag: "🇨🇭" },
  CNY: { symbol: "¥", country: "China", flag: "🇨🇳" },
  INR: { symbol: "₹", country: "India", flag: "🇮🇳" },
  BRL: { symbol: "R$", country: "Brazil", flag: "🇧🇷" },
  // Add more currencies as needed
};

window.addEventListener("load", fetchCurrencies);
converterForm.addEventListener("submit", convertCurrency);

async function fetchCurrencies() {
  const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await response.json();
  const currencyOptions = Object.keys(data.rates);

  currencyOptions.forEach((currency) => {
    const currencyInfo = currencyData[currency] || { 
      symbol: currency, 
      country: currency, 
      flag: "" 
    };
    
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = `${currencyInfo.flag} ${currency} - ${currencyInfo.country} (${currencyInfo.symbol})`;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = `${currencyInfo.flag} ${currency} - ${currencyInfo.country} (${currencyInfo.symbol})`;
    toCurrency.appendChild(option2);
  });
}

async function convertCurrency(e) {
  e.preventDefault();

  const amount = parseFloat(amountInput.value);
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  if (amount < 0 || isNaN(amount)) {
    alert("Please enter a valid amount");
    return;
  }

  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`);
  const data = await response.json();

  const rate = data.rates[toCurrencyValue];
  const convertedAmount = (amount * rate).toFixed(2);

  // Get currency info for display
  const fromCurrencyInfo = currencyData[fromCurrencyValue] || { symbol: fromCurrencyValue, flag: "" };
  const toCurrencyInfo = currencyData[toCurrencyValue] || { symbol: toCurrencyValue, flag: "" };

  resultDiv.innerHTML = `
    <div class="result-container">
      <div class="currency-display">
        <span class="flag">${fromCurrencyInfo.flag}</span>
        <span class="amount">${amount} ${fromCurrencyValue}</span>
        <span class="symbol">${fromCurrencyInfo.symbol}</span>
      </div>
      <div class="conversion-arrow">→</div>
      <div class="currency-display">
        <span class="flag">${toCurrencyInfo.flag}</span>
        <span class="amount">${convertedAmount} ${toCurrencyValue}</span>
        <span class="symbol">${toCurrencyInfo.symbol}</span>
      </div>
      <div class="rate-info">
        <p>1 ${fromCurrencyValue} = ${rate} ${toCurrencyValue}</p>
      </div>
    </div>
  `;
}