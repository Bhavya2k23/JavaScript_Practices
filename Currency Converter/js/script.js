const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

// Replace with your API key from exchangerate-api.com
const API_KEY = "YOUR_API_KEY_HERE"; 

const DEFAULT_FROM = "USD";
const DEFAULT_TO = "EUR";

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        let selected = i == 0 
            ? currency_code == DEFAULT_FROM ? "selected" : "" 
            : currency_code == DEFAULT_TO ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
            imgTag.alt = `${code} flag`;
            // Add animation to flag change
            imgTag.style.animation = "none";
            imgTag.offsetHeight; // Trigger reflow
            imgTag.style.animation = "flagChange 0.5s ease";
        }
    }
}

const style = document.createElement('style');
style.textContent = `
@keyframes flagChange {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
}
`;
document.head.appendChild(style);

window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
    e.target.classList.add("clicked");
    setTimeout(() => {
        e.target.classList.remove("clicked");
    }, 300);
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
    
    // Add exchange animation
    exchangeIcon.classList.add("exchanging");
    setTimeout(() => {
        exchangeIcon.classList.remove("exchanging");
    }, 500);
});

function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    
    if(amountVal == "" || amountVal == "0" || isNaN(amountVal)){
        amount.value = "1";
        amountVal = 1;
    }
    
    exchangeRateTxt.innerHTML = `<div class="loading-spinner"></div> Getting exchange rate...`;
    
    let url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency.value}`;
    
    fetch(url)
        .then(response => {
            if(!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(result => {
            if(result.result === "error") {
                throw new Error(result["error-type"]);
            }
            
            let exchangeRate = result.conversion_rates[toCurrency.value];
            if(!exchangeRate) {
                throw new Error("Currency not found in response");
            }
            
            let totalExRate = (amountVal * exchangeRate).toFixed(2);
            exchangeRateTxt.innerHTML = `
                <div class="result-animation">
                    ${amountVal} ${fromCurrency.value} = 
                    <span class="highlight">${totalExRate}</span> ${toCurrency.value}
                </div>
                <div class="rate-info">1 ${fromCurrency.value} = ${exchangeRate.toFixed(6)} ${toCurrency.value}</div>
            `;
            
            // Add result animation
            exchangeRateTxt.classList.add("show-result");
            setTimeout(() => {
                exchangeRateTxt.classList.remove("show-result");
            }, 1000);
        })
        .catch(error => {
            console.error("Error:", error);
            exchangeRateTxt.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i> 
                    Failed to get rates. Please try again later.
                </div>
            `;
        });
}

// Add styles for new elements
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
.loading-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(102, 126, 234, 0.3);
    border-radius: 50%;
    border-top-color: #667eea;
    animation: spin 1s ease-in-out infinite;
    margin-right: 8px;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.result-animation {
    animation: fadeInUp 0.5s ease;
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.highlight {
    color: #667eea;
    font-weight: 600;
}

.rate-info {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
}

.error-message {
    color: #e74c3c;
}

.error-message i {
    margin-right: 8px;
}

.clicked {
    transform: scale(0.95);
}

.exchanging {
    animation: exchangeFlip 0.5s ease;
}

@keyframes exchangeFlip {
    0% { transform: rotate(0); }
    50% { transform: rotate(180deg) scale(1.2); }
    100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(additionalStyles);