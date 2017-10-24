﻿(function(){
    "use strict";
    accordion();
    // copySimpleNotesToClipboard();

  
   
    class quickCopyButton {
      constructor (buttonClass, phraseClass, key) {
            this.phrase = document.getElementsByClassName(phraseClass)[key];
            this.button = document.getElementsByClassName(buttonClass)[key];
            this.button.onclick = function () {
              copyToClipboard(this.phrase);
            }


          }

    }


    let fff = new quickCopyButton("phrase", "quickCopy", 0);




    // class Phrase {
    //   constructor (phrase, quickCopy) {
    //     this.phrase = phrase;
    //     this.quickCopy = quickCopy;
    //   }
      
    // }
    function copySimpleNotesToClipboard() {
      let phraseAll = document.getElementsByClassName("phrase");
      let quickCopyAll = document.getElementsByClassName("quickCopy");
      for (let i = 0; i < quickCopyAll.length; i++) {
        quickCopyAll[i].onclick = () => {
          copyToClipboard(phraseAll[i].innerHTML);
        }

      }
    }
   


    function copyToClipboard(value) {
      let fakeTextarea = document.createElement('textarea');
      document.body.appendChild(fakeTextarea);
      fakeTextarea.value = value;
      fakeTextarea.select();
      document.execCommand('copy');
      fakeTextarea.remove();
      showSnackbar();
    }

    
    


    function accordion(params) {
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


    function showSnackbar() {
        let x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
    }

})();




