"use strict";

(function () {
  "use strict";

  // MENU PANEL

  accordion();
  copySimpleNotesToClipboard();

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
  function accordion() {
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

  //WORKING PANEL


  //FOOTER
  function showSnackbar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 1000);
  }
})();