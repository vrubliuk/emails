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
  subject() {
    return this.load();
  },
  load(){
    let data = document.getElementById("inputload").value;
    return data ? data : "";
  },
  
  greeting () {
    let checkboxGreeting = document.getElementsByClassName("checkboxGreeting");
    for (let i = 0; i < checkboxGreeting.length; i++) {
      if (checkboxGreeting[i].checked) {
        return checkboxGreeting[i].value;
      }
    }
  },
  receiver (){
    let data = document.getElementById("inputReceiver").value;
    let Data = data.charAt(0).toUpperCase() + data.slice(1);
    return data ? ` ${Data}` : "";
  },
  page () {
    let data = document.getElementById("inputPage").value;
    return data ? ` (page ${data})`: "";
  },
  pageRange () {
    let data1 = document.getElementById("inputPageFrom").value;
    let data2 = document.getElementById("inputPageTo").value;
    return data1 || data2 ? ` (pages ${data1}-${data2})`: "";
  },
  fee () {
    let data = document.getElementById("inputFee").value;
    return data ? data : "";
  },
  document () {
    let data = document.getElementById("inputDocument").value;
    return data ? data : "";
  },
  ratePRO () {
    let data = document.getElementById("inputRatePRO").value;
    return data ? data : "";
  },
  ratePW () {
    let data = document.getElementById("inputRatePW").value;
    return data ? data : "";
  },
  client () {
    let checkboxRate = document.getElementsByClassName("checkboxRate");
    for (let i = 0; i < checkboxRate.length; i++) {
      if (checkboxRate[i].checked) {
        return checkboxRate[i].value;
      }
    }
  },
  shipmentPRO () {
    let data = document.getElementById("inputShipmentPRO").value;
    return data ? data : "";
  },
  shipmentPW () {
    let data = document.getElementById("inputShipmentPW").value;
    return data ? data : "";
  },
  incorrectCity () {
    let checkboxDirection = document.getElementsByClassName("checkboxDirection");
    for (let i = 0; i < checkboxDirection.length; i++) {
      if (checkboxDirection[i].checked) {
        return checkboxDirection[i].value;
      }
    }
  },

  cityPRO () {
    let data = document.getElementById("inputCityPRO").value;
    return data ? data : "";
  },
  cityPW () {
    let data = document.getElementById("inputCityPW").value;
    return data ? data : "";
  },
  datePRO () {
    let data = document.getElementById("inputDatePRO").value;
    return data ? data : "";
  },
  datePW () {
    let data = document.getElementById("inputDatePW").value;
    return data ? data : "";
  },
  weightPRO () {
    let data = document.getElementById("inputWeightPRO").value;
    return data ? `${data} lbs` : "";
  },
  weightPW () {
    let data = document.getElementById("inputWeightPW").value;
    return data ? `${data} lbs` : "";
  },




  gratitude () {
    let checkboxGratitude = document.getElementsByClassName("checkboxGratitude");
    for (let i = 0; i < checkboxGratitude.length; i++) {
      if (checkboxGratitude[i].checked) {
        return checkboxGratitude[i].value;
      }
    }
  }
};

