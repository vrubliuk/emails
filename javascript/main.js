(function () {
  "use strict";

  //GENERAL
  includeNotesToMarkup();
  includeSamplesToMarkup();



  class Email {
    constructor(object) {
      // let self = this;
      this.name = object.name;
      this.messageText = object.messageText;
      this.availableOptions = object.availableOptions;
      this.textarea = document.getElementById("textarea");
      this.getButton = () => {
        let buttonAll = document.getElementsByClassName("email");
        for (let i = 0; i < buttonAll.length; i++) {
          if (buttonAll[i].innerHTML === this.name) {
            return buttonAll[i];
          }
        }
      };
      this.button = this.getButton();
      this.button.onclick = () => {
        this.textarea.value = this.messageText;
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
    // fakeTextarea.remove();
    fakeTextarea.parentNode.removeChild(fakeTextarea);
    showSnackbar("Successfully copied", "green");
  }
  function accordion() {
    let acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
      acc[i].onclick = function () {
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

document.getElementById("buttonCopyMessage").onclick = copyMessage;
document.getElementById("buttonCreateEmail").onclick = createMessage;

function copyMessage() {
  // alert(options.load());

  let text = document.getElementById("textarea").value;
  if(!text) {
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
  if(!text) {
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

    x.classList.add("snackbar"+color);
    setTimeout(function () { x.className = x.className.replace("snackbarShow", ""); }, 1000);
  }

})();




