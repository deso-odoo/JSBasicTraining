const currencyInput = document.getElementById("currencyInput");
const currencies = document.getElementById("currencies");
const currenciesFrom = document.getElementById("currenciesFrom");
const output = document.getElementById("Output");
const convert = document.getElementById("convert");
const convertedCurrency = document.getElementById("convertedCurrency");
const exchangeRateValue = document.getElementById("exchangeRateValue");
const exchangeRateValueUnit = document.getElementById("exchangeRateValueUnit");
const currencyInputUnit = document.getElementById("currencyInputUnit");

const converter = async () => {
    try{
        const response = await fetch("https://v6.exchangerate-api.com/v6/aea28dd2422bef2fbc2f581a/latest/INR");
        const data = await response.json();
        const entries = Object.entries(data.conversion_rates);
        entries.map(([key, val] = entry) => {
            currencies.innerHTML += `<option value="${val.toFixed(3)}">${key}</option>`;
            currenciesFrom.innerHTML += `<option value="${val.toFixed(3)}">${key}</option>`;
        });
    }catch(error){
        output.innerHTML = "Opps there is an error, Try again Later!!!"
        console.log(error)
    }
};

converter();

const convertFromOtherCurrency = async () =>{
    try{
        const country = currenciesFrom.options[currenciesFrom.selectedIndex].text
        const response = await fetch(`https://v6.exchangerate-api.com/v6/aea28dd2422bef2fbc2f581a/latest/${country}`);
        const data = await response.json();
        const entries = Object.entries(data.conversion_rates);
        currencies.innerHTML = "";
        entries.map(([key, val] = entry) => {
            currencies.innerHTML += `<option value="${val.toFixed(3)}">${key}</option>`;
        })
    }catch(error){
        output.innerHTML = "Opps there is an error, Try again Later!!!"
        console.log(error)
    }
}
currenciesFrom.addEventListener('change', ()=>{
    currencyInputUnit.innerText = currenciesFrom.options[currenciesFrom.selectedIndex].text;
    convertFromOtherCurrency()
})

convert.addEventListener("click", () => {
    const x = currencies.value;
    output.innerText = (x * currencyInput.value).toFixed(3);
    convertedCurrency.innerText = currencies.options[currencies.selectedIndex].text;
    exchangeRateValue.innerText = x;
    exchangeRateValueUnit.innerText = currencies.options[currencies.selectedIndex].text;
});
