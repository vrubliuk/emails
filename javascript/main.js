(function () {
  "use strict";

  //GENERAL
  includeNotesToMarkup();
  includeSamplesToMarkup();

  class Email {
    constructor(object) {
      this.name = object.name;
      this.messageText = object.messageText;
      this.availableOptions = object.availableOptions;
      this.subject = document.getElementById("subject");
      this.textarea = document.getElementById("textarea");
      this.getButton = () => {
        let buttonAll = document.getElementsByClassName("email");
        for (let i = 0; i < buttonAll.length; i++) {
          if (buttonAll[i].innerHTML.toLowerCase() === this.name.toLowerCase()) {
            return buttonAll[i];
          }
        }
      };
      this.button = this.getButton();
      this.showAvailableOptions = () => {
        for (let i = 0; i < this.availableOptions.length; i++) {
          let option = this.availableOptions[i].charAt(0).toUpperCase() + this.availableOptions[i].slice(1);
          document.getElementById("optionsTitle").style.display = "block";
          document.getElementById("row" + option).style.display = "block";
        }
      };
      this.button.onclick = () => {
        currentSample = this.name;
        hideAllOptions();
        clearTextInputs();
        access.lock();
        window.getSelection().removeAllRanges();
        // if (currentSample === "WEYERHAEUSER") {
        //   document.getElementById("inputReceiver").value = "Michael";
        // }
        let text = this.messageText();
        if (text.charAt(0) === ",") {
          text = text.slice(1);
          text = text.replace(/\n/, '');
        }
        this.textarea.value = text;
        this.showAvailableOptions();
        if (this.name === "statistics") {
          let date = new Date();
          let month = ("0" + (date.getMonth() + 1)).slice(-2);
          let day = ("0" + date.getDate()).slice(-2);
          let year = date.getFullYear();
          this.subject.value = `statistics ${month}/${day}/${year}`;
        }
      };

    }
  }

  for (let i = 0; i < samples.length; i++) {
    new Email(samples[i]);
  }

  function includeNotesToMarkup() {
    let section = document.getElementById("notesPanel");
    for (let i = 0; i < notes.length; i++) {
      let phraseContainer = document.createElement('div');
      phraseContainer.classList.add("phraseContainer");
      let phrase = document.createElement('span');
      phrase.classList.add("phrase");
      phrase.innerHTML = notes[i];
      let quickCopy = document.createElement('button');
      quickCopy.classList.add("quickCopy");
      let text = document.createElement('span');
      text.classList.add("quickCopyText");
      text.innerHTML = "Copy";
      quickCopy.appendChild(text);
      section.appendChild(phraseContainer);
      phraseContainer.appendChild(phrase);
      phraseContainer.appendChild(quickCopy);

    }
  }

  function includeSamplesToMarkup() {
    let sections = document.getElementsByClassName("accordion");
    for (let i = 0; i < samples.length; i++) {
      let sample = samples[i];
      let button = document.createElement('div');
      button.classList.add("email");
      button.innerHTML = sample.name;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].innerHTML.toLowerCase() === sample.section.toLowerCase()) {
          sections[i].nextElementSibling.appendChild(button);
        }
      }
    }
  }

  // MENU PANEL
  accordion();
  copySimpleNotesToClipboard();
  function copySimpleNotesToClipboard() {
    let phraseAll = document.getElementsByClassName("phrase");
    let quickCopyAll = document.getElementsByClassName("quickCopy");
    for (let i = 0; i < quickCopyAll.length; i++) {
      quickCopyAll[i].onclick = () => {
        copyToClipboard(phraseAll[i].innerHTML);
      };

    }
  }

  function copyToClipboard(value) {
    let fakeTextarea = document.createElement('textarea');
    document.body.appendChild(fakeTextarea);
    fakeTextarea.value = value;
    fakeTextarea.select();
    document.execCommand('copy');
    fakeTextarea.parentNode.removeChild(fakeTextarea);
    showSnackbar("Successfully copied", "green");
  }

  function accordion() {
    let acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
      acc[i].onclick = function () {
        let index = i;
        for (let i = 0; i < acc.length; i++) {
          if (index !== i) {
            acc[i].classList.remove("active");
            acc[i].nextElementSibling.style.maxHeight = null;
          }
        }
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      };
    }
  }

  //WORKING PANEL
  AddDataFromInputsToTextarea();
  function AddDataFromInputsToTextarea() {
    function updateTextarea() {
      for (let i = 0; i < samples.length; i++) {
        if (samples[i].name === currentSample) {
          let text = samples[i].messageText();
          if (text.charAt(0) === ",") {
            text = text.slice(1).replace(/\n/, '');
          }
          textarea.value = text;
        }
      }
    }
    let textarea = document.getElementById("textarea");
    let textInputs = document.getElementsByClassName("inputText");
    let subjectLine = document.getElementById("subject");
    let includeLoadToSubjectLineCheckbox = document.getElementById("loadToSubject");
    for (let i = 0; i < textInputs.length; i++) {
      textInputs[i].onkeyup = () => {
        updateTextarea();
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
    UpdateTextAreaOnCheckboxChange("checkboxOtherActivities");
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

  let lockButtonState;
  let access = new accessToEmail();
  function accessToEmail() {
    let subject = document.getElementById("subject");
    let textarea = document.getElementById("textarea");
    let subjectCover = document.getElementById("subjectCover");
    let textareaCover = document.getElementById("textareaCover");
    let lockButton = document.getElementById("lockButton");
    let lockIcon = document.getElementById("lockIcon");
    this.lock = () => {
      subjectCover.style.display = "block";
      textareaCover.style.display = "block";
      subject.style.backgroundColor = "#21252b";
      textarea.style.backgroundColor = "#21252b";
      subject.readOnly = true;
      textarea.readOnly = true;
      lockButton.disabled = false;
      lockButton.style.cursor = "pointer";
      lockIcon.className = "fa fa-lock";
      lockIcon.style.color = "#be5046";
      lockButtonState = "red";
    };
    this.unlock = () => {
      if (lockIcon.className === "fa fa-unlock-alt") return;
      subjectCover.style.display = "";
      textareaCover.style.display = "";
      subject.style.backgroundColor = "";
      textarea.style.backgroundColor = "";
      subject.readOnly = false;
      textarea.readOnly = false;
      lockButton.disabled = true;
      lockButton.style.cursor = "";
      lockIcon.className = "fa fa-unlock-alt";
      lockIcon.style.color = "#98c379";
      hideAllOptions();
      lockButtonState = "green";
    };
  }

  document.getElementById("lockButton").onclick = access.unlock;

  function hideAllOptions() {
    let options = document.getElementsByClassName("rowOptions");
    for (let i = 0; i < options.length; i++) {
      options[i].style.display = "none";
    }
    document.getElementById("optionsTitle").style.display = "none";
  }

  function clearTextInputs() {
    let textInputs = document.getElementsByClassName("inputText");
    for (let i = 0; i < textInputs.length; i++) {
      textInputs[i].value = "";
    }
    let subjectLine = document.getElementById("subject");
    subjectLine.value = "";
  }

  showChosenTextarea();

  function showChosenTextarea() {
    let buttonShowBody = document.getElementById("buttonShowBody");
    let buttonShowSignature = document.getElementById("buttonShowSignature");
    let textarea1 = document.getElementById("textareaContainer1");
    let textarea2 = document.getElementById("textarea2");
    let subjectContainer = document.getElementById("subjectContainer");
    let lockButton = document.getElementById("lockButton");
    function setLockButton(state) {
      if (state === "red") {
        lockButton.disabled = false;
        lockButton.style.cursor = "pointer";
        lockIcon.className = "fa fa-lock";
        lockIcon.style.color = "#be5046";
      } else if (state === "green") {
        lockButton.disabled = true;
        lockButton.style.cursor = "";
        lockIcon.className = "fa fa-unlock-alt";
        lockIcon.style.color = "#98c379";
      }
    }
    buttonShowBody.onclick = () => {
      buttonShowBody.style.backgroundColor = "#C678DD";
      buttonShowSignature.style.backgroundColor = "#21252b";
      textarea1.style.display = "block";
      textarea2.style.display = "none";
      subjectContainer.style.display = "block";
      lockButton.style.display = "block";
      if (lockButtonState === "green") {
        setLockButton("green");
      } else if (lockButtonState === "red") {
        setLockButton("red");
      }
    };
    buttonShowSignature.onclick = () => {
      buttonShowBody.style.backgroundColor = "#21252b";
      buttonShowSignature.style.backgroundColor = "#C678DD";
      textarea1.style.display = "none";
      textarea2.style.display = "block";
      subjectContainer.style.display = "none";
      setLockButton("green");
    };
  }

  let currentSignature = "";
  insertSignature();
  function insertSignature() {
    let textarea2 = document.getElementById("textarea2");
    textarea2.placeholder = "Name Surname\nFS Billing Team\nPLS Logistics Services";
    if (localStorage.getItem("signature")) {
      currentSignature = localStorage.getItem("signature");
    } else {
      currentSignature = "Name Surname\nFS Billing Team\nPLS Logistics Services";
    }
    textarea2.onkeyup = () => {
      currentSignature = textarea2.value;
      localStorage.setItem("signature", currentSignature);
    };
    textarea2.value = currentSignature;
  }


  document.getElementById("buttonCopyMessage").onclick = copyMessage;
  document.getElementById("buttonCreateEmail").onclick = createMessage;

  function copyMessage() {
    let text = document.getElementById("textarea").value;
    if (!text) {
      showSnackbar("Message is empty!", "red");
      return;
    }
    let fakeTextarea = document.createElement('textarea');
    document.body.appendChild(fakeTextarea);
    fakeTextarea.value = text;
    fakeTextarea.select();
    document.execCommand('copy');
    fakeTextarea.parentNode.removeChild(fakeTextarea);
    showSnackbar("Successfully copied", "green");
  }

  function createMessage() {
    let text = document.getElementById("textarea").value;
    if (!text) {
      showSnackbar("Message is empty!", "red");
      return;
    }
    let correctedText = text.replace(/\n/g, "%0A").replace(/#/g, "%23");
    let correctedSignature = `%0A%0A${currentSignature.replace(/\n/g, "%0A")}`;
    let subject = document.getElementById("subject").value;
    if (subject) {
      location.href = `mailto:?subject=${subject}&body=${correctedText}${correctedSignature}`;
    } else {
      location.href = `mailto:?body=${correctedText}${correctedSignature}`;
    }
    showSnackbar("Creating email", "green");
  }

  //FILTERING USER'S INPUT
  // allowValue(/[0-9]|\,|\s/, "inputload");
  // allowValue(/[0-9]/, "inputPage", "inputPageFrom", "inputPageTo", "inputFee", "inputWeightPW", "inputWeightPRO", "inputReleased");
  // allowValue(/[a-zA-Z]/, "inputReceiver", "inputTypeFee");
  // allowValue(/[0-9]|\./, "inputRatePW", "inputRatePRO");
  // allowValue(/[0-9]|\/|\.|\-/, "inputDatePW", "inputDatePRO", "inputPickupDate", "inputFreightBillDate");
  
  // function allowValue(regex, ...inputIDs) {
  //   function getChar(event) {
  //     // for IE
  //     if (event.which == null) {
  //       if (event.keyCode < 32) return null;
  //       return String.fromCharCode(event.keyCode)
  //     }
  //     // other browsers
  //     if (event.which != 0 && event.charCode != 0) {
  //       if (event.which < 32) return null;
  //       return String.fromCharCode(event.which)
  //     }
  //     return null;
  //   }
  //   for (let i = 0; i < inputIDs.length; i++) {
  //       let element = document.getElementById(inputIDs[i]);
  //       element.onkeypress = (e) => {
  //       let char = getChar(e);
  //       if(!regex.test(char)){
  //         return false; 
  //       }
  //     };
  //   }
  // }

  //FOOTER
  function showSnackbar(text, color) {
    let x = document.getElementById("snackbar");
    x.innerHTML = text;
    x.className = "snackbarShow";
    x.classList.add("snackbar" + color);
    setTimeout(function () {
      x.className = x.className.replace("snackbarShow", "");
    }, 1000);
  }
})();