let samples = [
  {
    name: "BOL is not signed",
    section: "paperwork issues",
    availableOptions: ["greeting", "receiver", "page", "pageRange", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if we can use the attached BOL${options.page()}${options.pageRange()} to process ${options.load()}? Looks like it is not signed by the receiver.\n${options.gratitude()}`;
    }
  },
  {
    name: "BOL is not legible",
    section: "paperwork issues",
    availableOptions: ["greeting", "receiver", "page", "pageRange", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the attached BOL${options.page()}${options.pageRange()} is legible enough to process ${options.load()}?\n${options.gratitude()}`;
    }
  },
  

  {
    name: "Using paperwork as BOL",
    section: "paperwork issues",
    availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if we can use the attached paperwork${options.page()}${options.pageRange()} as the BOL to process ${options.load()}?\n${options.gratitude()}`;
    }
  },
  {
    name: "Paperwork is not complete",
    section: "paperwork issues",
    availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "document", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the attached paperwork${options.page()}${options.pageRange()} is sufficient to process ${options.load()}? We don’t have ${options.document()}.\n${options.gratitude()}`;
    }
  },
  {
    name: "Release sheet",
    section: "paperwork issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease send the release sheet for ${options.load()}.\n${options.gratitude()}`;
    }
  },
  {
    name: "Pending pickup",
    section: "status issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease confirm the delivery in PLS PRO.\n${options.gratitude()}`;
    }
  },
  {
    name: "Shipment planning",
    section: "status issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nWe've received the paperwork for ${options.load()} but it’s on shipment planning status in PLS PRO. Is something wrong with this load or is there another id# for this paperwork?\n${options.gratitude()}`;
    }
  },
  {
    name: "Closed",
    section: "status issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nWe've received the paperwork for ${options.load()} but it’s closed in PLS PRO. Is something wrong with this load or is there another load id# for this paperwork?\n${options.gratitude()}`;
    }
  },
  {
    name: "Reopen",
    section: "status issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if we can reopen and process ${options.load()} with the attached paperwork?\n${options.gratitude()}`;
    }
  },
  {
    name: "Lumper receipt",
    section: "rates issues",
    availableOptions: ["greeting", "receiver", "fee", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if we should add $${options.fee()} fee to the carrier's and shipper's rates in PLS PRO for ${options.load()}?\n${options.gratitude()}`;
    }
  },
  {
    name: "Mismatching rates",
    section: "rates issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude", "rate"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise which carrier's rate is correct for ${options.load()}? PLS PRO is showing $${options.ratePRO()}, the carrier’s invoice - $${options.ratePW()}.\n${options.gratitude()}`;
    }
  },
  {
    name: "$0 both rates",
    section: "rates issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise the correct rates for ${options.load()}. PLS PRO is showing $0.\n${options.gratitude()}`;
    }
  },
  {
    name: "$0 shipper's or carrier's rate",
    section: "rates issues",
    availableOptions: ["greeting", "receiver", "load", "client", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the ${options.client()} rate is correct for ${options.load()}. PLS PRO is showing $0.\n${options.gratitude()}`;
    }
  },
  {
    name: "Hundred weight",
    section: "rates issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise which weight we should put in PLS PRO for ${options.load()} to reflect the correct rates (as they are based on hundred weight)? \n${options.gratitude()}`;
    }
  },
  {
    name: "Number of pieces",
    section: "rates issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise what number of pieces we should put in PLS for ${options.load()} to reflect the correct rates?\n${options.gratitude()}`;
    }
  },






  {
    name: "Different shipment numbers",
    section: "something doesn't match", 
    availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "shipment", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the attached BOL${options.page()}${options.pageRange()} goes to ${options.load()}? The shipment number on it (${options.shipmentPW()}) doesn't match PLS PRO (${options.shipmentPRO()}).\n${options.gratitude()}`;
    }
  },
  {
    name: "Different cities",
    section: "something doesn't match",
    availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "incorrectCity", "city", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the attached BOL${options.page()}${options.pageRange()} goes to ${options.load()}? The ${options.incorrectCity()} city on it (${options.cityPW()}) doesn't match PLS PRO (${options.cityPRO()}).\n${options.gratitude()}`;
    }
  },
  {
    name: "Different dates",
    section: "something doesn't match",
    availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "date", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the attached BOL${options.page()}${options.pageRange()} goes to ${options.load()}? The date on it (${options.datePRO()}) doesn't match PLS PRO (${options.datePRO()}).\n${options.gratitude()}`;
    }
  },
  {
    name: "Different weights",
    section: "something doesn't match",
    availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "weight", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the attached BOL${options.page()}${options.pageRange()} is complete to process ${options.load()}? The weight on it (${options.weightPW()}) doesn't match PLS PRO (${options.weightPRO()}).\n${options.gratitude()}`;
    }
  }


];

let currentSample;


AddDataFromInputsToTextarea();
function AddDataFromInputsToTextarea() {


  function updateTextarea () {
    for (let i = 0; i < samples.length; i++) {
      if (samples[i].name === currentSample) {
        textarea.value = samples[i].messageText();
      }    
    }
  }
  let textarea = document.getElementById("textarea");
  let textInputs = document.getElementsByClassName("inputText");
  let subjectLine = document.getElementById("subject");
  let includeLoadToSubjectLineCheckbox = document.getElementById("loadToSubject");
  for (let i = 0; i < textInputs.length; i++) {
    textInputs[i].onkeyup = () => {
      updateTextarea ();
      if (includeLoadToSubjectLineCheckbox.checked) {
        subjectLine.value = options.subject();
      }



    };
  }

  includeLoadToSubjectLineCheckbox.onchange = () => {
    if (!includeLoadToSubjectLineCheckbox.checked) {
      subjectLine.value = "";
    } else {
      subjectLine.value = options.subject();
    }
  };


  let page = document.getElementById("inputPage");
  let pageFrom = document.getElementById("inputPageFrom");
  let pageTo = document.getElementById("inputPageTo");
  page.onkeyup = () => { 
    pageFrom.value = "";
    pageTo.value = "";
    updateTextarea();
  };
  pageFrom.onkeyup = () => { 
    page.value = "";
    updateTextarea();
  };
  pageTo.onkeyup = () => { 
    page.value = "";
    updateTextarea();
  };

  UpdateTextAreaOnCheckboxChange("checkboxGreeting");
  UpdateTextAreaOnCheckboxChange("checkboxRate");
  UpdateTextAreaOnCheckboxChange("checkboxDirection");
  UpdateTextAreaOnCheckboxChange("checkboxGratitude");

  function UpdateTextAreaOnCheckboxChange(checkboxClass) {
    let checkboxClassElements = document.getElementsByClassName(checkboxClass);
    for (let i = 0; i < checkboxClassElements.length; i++) {
      checkboxClassElements[i].onchange = () => {
        updateTextarea();
      };
    }
  }


}



