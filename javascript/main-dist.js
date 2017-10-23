"use strict";

(function () {
    "use strict";

    var pendingPickup = "Hi,<br>APlease send the release sheet for \n    Thanks";

    document.getElementById("button").onclick = function () {

        var inp = document.createElement('input');
        document.body.appendChild(inp);
        inp.value = pendingPickup;
        inp.select();
        document.execCommand('copy');
        inp.remove();
    };
})();