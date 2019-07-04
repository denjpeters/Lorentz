var Lorentz;
(function (Lorentz) {
    function drawLorentzStatic() {
        var duration = parseInt(document.getElementById('spnStaticDuration').innerText);
        var interval = parseInt(document.getElementById('spnStaticInterval').innerText);
        lorentz_Draw_Static.padding = 5;
        lorentz_Draw_Static.Overlay(duration);
        for (var i = interval; i < duration; i += interval) {
            lorentz_Draw_Static.Curve(i, duration);
        }
        lorentz_Draw_Static.Padding();
    }
    Lorentz.drawLorentzStatic = drawLorentzStatic;
})(Lorentz || (Lorentz = {}));
document.getElementById('spnStaticDuration').addEventListener("blur", function (e) {
    Lorentz.drawLorentzStatic();
});
document.getElementById('spnStaticInterval').addEventListener("blur", function (e) {
    Lorentz.drawLorentzStatic();
});
//# sourceMappingURL=index_static.js.map