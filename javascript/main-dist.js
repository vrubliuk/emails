"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

(function () {
  "use strict";

  //GENERAL

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
        document.getElementById("optionsTitle").style.display = "block";
        document.getElementById("row" + option).style.display = "block";
      }
    };
    this.button.onclick = function () {
      currentSample = _this.name;
      hideAllOptions();
      clearTextInputs();
      access.lock();
      window.getSelection().removeAllRanges();
      // if (currentSample === "WEYERHAEUSER") {
      //   document.getElementById("inputReceiver").value = "Michael";
      // }
      var text = _this.messageText();
      if (text.charAt(0) === ",") {
        text = text.slice(1);
        text = text.replace(/\n/, '');
      }
      _this.textarea.value = text;
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
      var text = document.createElement('span');
      text.classList.add("quickCopyText");
      text.innerHTML = "Copy";
      quickCopy.appendChild(text);
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
          var text = samples[_i7].messageText();
          if (text.charAt(0) === ",") {
            text = text.slice(1).replace(/\n/, '');
          }
          textarea.value = text;
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

  var lockButtonState = void 0;
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
      lockButtonState = "red";
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
      lockButtonState = "green";
    };
  }

  document.getElementById("lockButton").onclick = access.unlock;

  function hideAllOptions() {
    var options = document.getElementsByClassName("rowOptions");
    for (var _i10 = 0; _i10 < options.length; _i10++) {
      options[_i10].style.display = "none";
    }
    document.getElementById("optionsTitle").style.display = "none";
  }

  function clearTextInputs() {
    var textInputs = document.getElementsByClassName("inputText");
    for (var _i11 = 0; _i11 < textInputs.length; _i11++) {
      textInputs[_i11].value = "";
    }
    var subjectLine = document.getElementById("subject");
    subjectLine.value = "";
  }

  showChosenTextarea();

  function showChosenTextarea() {
    var buttonShowBody = document.getElementById("buttonShowBody");
    var buttonShowSignature = document.getElementById("buttonShowSignature");
    var textarea1 = document.getElementById("textareaContainer1");
    var textarea2 = document.getElementById("textarea2");
    var subjectContainer = document.getElementById("subjectContainer");
    var lockButton = document.getElementById("lockButton");
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
    buttonShowBody.onclick = function () {
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
    buttonShowSignature.onclick = function () {
      buttonShowBody.style.backgroundColor = "#21252b";
      buttonShowSignature.style.backgroundColor = "#C678DD";
      textarea1.style.display = "none";
      textarea2.style.display = "block";
      subjectContainer.style.display = "none";
      setLockButton("green");
    };
  }

  var currentSignature = "";
  insertSignature();
  function insertSignature() {
    var textarea2 = document.getElementById("textarea2");
    textarea2.placeholder = "Name Surname\nFS Billing Team\nPLS Logistics Services";
    if (localStorage.getItem("signature")) {
      currentSignature = localStorage.getItem("signature");
    } else {
      currentSignature = "Name Surname\nFS Billing Team\nPLS Logistics Services";
    }
    textarea2.onkeyup = function () {
      currentSignature = textarea2.value;
      localStorage.setItem("signature", currentSignature);
    };
    textarea2.value = currentSignature;
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
    var correctedText = text.replace(/\n/g, "%0A").replace(/#/g, "%23");
    var correctedSignature = "%0A%0A" + currentSignature.replace(/\n/g, "%0A");
    var subject = document.getElementById("subject").value;
    if (subject) {
      location.href = "mailto:?subject=" + subject + "&body=" + correctedText + correctedSignature;
    } else {
      location.href = "mailto:?body=" + correctedText + correctedSignature;
    }
    showSnackbar("Creating email", "green");
  }

  //FILTERING USER'S INPUT
  allowValue(/[0-9]|\,|\s/, "inputload");
  allowValue(/[0-9]/, "inputPage", "inputPageFrom", "inputPageTo", "inputFee", "inputWeightPW", "inputWeightPRO", "inputReleased");
  allowValue(/[a-zA-Z]/, "inputReceiver", "inputTypeFee");
  allowValue(/[0-9]|\./, "inputRatePW", "inputRatePRO");
  allowValue(/[0-9]|\/|\.|\-/, "inputDatePW", "inputDatePRO", "inputPickupDate", "inputFreightBillDate");

  function allowValue(regex) {
    function getChar(event) {
      // for IE
      if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode);
      }
      // other browsers
      if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which);
      }
      return null;
    }

    for (var _len = arguments.length, inputIDs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      inputIDs[_key - 1] = arguments[_key];
    }

    for (var _i12 = 0; _i12 < inputIDs.length; _i12++) {
      var element = document.getElementById(inputIDs[_i12]);
      element.onkeypress = function (e) {
        var char = getChar(e);
        if (!regex.test(char)) {
          return false;
        }
      };
    }
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