"use strict";

var notes = ["emailed to confirm delivery", "emailed AE regarding rates", "emailed AE about the load status", "information on BOL doesn't match PLS PRO", "don’t pay carrier until customer accepts paperwork", "emailed Support Request to put pro and date", "released w/o BOL per AE", "shipment number on BOL doesn't match PLS PRO", "origin/destination city on BOL doesn't match PLS PRO", "date on BOL doesn't match PLS PRO", "weight on BOL doesn't match PLS PRO"];

var options = {
  subject: function subject() {
    return this.load();
  },
  load: function load() {
    var data = document.getElementById("inputload").value;
    return data ? data : "";
  },
  greeting: function greeting() {
    var checkboxGreeting = document.getElementsByClassName("checkboxGreeting");
    for (var i = 0; i < checkboxGreeting.length; i++) {
      if (checkboxGreeting[i].checked) {
        return checkboxGreeting[i].value;
      }
    }
  },
  receiver: function receiver() {
    var data = document.getElementById("inputReceiver").value;
    var Data = data.charAt(0).toUpperCase() + data.slice(1);
    return data ? " " + Data : "";
  },
  page: function page() {
    var data = document.getElementById("inputPage").value;
    return data ? " (page " + data + ")" : "";
  },
  pageRange: function pageRange() {
    var data1 = document.getElementById("inputPageFrom").value;
    var data2 = document.getElementById("inputPageTo").value;
    return data1 || data2 ? " (pages " + data1 + "-" + data2 + ")" : "";
  },
  fee: function fee() {
    var data = document.getElementById("inputFee").value;
    return data ? data : "";
  },
  document: function (_document) {
    function document() {
      return _document.apply(this, arguments);
    }

    document.toString = function () {
      return _document.toString();
    };

    return document;
  }(function () {
    var data = document.getElementById("inputDocument").value;
    return data ? data : "";
  }),
  ratePRO: function ratePRO() {
    var data = document.getElementById("inputRatePRO").value;
    return data ? data : "";
  },
  ratePW: function ratePW() {
    var data = document.getElementById("inputRatePW").value;
    return data ? data : "";
  },
  client: function client() {
    var checkboxRate = document.getElementsByClassName("checkboxRate");
    for (var i = 0; i < checkboxRate.length; i++) {
      if (checkboxRate[i].checked) {
        return checkboxRate[i].value;
      }
    }
  },
  shipmentPRO: function shipmentPRO() {
    var data = document.getElementById("inputShipmentPRO").value;
    return data ? " (" + data + ")" : "";
  },
  shipmentPW: function shipmentPW() {
    var data = document.getElementById("inputShipmentPW").value;
    return data ? " (" + data + ")" : "";
  },
  incorrectCity: function incorrectCity() {
    var checkboxDirection = document.getElementsByClassName("checkboxDirection");
    for (var i = 0; i < checkboxDirection.length; i++) {
      if (checkboxDirection[i].checked) {
        return checkboxDirection[i].value;
      }
    }
  },
  cityPRO: function cityPRO() {
    var data = document.getElementById("inputCityPRO").value;
    return data ? " (" + data + ")" : "";
  },
  cityPW: function cityPW() {
    var data = document.getElementById("inputCityPW").value;
    return data ? " (" + data + ")" : "";
  },
  datePRO: function datePRO() {
    var data = document.getElementById("inputDatePRO").value;
    return data ? " (" + data + ")" : "";
  },
  datePW: function datePW() {
    var data = document.getElementById("inputDatePW").value;
    return data ? " (" + data + ")" : "";
  },
  weightPRO: function weightPRO() {
    var data = document.getElementById("inputWeightPRO").value;
    return data ? " (" + data + " lbs)" : "";
  },
  weightPW: function weightPW() {
    var data = document.getElementById("inputWeightPW").value;
    return data ? " (" + data + " lbs)" : "";
  },
  carrierPRO: function carrierPRO() {
    var data = document.getElementById("inputCarrierPRO").value;
    return data ? " (" + data + ")" : "";
  },
  carrierPW: function carrierPW() {
    var data = document.getElementById("inputCarrierPW").value;
    return data ? " (" + data + ")" : "";
  },
  pickupDate: function pickupDate() {
    var data = document.getElementById("inputPickupDate").value;
    return data ? data : "";
  },
  cityFrom: function cityFrom() {
    var data = document.getElementById("inputCityFrom").value;
    return data ? data : "";
  },
  cityTo: function cityTo() {
    var data = document.getElementById("inputCityTo").value;
    return data ? data : "";
  },
  numberPRO: function numberPRO() {
    var data = document.getElementById("inputNumberPRO").value;
    return data ? data : "";
  },
  freightBillDate: function freightBillDate() {
    var data = document.getElementById("inputFreightBillDate").value;
    return data ? data : "";
  },
  customer: function customer() {
    var data = document.getElementById("inputCustomer").value;
    return data ? " (" + data + ")" : "";
  },
  gratitude: function gratitude() {
    var checkboxGratitude = document.getElementsByClassName("checkboxGratitude");
    for (var i = 0; i < checkboxGratitude.length; i++) {
      if (checkboxGratitude[i].checked) {
        return checkboxGratitude[i].value;
      }
    }
  }
};

