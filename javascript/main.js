(function(){
    "use strict";
    const pendingPickup = `Hi,<br>APlease send the release sheet for 
    Thanks`;

    document.getElementById("button").onclick = () => {
    
        var inp = document.createElement('input');
        document.body.appendChild(inp);
        inp.value = pendingPickup;
        inp.select();
        document.execCommand('copy');
        inp.remove();
    };








    
})();




