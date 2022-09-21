let myLeads = [];
const inputEl =document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");

const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));




if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
};


function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li><a href="${leads[i]}" target="_blank">${leads[i]}</a></li>`;
        
        // listItems += '<li><a href="input-el" target="_blank">' + lead[i] + '</a></li>';
        // const li = document.createElement("li");
        // li.textContent = myLead[i];
        // ulEl.append(li);
    };

    ulEl.innerHTML = listItems;
};

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });

    
    // console.log(tabs[0].url);
});

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});









































// function add(num1, num2) {
//     let sum = num1 + num2;
//     return sum;
// }

// console.log(add(3, 4));
// console.log(add(9, 102));


// let arr = ["fir", "sec", "th"]

// function getFirst(ar = []) {
//     return ar[2];
// }

// console.log(getFirst(arr));






// let openBox = document.querySelector(".open-box");
// openBox.addEventListener("click", function() {
//     console.log("i want to open the box!");
// })

// const recipient = 'james';
// const email = `Hey ${recipient}! How is it going? cheers per`;
// console.log(email);