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
      showSnackbar();
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

    let x = `Hi, 
    Please advise if we can use the attached BOL (page ) to process ? I am not sure if it is signed by the receiver.
    Thanks`;

    //WORKING PANEL
    let emailsObject = {
      "BOL_is_not_signed":`Hi, 
      Please advise if we can use the attached BOL (page ) to process ? It is not signed by the receiver.
      Thanks`,
      "BOL_is_not_signed_(not_sure)": x
    };

    // alert(emailsObject["BOL_is_not_signed_(not_sure)"]);

    class Email {
      constructor (name, messageText, availableOptions) {
        let self = this;
        this.name = name;
        this.messageText = messageText;
        this.availableOptions = availableOptions;
        this.button = findButton();
        
    
        



        
        function findButton() {
          let buttonAll  = document.getElementsByClassName("email");
          for (let i = 0; i < buttonAll.length; i++) {
            if (buttonAll[i].innerHTML === self.name) {
              return buttonAll[i];
            }
          }
        }

        // document.getElementsByClassName("email").innerText.find(this.name);
        // this.button.onclick = () => {
        //   alert("asd");
        // }
      }
     


    };

    let t = new Email("BOL is not signed");
    alert(t.button);














    //FOOTER
    function showSnackbar() {
        let x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
    }

})();




