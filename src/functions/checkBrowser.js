navigator.sayswho = (function () {
    debugger
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|edge|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();


function get_browser() {
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefoxe|edge|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR|Edge\/(\d+)/)
        if (tem != null) { return { name: 'Opera', version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
    return {
        name: M[0],
        version: M[1]
    };
}

function getBrowser() {
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|edge|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}



function msgBrowser() {
    const browser = getBrowser();
    if (browser.match(/(msie|edge|trident(?=\/))\/?\s*(\d+)/i)) {
        console.log('Hola');
    }
    console.log(browser);
}






<script>
    function getBrowser() {
     var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|edge|trident(?=\/))\/?\s*(\d+)/i) || [];
     if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE ' + (tem[1] || '');
}
     if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
}
M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
// return M.join(' ');
     return {
        name: M[0],
    version: M[1]
}
}

 function msgBrowser() {
     var browser = getBrowser();
    var modal = document.getElementById('modalBrowserId');
    var message = document.getElementById('message');
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    var divInfo = document.getElementById("browserCaution")
     /*btn.onclick = function () {
        modal.style.display = "block";
    }*/
     span.onclick = function () {
        modal.style.display = "none";
    }
     window.onclick = function (event) {
         if (event.target == modal) {
        modal.style.display = "none";
    }
}
     if (browser.name.includes('hrome')) {
        divInfo.innerHTML = 'Navegador no soportado';
    divInfo.classList.add("MensajeError")
    modal.style.display = "block";
    message.innerHTML = "Navegador no soportado";
}
}

msgBrowser();

</script>