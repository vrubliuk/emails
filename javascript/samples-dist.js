"use strict";

var notes = ["emailed to confirm delivery", "emailed AE regarding rates", "emailed AE about the load status", "information on BOL doesn't match PLS PRO", "don’t pay carrier until customer accepts paperwork", "emailed Support Request to put pro and date", "released w/o BOL per AE", "shipment number on BOL doesn't match PLS PRO", "origin/destination city on BOL doesn't match PLS PRO", "date on BOL doesn't match PLS PRO", "weight on BOL doesn't match PLS PRO"];

var options = {
  subject: "",
  load: "",
  greeting: "Hi",
  pageNumber: null,
  page: "(page " + undefined.pageNumber + ")",
  pageFrom: null,
  pageTo: null,
  pageRange: "(pages " + undefined.pageFrom + "-" + undefined.pageTo + ")",
  fee: "",
  gratitude: "Thanks"
};

var samples = [{
  name: "BOL is not signed",
  messageText: options.greeting + "\nPlease advise if we can use the attached BOL to process ? It is not signed by the receiver.\nThanks",
  section: "most popular issues"
}, {
  name: "BOL is not signed (not sure)",
  messageText: "Hi\nPlease advise if we can use the attached BOL to process ? I am not sure if it is signed by the receiver.\nThanks",
  section: "most popular issues"
}];