"use strict";

let notes = [
  "emailed to confirm delivery",
  "emailed AE regarding rates",
  "emailed AE about the load status",
  "information on BOL doesn't match PLS PRO",
  "don’t pay carrier until customer accepts paperwork",
  "emailed Support Request to put pro and date",
  "released w/o BOL per AE",
  "shipment number on BOL doesn't match PLS PRO",
  "origin/destination city on BOL doesn't match PLS PRO",
  "date on BOL doesn't match PLS PRO",
  "weight on BOL doesn't match PLS PRO"
];

let options = {
  subject:"",
  // load(){
  //   return document.getElementById("inputload").value ? document.getElementById("inputload").value : "";
  // },
  load: "",
  greeting:"",
  receiver: "",
  pageNumber: "",
  page:`(page ${this.pageNumber})`,
  pageFrom: null,
  pageTo: null,
  pageRange: `(pages ${this.pageFrom}-${this.pageTo})`,
  fee: "",
  missing: "",
  gratitude:""
};

let samples = [
  {
    section: "most popular issues",
    name: "BOL is not signed",
    messageText: `${options.greeting} ${options.receiver}\nPlease advise if we can use the attached BOL${options.page}${options.pageRange}${options.load}? Looks like it is not signed by the receiver.\n${options.gratitude}`

  },
  {
    section: "most popular issues",
    name: "BOL is not legible",
    messageText: `${options.greeting} ${options.receiver}\nPlease advise if the attached BOL ${options.page}${options.pageRange}is legible enough to process ${options.load}?\n${options.gratitude}`
  }
];





// function pullDataFromInputs() {
//   day = ("0" + inputDay.value).slice(-2),
//       month = ("0" + inputMonth.value).slice(-2),
//       year = inputYear.value,
//       coldWater = inputColdWater.value,
//       hotWater = inputHotWater.value,
//       gas = inputGas.value;
// }
  
function pull() {
  var x = document.getElementById("inputload").value;
  options.load = x;
  // alert(options.load)
}





let allInputs = document.getElementsByClassName("inputsOptions");
for (let i = 0; i < allInputs.length; i++) {
  allInputs[i].onkeyup = () => {
    pull();
    var textarea = document.getElementById("textarea");
    textarea.value = options.load;

  };
} 

