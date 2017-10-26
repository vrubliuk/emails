(function(){
    "use strict";

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
      fakeTextarea.remove();
      showSnackbar("Copied to clipboard");
    }
    function accordion() {
        let acc = document.getElementsByClassName("accordion");
        for (let i = 0; i < acc.length; i++) {
          acc[i].onclick = function() {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight){
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
            } 
          };
        }
    }


    //WORKING PANEL
    let BOL_is_not_signed = {
      name: "BOL is not signed",
      messageText: `Hi,\nPlease advise if we can use the attached BOL (page ) to process ? It is not signed by the receiver.\nThanks`
    };
    let BOL_is_not_signed_not_sure = {
      name: "BOL is not signed (not sure)",
      messageText: `Hi,\nPlease advise if we can use the attached BOL (page ) to process ? I am not sure if it is signed by the receiver.\nThanks`
    };


  
    class Email {
      constructor (name, messageText, availableOptions) {
        // let self = this;
        this.name = name;
        this.messageText = messageText;
        this.availableOptions = availableOptions;
        this.textarea = document.getElementById("textarea");
        this.getButton = () => {
          let buttonAll  = document.getElementsByClassName("email");
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


    let t = new Email(BOL_is_not_signed.name, BOL_is_not_signed.messageText);
    let i = new Email(BOL_is_not_signed_not_sure.name, BOL_is_not_signed_not_sure.messageText);
  














    //FOOTER
    function showSnackbar(text) {
        let x = document.getElementById("snackbar");
        x.innerHTML = text;
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
    }

})();




