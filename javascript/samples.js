"use strict";

let notes = [
  "emailed to confirm delivery",
  "emailed AE regarding rates",
  "emailed AE about the load status",
  "don't pay carrier until customer accepts paperwork",
  "emailed Support Request to put pro and date",
  "released w/o BOL per AE",
  "information on BOL doesn't match PLS PRO",
  "shipment number on BOL doesn't match PLS PRO",
  "origin/destination city on BOL doesn't match PLS PRO",
  "date on BOL doesn't match PLS PRO",
  "weight on BOL doesn't match PLS PRO",
  "sorry, we don't work with non FS or 2.0 loads"
];

let currentSample;

let options = {
  subject() {
    if (currentSample === "statistics") {
      let date = new Date();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);
      let year = date.getFullYear();
      return `statistics ${month}/${day}/${year}`;
    }
    return this.load() ? this.load() : "";
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
    if (this.greeting()) {
      return data ? ` ${Data}` : "";
    } else {
      return data ? `${Data}` : "";
    }
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
  typeFee () {
    let data = document.getElementById("inputTypeFee").value;
    return data ? ` ${data}` : "";
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
    return data ? ` (${data})` : "";
  },
  shipmentPW () {
    let data = document.getElementById("inputShipmentPW").value;
    return data ? ` (${data})` : "";
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
    let data = document.getElementById("inputCityPRO").value.toUpperCase();
    return data ? ` (${data})` : "";
  },
  cityPW () {
    let data = document.getElementById("inputCityPW").value.toUpperCase();
    return data ? ` (${data})` : "";
  },
  datePRO () {
    let data = document.getElementById("inputDatePRO").value;
    return data ? ` (${data})` : "";
  },
  datePW () {
    let data = document.getElementById("inputDatePW").value;
    return data ? ` (${data})` : "";
  },
  weightPRO () {
    let data = document.getElementById("inputWeightPRO").value;
    return data ? ` (${data} lbs)` : "";
  },
  weightPW () {
    let data = document.getElementById("inputWeightPW").value;
    return data ? ` (${data} lbs)` : "";
  },
  carrierPRO  () {
    let data = document.getElementById("inputCarrierPRO").value.toUpperCase();
    return data ?  ` ${data}` : "";
  },
  carrierPW  () {
    let data = document.getElementById("inputCarrierPW").value.toUpperCase();
    return data ?  ` ${data}` : "";
  },
  pickupDate () {
    let data = document.getElementById("inputPickupDate").value;
    return data ? data : "";
  },
  cityFrom () {
    let data = document.getElementById("inputCityFrom").value.toUpperCase();
    return data ? data : "";
  },
  cityTo () {
    let data = document.getElementById("inputCityTo").value.toUpperCase();
    return data ? data : "";
  },
  numberPRO () {
    let data = document.getElementById("inputNumberPRO").value;
    return data ? data : "";
  },
  freightBillDate () {
    let data = document.getElementById("inputFreightBillDate").value;
    return data ? data : "";
  },
  customer () {
    let data = document.getElementById("inputCustomer").value.toUpperCase();
    return data ? ` (${data})` : "";
  },
  released () {
    let data = document.getElementById("inputReleased").value;
    return data ? data : "";
  },
  fsBilling () {
    let checkbox = document.getElementById("fsBilling");
    return checkbox.checked ? `\nFS Billing emails`: "";
  },
  audit () {
    let checkbox = document.getElementById("audit");
    return checkbox.checked ? `\nAudit`: "";
  },
  report () {
    let checkbox = document.getElementById("report");
    return checkbox.checked ? `\nReport`: "";
  },
  gratitude () {
    let checkboxGratitude = document.getElementsByClassName("checkboxGratitude");
    for (let i = 0; i < checkboxGratitude.length; i++) {
      if (checkboxGratitude[i].checked) {
        return checkboxGratitude[i].value ? `\n${checkboxGratitude[i].value}` : "";
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
      return `${options.greeting()}${options.receiver()},\nPlease advise if we can use the attached BOL${options.page()}${options.pageRange()} to process ${options.load()}? Looks like it is not signed by the receiver.${options.gratitude()}`;
    }
  },
  {
    name: "BOL is not legible",
    section: "paperwork issues",
    availableOptions: ["greeting", "receiver", "page", "pageRange", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the attached BOL${options.page()}${options.pageRange()} is legible enough to process ${options.load()}?${options.gratitude()}`;
    }
  },
  {
    name: "using paperwork as BOL",
    section: "paperwork issues",
    availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if we can use the attached paperwork${options.page()}${options.pageRange()} as the BOL to process ${options.load()}?${options.gratitude()}`;
    }
  },
  {
    name: "paperwork is not complete",
    section: "paperwork issues",
    availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "document", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the attached paperwork${options.page()}${options.pageRange()} is sufficient to process ${options.load()}? We don't have ${options.document()}.${options.gratitude()}`;
    }
  },
  {
    name: "release sheet",
    section: "paperwork issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease send the release sheet for ${options.load()}.${options.gratitude()}`;
    }
  },
  {
    name: "pending pickup",
    section: "status issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease confirm the delivery in PLS PRO.${options.gratitude()}`;
    }
  },
  {
    name: "claim (to AE)",
    section: "status issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nAccording to the note in PLS PRO, there was a possible claim on ${options.load()}. Can we process this load now?${options.gratitude()}`;
    }
  },

  {
    name: "claim (to claims department)",
    section: "status issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the claim on load ${options.load()} has already been resolved? Can we pay the carrier and bill the customer?${options.gratitude()}`;
    }
  },
  {
    name: "shipment planning",
    section: "status issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nWe've received the paperwork for ${options.load()} but it’s on shipment planning status in PLS PRO.\nIs something wrong with this load or is there another id# for this paperwork?${options.gratitude()}`;
    }
  },
  {
    name: "closed",
    section: "status issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nWe've received the paperwork for ${options.load()} but it’s closed in PLS PRO.\nIs something wrong with this load or is there another load id# for this paperwork?${options.gratitude()}`;
    }
  },
  {
    name: "reopen",
    section: "status issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if we can reopen and process ${options.load()} with the attached paperwork?${options.gratitude()}`;
    }
  },
  {
    name: "cancelled per carrier",
    section: "status issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPer the carrier this load ${options.load()} was cancelled. Can we close it in the system?${options.gratitude()}`;
    }
  },
  {
    name: "additional fee",
    section: "rates issues",
    availableOptions: ["greeting", "receiver", "fee", "typeFee", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if we should add $${options.fee()}${options.typeFee()} fee to the carrier's and shipper's rates in PLS PRO for ${options.load()}?${options.gratitude()}`;
    }
  },
  {
    name: "mismatching rates",
    section: "rates issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude", "rate"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise which carrier's rate is correct for ${options.load()}? The carrier’s invoice is showing $${options.ratePW()}, PLS PRO - $${options.ratePRO()}.${options.gratitude()}`;
    }
  },
  {
    name: "$0 both rates",
    section: "rates issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise the correct rates for ${options.load()}. PLS PRO is showing $0.${options.gratitude()}`;
    }
  },
  {
    name: "$0 shipper's or carrier's rate",
    section: "rates issues",
    availableOptions: ["greeting", "receiver", "load", "client", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the ${options.client()} rate is correct for ${options.load()}. PLS PRO is showing $0.${options.gratitude()}`;
    }
  },
  {
    name: "hundred weight",
    section: "rates issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise which weight we should put in PLS PRO for ${options.load()} to reflect the correct rates (as they are based on hundred weight)?${options.gratitude()}`;
    }
  },
  {
    name: "number of pieces",
    section: "rates issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise which number of pieces we should put in PLS for ${options.load()} to reflect the correct rates?${options.gratitude()}`;
    }
  },
  {
    name: "different shipment numbers",
    section: "something doesn't match", 
    availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "shipment", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the attached BOL${options.page()}${options.pageRange()} goes to ${options.load()}? The shipment number on it${options.shipmentPW()} doesn't match PLS PRO${options.shipmentPRO()}.${options.gratitude()}`;
    }
  },
  {
    name: "different cities",
    section: "something doesn't match",
    availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "incorrectCity", "city", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the attached BOL${options.page()}${options.pageRange()} goes to ${options.load()}? The ${options.incorrectCity()} city on it${options.cityPW()} doesn't match PLS PRO${options.cityPRO()}.${options.gratitude()}`;
    }
  },
  {
    name: "different dates",
    section: "something doesn't match",
    availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "date", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the attached BOL${options.page()}${options.pageRange()} goes to ${options.load()}? The date on it${options.datePW()} doesn't match PLS PRO${options.datePRO()}.${options.gratitude()}`;
    }
  },
  {
    name: "different weights",
    section: "something doesn't match",
    availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "weight", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the attached BOL${options.page()}${options.pageRange()} is complete to process ${options.load()}? The weight on it${options.weightPW()} doesn't match PLS PRO${options.weightPRO()}.${options.gratitude()}`;
    }
  },
  {
    name: "different carrier's names",
    section: "carrier issues",
    availableOptions: ["greeting", "receiver", "load", "carrier", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise which carrier is correct for ${options.load()}? The invoice is showing${options.carrierPW()}, PLS PRO -${options.carrierPRO()}.${options.gratitude()}`;
    }
  },
  {
    name: "missing paperwork request",
    section: "carrier issues",
    availableOptions: ["greeting", "receiver", "load", "pickupDate", "cities", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nCould you please provide the correct BOL for this shipment?\nPLS LOAD #: ${options.load()}\nPickup date: ${options.pickupDate()}\nFrom: ${options.cityFrom()}\nTo: ${options.cityTo()}${options.gratitude()}`;
    }
  },
  {
    name: "carrier doesn't have BOL",
    section: "carrier issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease see below the carrier's answer regarding the paperwork for ${options.load()}. Could you help to get the paperwork? Or should we close the load?${options.gratitude()}`;
    }
  },
  {
    name: "carrier doesn't have load in his system",
    section: "carrier issues",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease see below and advise. Per the carrier they don't have ${options.load()} in their system. Should we close it in the system?${options.gratitude()}`;
    }
  },
  {
    name: "put data in PLS PRO",
    section: "TO SUPPORT REQUEST",
    availableOptions: ["greeting", "load", "numberPRO", "freightBillDate", "gratitude"],
    messageText () {
      return `${options.greeting()},\nI am not able to add pro# and date for this load ${options.load()}. Please put the following data in PLS PRO FLEX:\nPRO#: ${options.numberPRO()}\nFreight bill date: ${options.freightBillDate()}${options.gratitude()}`;
    }
  },
  {
    name: "PLS PRO isn't working",
    section: "TO SUPPORT REQUEST",
    availableOptions: ["greeting", "gratitude"],
    messageText () {
      return `${options.greeting()},\nPlease be informed that PLS PRO FLEX hasn’t been working about 10 min. We can login but nothing else.${options.gratitude()}`;
    }
  },
  {
    name: "unable to release to FB status",
    section: "TO SUPPORT REQUEST",
    availableOptions: ["greeting", "gratitude"],
    messageText () {
      return `${options.greeting()},\nPlease be informed that we are unable to release loads to field billing status about 10 minutes in PLS PRO FLEX.${options.gratitude()}`;
    }
  },
  {
    name: "customer's payment",
    section: "TO ACCOUNTS RECEIVABLE",
    availableOptions: ["greeting", "receiver", "load", "customer", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the customer${options.customer()} has paid for ${options.load()}?${options.gratitude()}`;
    }
  },
  {
    name: "no paperwork in Onbase yet",
    section: "misc",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nWe haven't received the paperwork for ${options.load()} from the carrier yet.${options.gratitude()}`;
    }
  },
  {
    name: "WEYERHAEUSER",
    section: "misc",
    availableOptions: ["greeting", "receiver", "load", "gratitude"],
    messageText () {
      return `${options.greeting()}${options.receiver()},\nPlease advise if the attached paperwork is good to go? Load#: ${options.load()}.${options.gratitude()}`;
    }
  },
  {
    name: "statistics",
    section: "misc",
    availableOptions: ["released", "otherActivities"],
    messageText () {
      return `Released: ${options.released()}${options.fsBilling()}${options.audit()}${options.report()}`;
    }
  }
];