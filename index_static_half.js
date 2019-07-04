var Lorentz;
(function (Lorentz) {
    function drawLorentzStaticHalf() {
        var duration = 10;
        var interval = 1;
        // lorentz_Draw_Static_Half.padding = 0;
        lorentz_Draw_Static_Half.fullWidth = false;
        lorentz_Draw_Static_Half.Overlay(duration);
        // for (let i=interval; i<duration; i+=interval) {
        // 	lorentz_Draw_Static_Half.Curve(i, duration);
        // }
        lorentz_Draw_Static_Half.Curve(2, duration);
        lorentz_Draw_Static_Half.Padding();
    }
    Lorentz.drawLorentzStaticHalf = drawLorentzStaticHalf;
})(Lorentz || (Lorentz = {}));
//# sourceMappingURL=index_static_half.js.map