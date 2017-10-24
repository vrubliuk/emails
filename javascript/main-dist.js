"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

(function () {
  "use strict";

  accordion();
  // copySimpleNotesToClipboard();


  var quickCopyButton = function quickCopyButton(buttonClass, phraseClass, key) {
    _classCallCheck(this, quickCopyButton);

    this.phrase = document.getElementsByClassName(phraseClass)[key];
    this.button = document.getElementsByClassName(buttonClass)[key];
    this.button.onclick = function () {
      copyToClipboard(this.phrase);
    };
  };

  var fff = new quickCopyButton("phrase", "quickCopy", 0);

  // class Phrase {
  //   constructor (phrase, quickCopy) {
  //     this.phrase = phrase;
  //     this.quickCopy = quickCopy;
  //   }

  // }
  function copySimpleNotesToClipboard() {
    var phraseAll = document.getElementsByClassName("phrase");
    var quickCopyAll = document.getElementsByClassName("quickCopy");

    var _loop = function _loop(i) {
      quickCopyAll[i].onclick = function () {
        copyToClipboard(phraseAll[i].innerHTML);
      };
    };

    for (var i = 0; i < quickCopyAll.length; i++) {
      _loop(i);
    }
  }

  function copyToClipboard(value) {
    var fakeTextarea = document.createElement('textarea');
    document.body.appendChild(fakeTextarea);
    fakeTextarea.value = value;
    fakeTextarea.select();
    document.execCommand('copy');
    fakeTextarea.remove();
    showSnackbar();
  }

  function accordion(params) {
    var acc = document.getElementsByClassName("accordion");
    for (var i = 0; i < acc.length; i++) {
      acc[i].onclick = function () {
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

  function showSnackbar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 1000);
  }
})();