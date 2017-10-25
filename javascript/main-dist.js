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

  var x = "Hi, \n    Please advise if we can use the attached BOL (page ) to process ? I am not sure if it is signed by the receiver.\n    Thanks";

  //WORKING PANEL
  var emailsObject = {
    "BOL_is_not_signed": "Hi, \n      Please advise if we can use the attached BOL (page ) to process ? It is not signed by the receiver.\n      Thanks",
    "BOL_is_not_signed_(not_sure)": x
  };

  // alert(emailsObject["BOL_is_not_signed_(not_sure)"]);

  var Email = function Email(name, messageText, availableOptions) {
    _classCallCheck(this, Email);

    var self = this;
    this.name = name;
    this.messageText = messageText;
    this.availableOptions = availableOptions;
    this.button = findButton();

    function findButton() {
      var buttonAll = document.getElementsByClassName("email");
      for (var i = 0; i < buttonAll.length; i++) {
        if (buttonAll[i].innerHTML === self.name) {
          return buttonAll[i];
        }
      }
    }

    // document.getElementsByClassName("email").innerText.find(this.name);
    // this.button.onclick = () => {
    //   alert("asd");
    // }
  };

  ;

  var t = new Email("BOL is not signed");
  alert(t.button);

  //FOOTER
  function showSnackbar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 1000);
  }
})();