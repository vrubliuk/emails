"use strict";

(function () {
    "use strict";

    accordion();

    var pendingPickup = "Hi,\nPlease send the release sheet for\nThanks";

    document.getElementById("button").onclick = function () {
        showSnackbar();
        var inp = document.createElement('textarea');

        document.body.appendChild(inp);
        inp.value = pendingPickup;
        inp.select();
        document.execCommand('copy');
        inp.remove();
    };

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
        }, 2000);
    }
})();