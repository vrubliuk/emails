"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

(function () {
  "use strict";

  //GENERAL
  // let currentSample;

  includeNotesToMarkup();
  includeSamplesToMarkup();

  var Email = function Email(object) {
    var _this = this;

    _classCallCheck(this, Email);

    this.name = object.name;
    this.messageText = object.messageText;
    this.availableOptions = object.availableOptions;
    this.subject = document.getElementById("subject");
    this.textarea = document.getElementById("textarea");
    this.getButton = function () {
      var buttonAll = document.getElementsByClassName("email");
      for (var i = 0; i < buttonAll.length; i++) {
        if (buttonAll[i].innerHTML.toLowerCase() === _this.name.toLowerCase()) {
          return buttonAll[i];
        }
      }
    };
    this.button = this.getButton();
    this.showAvailableOptions = function () {
      for (var i = 0; i < _this.availableOptions.length; i++) {
        var option = _this.availableOptions[i].charAt(0).toUpperCase() + _this.availableOptions[i].slice(1);
        document.getElementById("row" + option).style.display = "block";
      }
    };

    this.button.onclick = function () {
      currentSample = _this.name;
      hideAllOptions();
      clearTextInputs();
      access.lock();
      window.getSelection().removeAllRanges();
      _this.textarea.value = _this.messageText();
      _this.showAvailableOptions();
      if (_this.name === "statistics") {
        var date = new Date();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var year = date.getFullYear();
        _this.subject.value = "statistics " + month + "/" + day + "/" + year;
      }
    };
  };

  for (var i = 0; i < samples.length; i++) {
    new Email(samples[i]);
  }

  function getCurrentSample() {
    return currentSample;
  }

  function includeNotesToMarkup() {
    var section = document.getElementById("notesPanel");
    for (var _i = 0; _i < notes.length; _i++) {
      var phraseContainer = document.createElement('div');
      phraseContainer.classList.add("phraseContainer");
      var phrase = document.createElement('span');
      phrase.classList.add("phrase");
      phrase.innerHTML = notes[_i];
      var quickCopy = document.createElement('button');
      quickCopy.classList.add("quickCopy");
      quickCopy.innerHTML = "Copy";
      section.appendChild(phraseContainer);
      phraseContainer.appendChild(phrase);
      phraseContainer.appendChild(quickCopy);
    }
  }

  function includeSamplesToMarkup() {
    var sections = document.getElementsByClassName("accordion");
    for (var _i2 = 0; _i2 < samples.length; _i2++) {
      var sample = samples[_i2];
      var button = document.createElement('div');
      button.classList.add("email");
      // button.innerHTML = sample.name.toLowerCase();
      button.innerHTML = sample.name;
      for (var _i3 = 0; _i3 < sections.length; _i3++) {
        if (sections[_i3].innerHTML.toLowerCase() === sample.section.toLowerCase()) {
          sections[_i3].nextElementSibling.appendChild(button);
        }
      }
    }
  }

  // MENU PANEL
  accordion();
  copySimpleNotesToClipboard();

  function copySimpleNotesToClipboard() {
    var phraseAll = document.getElementsByClassName("phrase");
    var quickCopyAll = document.getElementsByClassName("quickCopy");

    var _loop = function _loop(_i4) {
      quickCopyAll[_i4].onclick = function () {
        copyToClipboard(phraseAll[_i4].innerHTML);
      };
    };

    for (var _i4 = 0; _i4 < quickCopyAll.length; _i4++) {
      _loop(_i4);
    }
  }
  function copyToClipboard(value) {
    var fakeTextarea = document.createElement('textarea');
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
    var acc = document.getElementsByClassName("accordion");

    var _loop2 = function _loop2(_i5) {
      acc[_i5].onclick = function () {
        var index = _i5;
        for (var _i6 = 0; _i6 < acc.length; _i6++) {
          if (index !== _i6) {
            acc[_i6].classList.remove("active");
            acc[_i6].nextElementSibling.style.maxHeight = null;
          }
        }
        this.classList.toggle("active");
        var panel = this.nextElementSibling;

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      };
    };

    for (var _i5 = 0; _i5 < acc.length; _i5++) {
      _loop2(_i5);
    }
  }

  //WORKING PANEL

  AddDataFromInputsToTextarea();
  function AddDataFromInputsToTextarea() {
    function updateTextarea() {
      for (var _i7 = 0; _i7 < samples.length; _i7++) {
        if (samples[_i7].name === currentSample) {
          textarea.value = samples[_i7].messageText();
        }
      }
    }
    var textarea = document.getElementById("textarea");
    var textInputs = document.getElementsByClassName("inputText");
    var subjectLine = document.getElementById("subject");
    var includeLoadToSubjectLineCheckbox = document.getElementById("loadToSubject");
    for (var _i8 = 0; _i8 < textInputs.length; _i8++) {
      textInputs[_i8].onkeyup = function () {
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
    UpdateTextAreaOnCheckboxChange("checkboxOtherActivities");
    UpdateTextAreaOnCheckboxChange("checkboxGratitude");
    function UpdateTextAreaOnCheckboxChange(checkboxClass) {
      var checkboxClassElements = document.getElementsByClassName(checkboxClass);
      for (var _i9 = 0; _i9 < checkboxClassElements.length; _i9++) {
        checkboxClassElements[_i9].onchange = function () {
          updateTextarea();
        };
      }
    }
  }

  var access = new accessToEmail();
  function accessToEmail() {
    var subject = document.getElementById("subject");
    var textarea = document.getElementById("textarea");
    var subjectCover = document.getElementById("subjectCover");
    var textareaCover = document.getElementById("textareaCover");
    var lockButton = document.getElementById("lockButton");
    var lockIcon = document.getElementById("lockIcon");
    this.lock = function () {
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
    this.unlock = function () {
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
    var options = document.getElementsByClassName("rowOptions");
    for (var _i10 = 0; _i10 < options.length; _i10++) {
      options[_i10].style.display = "none";
    }
  }

  function clearTextInputs() {
    var textInputs = document.getElementsByClassName("inputText");
    for (var _i11 = 0; _i11 < textInputs.length; _i11++) {
      textInputs[_i11].value = "";
    }
    var subjectLine = document.getElementById("subject");
    subjectLine.value = "";
  }

  document.getElementById("buttonCopyMessage").onclick = copyMessage;
  document.getElementById("buttonCreateEmail").onclick = createMessage;

  function copyMessage() {
    var text = document.getElementById("textarea").value;
    if (!text) {
      showSnackbar("Message is empty!", "red");
      return;
    }
    var fakeTextarea = document.createElement('textarea');
    document.body.appendChild(fakeTextarea);
    fakeTextarea.value = text;
    fakeTextarea.select();
    document.execCommand('copy');
    fakeTextarea.parentNode.removeChild(fakeTextarea);
    showSnackbar("Successfully copied", "green");
  }

  var signature = "%0A%0AValentyn Rubliuk%0AFS Billing Team Lead%0APLS Logistics Services";

  function createMessage() {
    var text = document.getElementById("textarea").value;
    if (!text) {
      showSnackbar("Message is empty!", "red");
      return;
    }
    var correctedText = text.replace(/\n/g, "%0A");
    var subject = document.getElementById("subject").value;
    if (subject) {
      location.href = "mailto:?subject=" + subject + "&body=" + correctedText + signature;
    } else {
      location.href = "mailto:?body=" + correctedText + signature;
    }
    showSnackbar("Creating email", "green");
  }

  //FOOTER
  function showSnackbar(text, color) {
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
    x.className = "snackbarShow";

    x.classList.add("snackbar" + color);
    setTimeout(function () {
      x.className = x.className.replace("snackbarShow", "");
    }, 1000);
  }
})();