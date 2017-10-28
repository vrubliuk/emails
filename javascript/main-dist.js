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

    // let self = this;
    this.name = object.name;
    this.messageText = object.messageText;
    this.availableOptions = object.availableOptions;
    this.textarea = document.getElementById("textarea");
    this.getButton = function () {
      var buttonAll = document.getElementsByClassName("email");
      for (var i = 0; i < buttonAll.length; i++) {
        if (buttonAll[i].innerHTML === _this.name) {
          return buttonAll[i];
        }
      }
    };
    this.button = this.getButton();
    this.button.onclick = function () {
      _this.textarea.value = _this.messageText;
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
    // fakeTextarea.remove();
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

  document.getElementById("buttonCopyMessage").onclick = copyMessage;
  document.getElementById("buttonCreateEmail").onclick = createMessage;

  function copyMessage() {
    // alert(options.load());

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