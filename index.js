var lorentz_Items_Speed = null;
var lorentz_Draw_Static = null;
var lorentz_Draw_Static_Half = null;
var navButtons = document.querySelectorAll("#divNav button");
var divBodys = document.querySelectorAll(".divBody");
var contentEditables = document.querySelectorAll('[contenteditable="true"]');
window.onload = function () {
    lorentz_Items_Speed = new Lorentz.Items('svgSpeedLorentz');
    lorentz_Draw_Static = new Lorentz.Draw('svgStaticLorentz');
    lorentz_Draw_Static_Half = new Lorentz.Draw('svgStaticHalfLorentz');
    Lorentz.drawLorentzSpeed(86.603);
    Lorentz.drawLorentzStatic();
    Lorentz.drawLorentzStaticHalf();
    drawPage();
};
function drawPage(targetDiv) {
    if (targetDiv === void 0) { targetDiv = null; }
    if (targetDiv === null) {
        targetDiv = getCookie('tabSet', 'divSpeed');
    }
    setCookie('tabSet', targetDiv);
    for (var i = 0; i < navButtons.length; i++) {
        if (navButtons[i].getAttribute("data-target") === targetDiv) {
            navButtons[i].style.backgroundColor = "lightblue";
        }
        else {
            navButtons[i].style.backgroundColor = "white";
        }
    }
    for (var i = 0; i < divBodys.length; i++) {
        if (divBodys[i].classList.contains(targetDiv)) {
            divBodys[i].style.display = "block";
        }
        else {
            divBodys[i].style.display = "none";
        }
    }
}
function setCookie(cname, cvalue, exdays) {
    if (exdays === void 0) { exdays = 10; }
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname, cdefault) {
    if (cdefault === void 0) { cdefault = ""; }
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return cdefault;
}
for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener("click", function (e) {
        drawPage(this.getAttribute("data-target"));
    });
}
for (var i = 0; i < contentEditables.length; i++) {
    contentEditables[i].addEventListener("focus", function (e) {
        setTimeout(function () {
            document.execCommand('selectAll', false, null);
        });
    });
}
//# sourceMappingURL=index.js.map