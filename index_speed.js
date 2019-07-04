document.getElementById('txtDuration').addEventListener("blur", function (e) {
    Lorentz.drawLorentzSpeed();
});
document.getElementById('yourAgeAcc').addEventListener("blur", function (e) {
    document.getElementById('txtDuration').innerText = this.innerText;
    Lorentz.drawLorentzSpeed();
});
document.getElementById('txtSpeed').addEventListener("blur", function (e) {
    Lorentz.drawLorentzSpeed(parseFloat(this.innerText));
});
document.getElementById('rngSpeed').addEventListener("change", function (e) {
    Lorentz.drawLorentzSpeed(parseFloat(this.value));
});
document.getElementById('rngSpeed').addEventListener("input", function (e) {
    Lorentz.drawLorentzSpeed(parseFloat(this.value));
});
document.getElementById('rngSpeed').addEventListener("dblclick", function (e) {
    Lorentz.drawLorentzSpeed(parseFloat("0"));
});
var Lorentz;
(function (Lorentz) {
    function drawLorentzSpeed(speed) {
        if (speed === void 0) { speed = null; }
        if (speed === null) {
            speed = parseFloat(document.getElementById('txtSpeed').innerText);
        }
        if (speed >= 100)
            speed = 99.999;
        if (speed <= -100)
            speed = -99.999;
        document.getElementById('txtSpeed').innerText = speed;
        document.getElementById('rngSpeed').value = speed;
        var duration = parseInt(document.getElementById('txtDuration').innerText);
        document.getElementById('txtDuration').innerText = duration.toFixed(0);
        document.getElementById('spnDuration').innerText = duration.toFixed(0);
        document.getElementById('yourAgeAcc').innerText = duration.toFixed(0);
        lorentz_Items_Speed.populatePoint(speed, duration);
    }
    Lorentz.drawLorentzSpeed = drawLorentzSpeed;
})(Lorentz || (Lorentz = {}));
//# sourceMappingURL=index_speed.js.map