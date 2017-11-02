(function () {
  "use strict";

  //GENERAL
  let currentSample;
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
          document.getElementById("row" + option).style.display = "block";
        }
      };

      this.button.onclick = () => {
        currentSample = this.name;
        hideAllOptions();
        clearTextInputs();
        access.lock();
        window.getSelection().removeAllRanges();
        this.textarea.value = this.messageText();
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
      quickCopy.innerHTML = "Copy";
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
      // button.innerHTML = sample.name.toLowerCase();
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

  // function accordion() {
  //   let acc = document.getElementsByClassName("accordion");
  //   for (let i = 0; i < acc.length; i++) {
  //     acc[i].onclick = function () {
  //       this.classList.toggle("active");
  //       let panel = this.nextElementSibling;
  //       if (panel.style.maxHeight) {
  //         panel.style.maxHeight = null;
  //       } else {
  //         panel.style.maxHeight = panel.scrollHeight + "px";
  //       }
  //     };
  //   }
  // }

    
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
    };
  }

document.getElementById("lockButton").onclick = access.unlock;

  function hideAllOptions() {
    let options = document.getElementsByClassName("rowOptions");
    for (let i = 0; i < options.length; i++) {
      options[i].style.display = "none";
    }
  }

  function clearTextInputs() {
    let textInputs = document.getElementsByClassName("inputText");
    for (let i = 0; i < textInputs.length; i++) {
      textInputs[i].value = "";
    } 
    let subjectLine = document.getElementById("subject");
    subjectLine.value = "";
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
    let correctedText = text.replace(/\n/g, "%0A");
    let subject = document.getElementById("subject").value;
    location.href = `mailto:?subject=${subject}&body=${correctedText}`;
    showSnackbar("Creating email", "green");
  }


  //FOOTER
  function showSnackbar(text, color) {
    let x = document.getElementById("snackbar");
    x.innerHTML = text;
    x.className = "snackbarShow";

    x.classList.add("snackbar" + color);
    setTimeout(function () { x.className = x.className.replace("snackbarShow", ""); }, 1000);
  }

})();