var samples = [{
  name: "BOL is not signed",
  section: "paperwork issues",
  availableOptions: ["greeting", "receiver", "page", "pageRange", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise if we can use the attached BOL" + options.page() + options.pageRange() + " to process " + options.load() + "? Looks like it is not signed by the receiver.\n" + options.gratitude();
  }
}, {
  name: "BOL is not legible",
  section: "paperwork issues",
  availableOptions: ["greeting", "receiver", "page", "pageRange", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise if the attached BOL" + options.page() + options.pageRange() + " is legible enough to process " + options.load() + "?\n" + options.gratitude();
  }
}, {
  name: "using paperwork as BOL",
  section: "paperwork issues",
  availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise if we can use the attached paperwork" + options.page() + options.pageRange() + " as the BOL to process " + options.load() + "?\n" + options.gratitude();
  }
}, {
  name: "paperwork is not complete",
  section: "paperwork issues",
  availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "document", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise if the attached paperwork" + options.page() + options.pageRange() + " is sufficient to process " + options.load() + "? We don\u2019t have " + options.document() + ".\n" + options.gratitude();
  }
}, {
  name: "release sheet",
  section: "paperwork issues",
  availableOptions: ["greeting", "receiver", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease send the release sheet for " + options.load() + ".\n" + options.gratitude();
  }
}, {
  name: "pending pickup",
  section: "status issues",
  availableOptions: ["greeting", "receiver", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease confirm the delivery in PLS PRO.\n" + options.gratitude();
  }
}, {
  name: "claim (to AE)",
  section: "status issues",
  availableOptions: ["greeting", "receiver", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nAccording to the note in PLS PRO, there was a possible claim on " + options.load() + ". Can we process this load now?\n" + options.gratitude();
  }
}, {
  name: "claim (to claims department)",
  section: "status issues",
  availableOptions: ["greeting", "receiver", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise if the claim on load " + options.load() + " has already been resolved? Can we pay the carrier and bill the customer?\n" + options.gratitude();
  }
}, {
  name: "shipment planning",
  section: "status issues",
  availableOptions: ["greeting", "receiver", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nWe've received the paperwork for " + options.load() + " but it\u2019s on shipment planning status in PLS PRO. Is something wrong with this load or is there another id# for this paperwork?\n" + options.gratitude();
  }
}, {
  name: "closed",
  section: "status issues",
  availableOptions: ["greeting", "receiver", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nWe've received the paperwork for " + options.load() + " but it\u2019s closed in PLS PRO. Is something wrong with this load or is there another load id# for this paperwork?\n" + options.gratitude();
  }
}, {
  name: "reopen",
  section: "status issues",
  availableOptions: ["greeting", "receiver", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise if we can reopen and process " + options.load() + " with the attached paperwork?\n" + options.gratitude();
  }
}, {
  name: "cancelled per carrier",
  section: "status issues",
  availableOptions: ["greeting", "receiver", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPer the carrier this load " + options.load() + " was cancelled. Can we close it in the system?\n" + options.gratitude();
  }
}, {
  name: "additional fee",
  section: "rates issues",
  availableOptions: ["greeting", "receiver", "fee", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise if we should add $" + options.fee() + " fee to the carrier's and shipper's rates in PLS PRO for " + options.load() + "?\n" + options.gratitude();
  }
}, {
  name: "mismatching rates",
  section: "rates issues",
  availableOptions: ["greeting", "receiver", "load", "gratitude", "rate"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise which carrier's rate is correct for " + options.load() + "? The carrier\u2019s invoice is showing $" + options.ratePW() + ", PLS PRO - $" + options.ratePRO() + ".\n" + options.gratitude();
  }
}, {
  name: "$0 both rates",
  section: "rates issues",
  availableOptions: ["greeting", "receiver", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise the correct rates for " + options.load() + ". PLS PRO is showing $0.\n" + options.gratitude();
  }
}, {
  name: "$0 shipper's or carrier's rate",
  section: "rates issues",
  availableOptions: ["greeting", "receiver", "load", "client", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise if the " + options.client() + " rate is correct for " + options.load() + ". PLS PRO is showing $0.\n" + options.gratitude();
  }
}, {
  name: "hundred weight",
  section: "rates issues",
  availableOptions: ["greeting", "receiver", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise which weight we should put in PLS PRO for " + options.load() + " to reflect the correct rates (as they are based on hundred weight)? \n" + options.gratitude();
  }
}, {
  name: "number of pieces",
  section: "rates issues",
  availableOptions: ["greeting", "receiver", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise what number of pieces we should put in PLS for " + options.load() + " to reflect the correct rates?\n" + options.gratitude();
  }
}, {
  name: "different shipment numbers",
  section: "something doesn't match",
  availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "shipment", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise if the attached BOL" + options.page() + options.pageRange() + " goes to " + options.load() + "? The shipment number on it" + options.shipmentPW() + " doesn't match PLS PRO" + options.shipmentPRO() + ".\n" + options.gratitude();
  }
}, {
  name: "different cities",
  section: "something doesn't match",
  availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "incorrectCity", "city", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise if the attached BOL" + options.page() + options.pageRange() + " goes to " + options.load() + "? The " + options.incorrectCity() + " city on it" + options.cityPW() + " doesn't match PLS PRO" + options.cityPRO() + ".\n" + options.gratitude();
  }
}, {
  name: "different dates",
  section: "something doesn't match",
  availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "date", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise if the attached BOL" + options.page() + options.pageRange() + " goes to " + options.load() + "? The date on it" + options.datePW() + " doesn't match PLS PRO" + options.datePRO() + ".\n" + options.gratitude();
  }
}, {
  name: "different weights",
  section: "something doesn't match",
  availableOptions: ["greeting", "receiver", "load", "page", "pageRange", "weight", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise if the attached BOL" + options.page() + options.pageRange() + " is complete to process " + options.load() + "? The weight on it" + options.weightPW() + " doesn't match PLS PRO" + options.weightPRO() + ".\n" + options.gratitude();
  }
}, {
  name: "different carrier's names",
  section: "carrier issues",
  availableOptions: ["greeting", "receiver", "load", "carrier", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nThere are different carrier's names on the invoice" + options.carrierPW() + " and in PLS PRO" + options.carrierPRO() + ". The load is " + options.load() + ". Please advise. Is there another id# this paperwork goes to?\n" + options.gratitude();
  }
}, {
  name: "missing paperwork request",
  section: "carrier issues",
  availableOptions: ["greeting", "receiver", "load", "pickupDate", "cities", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nCould you please provide the correct BOL for this shipment?\nPLS LOAD #: " + options.load() + "\nPickup date: " + options.pickupDate() + "\nFrom: " + options.cityFrom() + "\nTo: " + options.cityTo() + "\n" + options.gratitude();
  }
}, {
  name: "carrier doesn't have BOL",
  section: "carrier issues",
  availableOptions: ["greeting", "receiver", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease see below the carrier's answer regarding the paperwork for " + options.load() + ".\n      Could you help to get the paperwork? Or should we close the load?\n" + options.gratitude();
  }
}, {
  name: "carrier doesn't have load in his system",
  section: "carrier issues",
  availableOptions: ["greeting", "receiver", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease see below and advise. Per the carrier they don't have " + options.load() + " in their system. Should we close it in the system?\n" + options.gratitude();
  }
}, {
  name: "no paperwork in Onbase yet",
  section: "misc",
  availableOptions: ["greeting", "receiver", "load", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nWe haven't received the paperwork for " + options.load() + " from the carrier yet.\n" + options.gratitude();
  }
}, {
  name: "WEYERHAEUSER",
  section: "misc",
  availableOptions: ["greeting", "load", "gratitude"],
  messageText: function messageText() {
    return options.greeting() + " Michael,\nPlease advise if the attached paperwork is good to go? Load#: " + options.load() + ".\n" + options.gratitude();
  }
}, {
  name: "put data in PLS PRO",
  section: "TO SUPPORT REQUEST",
  availableOptions: ["greeting", "load", "numberPRO", "freightBillDate", "gratitude"],
  messageText: function messageText() {
    return options.greeting() + ",\nI am not able to add pro# and date for this load " + options.load() + ". Please put the following data in PLS PRO FLEX:\nPRO#: " + options.numberPRO() + "\nFreight bill date: " + options.freightBillDate() + "\n" + options.gratitude();
  }
}, {
  name: "PLS PRO isn't working",
  section: "TO SUPPORT REQUEST",
  availableOptions: ["greeting", "gratitude"],
  messageText: function messageText() {
    return options.greeting() + ",\nPlease be informed that PLS PRO FLEX hasn\u2019t been working about 10 min. We can login but nothing else.\n" + options.gratitude();
  }
}, {
  name: "unable to release to FB status",
  section: "TO SUPPORT REQUEST",
  availableOptions: ["greeting", "gratitude"],
  messageText: function messageText() {
    return options.greeting() + ",\nPlease be informed that we are unable to release loads to field billing status about 10 minutes in PLS PRO FLEX.\n" + options.gratitude();
  }
}, {
  name: "customer's payment",
  section: "TO ACCOUNTS RECEIVABLE",
  availableOptions: ["greeting", "receiver", "load", "customer", "gratitude"],
  messageText: function messageText() {
    return "" + options.greeting() + options.receiver() + ",\nPlease advise if the customer" + options.customer() + " has paid for " + options.load() + "?\n" + options.gratitude();
  }
}];

