"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

(function () {
  "use strict";

  //GENERAL

  var currentSample = void 0;
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
      lockEmail();
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
  function accordion() {
    var acc = document.getElementsByClassName("accordion");
    for (var _i5 = 0; _i5 < acc.length; _i5++) {
      acc[_i5].onclick = function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
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
      for (var _i6 = 0; _i6 < samples.length; _i6++) {
        if (samples[_i6].name === currentSample) {
          textarea.value = samples[_i6].messageText();
        }
      }
    }
    var textarea = document.getElementById("textarea");
    var textInputs = document.getElementsByClassName("inputText");
    var subjectLine = document.getElementById("subject");
    var includeLoadToSubjectLineCheckbox = document.getElementById("loadToSubject");
    for (var _i7 = 0; _i7 < textInputs.length; _i7++) {
      textInputs[_i7].onkeyup = function () {
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
      for (var _i8 = 0; _i8 < checkboxClassElements.length; _i8++) {
        checkboxClassElements[_i8].onchange = function () {
          updateTextarea();
        };
      }
    }
  }

  function lockEmail() {
    var subject = document.getElementById("subject");
    var textarea = document.getElementById("textarea");
  }

  function unlockEmail() {
    hideAllOptions();
  }

  function hideAllOptions() {
    var options = document.getElementsByClassName("rowOptions");
    for (var _i9 = 0; _i9 < options.length; _i9++) {
      options[_i9].style.display = "none";
    }
  }

  function clearTextInputs() {
    var textInputs = document.getElementsByClassName("inputText");
    for (var _i10 = 0; _i10 < textInputs.length; _i10++) {
      textInputs[_i10].value = "";
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

  function createMessage() {
    var text = document.getElementById("textarea").value;
    if (!text) {
      showSnackbar("Message is empty!", "red");
      return;
    }
    var correctedText = text.replace(/\n/g, "%0A");
    var subject = document.getElementById("subject").value;
    location.href = "mailto:?subject=" + subject + "&body=" + correctedText;
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