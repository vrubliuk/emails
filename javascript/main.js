(function(){
    "use strict";

    accordion();

    const pendingPickup = "Hi,\nPlease send the release sheet for\nThanks";

    document.getElementById("button").onclick = () => {
        showSnackbar();
        var inp = document.createElement('textarea');
     
        document.body.appendChild(inp);
        inp.value = pendingPickup;
        inp.select();
        document.execCommand('copy');
        inp.remove();
    };



    


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
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
    }

})();