var currentSample = void 0;

AddDataFromInputsToTextarea();
function AddDataFromInputsToTextarea() {

  function updateTextarea() {
    for (var i = 0; i < samples.length; i++) {
      if (samples[i].name === currentSample) {
        textarea.value = samples[i].messageText();
      }
    }
  }
  var textarea = document.getElementById("textarea");
  var textInputs = document.getElementsByClassName("inputText");
  var subjectLine = document.getElementById("subject");
  var includeLoadToSubjectLineCheckbox = document.getElementById("loadToSubject");
  for (var i = 0; i < textInputs.length; i++) {
    textInputs[i].onkeyup = function () {
      updateTextarea();
      if (includeLoadToSubjectLineCheckbox.checked) {
        subjectLine.value = options.subject();
      }
    };
  }

  includeLoadToSubjectLineCheckbox.onchange = function () {
    if (!includeLoadToSubjectLineCheckbox.checked) {
      subjectLine.value = "";
    } else {
      subjectLine.value = options.subject();
    }
  };

  var page = document.getElementById("inputPage");
  var pageFrom = document.getElementById("inputPageFrom");
  var pageTo = document.getElementById("inputPageTo");
  page.onkeyup = function () {
    pageFrom.value = "";
    pageTo.value = "";
    updateTextarea();
  };
  pageFrom.onkeyup = function () {
    page.value = "";
    updateTextarea();
  };
  pageTo.onkeyup = function () {
    page.value = "";
    updateTextarea();
  };

  UpdateTextAreaOnCheckboxChange("checkboxGreeting");
  UpdateTextAreaOnCheckboxChange("checkboxRate");
  UpdateTextAreaOnCheckboxChange("checkboxDirection");
  UpdateTextAreaOnCheckboxChange("checkboxGratitude");

  function UpdateTextAreaOnCheckboxChange(checkboxClass) {
    var checkboxClassElements = document.getElementsByClassName(checkboxClass);
    for (var _i = 0; _i < checkboxClassElements.length; _i++) {
      checkboxClassElements[_i].onchange = function () {
        updateTextarea();
      };
    }
  }
}