const BASE_URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");





for (let select of dropdowns){
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        } 
        select.append(newOption);

    }    
    select.addEventListener("change", (evt)=> {
        updateFlag(evt.target);
    })
};

const updateFlag = (element) => { // element me select option he
    let currCode = element.value; // option ki value INR key 
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img"); // select k parent me ja kar select-container me se img ko select karo
    img.src = newSrc;
};

btn.addEventListener("click", (evt)=> {
    evt.preventDefault();
    updateExchageRate();
        
});


const updateExchageRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value = "1";
    }
    
    
    const URL = `${BASE_URL}/${toCurr.value}_${fromCurr.value}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rate;

    let finalAmount = amountVal * rate;
    
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;


};

window.addEventListener("load",()=> {
    updateExchageRate();
});
