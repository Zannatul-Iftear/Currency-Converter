let catFacts = () => {              // Fetch and show Cat Facts
    const URL="https://cat-fact.herokuapp.com/facts";
    let factText=document.querySelector("#fact");
    let nextBtn=document.querySelector("#nextBtn");
    
    factId=0;
    
    nextBtn.addEventListener("click",()=>{
        factId++;
        if(factId==5) factId=0;
        getFacts();
    })
    
    const getFacts = async () => {
        console.log("Getting data...");
        let response = await fetch(URL);
        let data = await response.json();
        factText.innerText=data[factId].text;
    }
    
    getFacts();
}

//catFacts();

//---------------------------------------------------------------

const dropdowns = document.querySelectorAll(".option select");
const switchBtn = document.querySelector("#switchBtn");
let fromImg = document.querySelector("#fromImg");
let toImg = document.querySelector("#toImg");
//const getButton = document.querySelector("#getButton");
const amount = document.querySelector("#amount");
let resultText1 = document.querySelector("#resultText1");
let resultText2 = document.querySelector("#resultText2");

//let URL="";

let initialize = () => {
    let fromCurrency = "usd";
    let toCurrency = "bdt";
    let multiplier = 1;
    
    let mylink=`https://latest.currency-api.pages.dev/v1/currencies/${fromCurrency}.json`;
    
    (async () => {
        let response = await fetch(mylink);
        let rate = await response.json();
        multiplier=rate[fromCurrency][toCurrency];
        let n=Number(amount.value);
        if(n!=NaN){
            n*=multiplier;
            n=n.toFixed(2);
            multiplier=multiplier.toFixed(2);
            resultText1.innerText=`${amount.value} ${dropdowns[0].value} = ${n} ${dropdowns[1].value}`;
            resultText2.innerText=`Exchange rate: 1 ${dropdowns[0].value} = ${multiplier} ${dropdowns[1].value}`;
        }
    })();
}

initialize();

let updateText = () => {
    let fromCurrency = dropdowns[0].value.toLowerCase();
    let toCurrency = dropdowns[1].value.toLowerCase();
    let multiplier = 1;

    console.log(fromCurrency);
    console.log(toCurrency);
    
    let mylink=`https://latest.currency-api.pages.dev/v1/currencies/${fromCurrency}.json`;
    
    (async () => {
        let response = await fetch(mylink);
        let rate = await response.json();
        multiplier=rate[fromCurrency][toCurrency];
        let n=Number(amount.value);
        if(n!=NaN){
            n*=multiplier;
            n=n.toFixed(2);
            multiplier=multiplier.toFixed(2);
            resultText1.innerText=`${amount.value} ${dropdowns[0].value} = ${n} ${dropdowns[1].value}`;
            resultText2.innerText=`Exchange rate: 1 ${dropdowns[0].value} = ${multiplier} ${dropdowns[1].value}`;
        }
    })();
}

amount.addEventListener("keypress", updateText);

for(let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && currCode==="BDT"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
        updateText();
    });
}

const updateFlag = (element) => {
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let flagLink=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=flagLink;
}

const updateFlags = (from,to) => {
    fromLink=`https://flagsapi.com/${countryList[from]}/flat/64.png`;
    toLink=`https://flagsapi.com/${countryList[to]}/flat/64.png`;
    fromImg.src=fromLink;
    toImg.src=toLink;
}

switchBtn.addEventListener("click",()=>{
    temp=dropdowns[0].value;
    dropdowns[0].value=dropdowns[1].value;
    dropdowns[1].value=temp;
    updateFlags(dropdowns[0].value,dropdowns[1].value);
    updateText();
})


