"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

(function () {
  "use strict";

  // MENU PANEL

  accordion();
  copySimpleNotesToClipboard();

  function copySimpleNotesToClipboard() {
    var phraseAll = document.getElementsByClassName("phrase");
    var quickCopyAll = document.getElementsByClassName("quickCopy");

    var _loop = function _loop(_i) {
      quickCopyAll[_i].onclick = function () {
        copyToClipboard(phraseAll[_i].innerHTML);
      };
    };

    for (var _i = 0; _i < quickCopyAll.length; _i++) {
      _loop(_i);
    }
  }
  function copyToClipboard(value) {
    var fakeTextarea = document.createElement('textarea');
    document.body.appendChild(fakeTextarea);
    fakeTextarea.value = value;
    fakeTextarea.select();
    document.execCommand('copy');
    fakeTextarea.remove();
    showSnackbar("Copied to clipboard");
  }
  function accordion() {
    var acc = document.getElementsByClassName("accordion");
    for (var _i2 = 0; _i2 < acc.length; _i2++) {
      acc[_i2].onclick = function () {
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
  var BOL_is_not_signed = {
    name: "BOL is not signed",
    messageText: "Hi,\nPlease advise if we can use the attached BOL (page ) to process ? It is not signed by the receiver.\nThanks"
  };
  var BOL_is_not_signed_not_sure = {
    name: "BOL is not signed (not sure)",
    messageText: "Hi,\nPlease advise if we can use the attached BOL (page ) to process ? I am not sure if it is signed by the receiver.\nThanks"
  };

  var Email = function Email(name, messageText, availableOptions) {
    var _this = this;

    _classCallCheck(this, Email);

    // let self = this;
    this.name = name;
    this.messageText = messageText;
    this.availableOptions = availableOptions;
    this.textarea = document.getElementById("textarea");
    this.getButton = function () {
      var buttonAll = document.getElementsByClassName("email");
      for (var _i3 = 0; _i3 < buttonAll.length; _i3++) {
        if (buttonAll[_i3].innerHTML === _this.name) {
          return buttonAll[_i3];
        }
      }
    };
    this.button = this.getButton();
    this.button.onclick = function () {
      _this.textarea.value = _this.messageText;
    };
  };

  var t = new Email(BOL_is_not_signed.name, BOL_is_not_signed.messageText);
  var i = new Email(BOL_is_not_signed_not_sure.name, BOL_is_not_signed_not_sure.messageText);

  //FOOTER
  function showSnackbar(text) {
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 1000);
  }
})();