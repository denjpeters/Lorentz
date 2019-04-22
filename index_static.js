window.drawLorentzStatic = function() {
	const duration = parseInt(document.getElementById('spnStaticDuration').innerText);
	const interval = parseInt(document.getElementById('spnStaticInterval').innerText);

	lorentz_Draw_Static.padding = 0;

	lorentz_Draw_Static.Overlay(duration);

	for (let i=interval; i<duration; i+=interval) {
		lorentz_Draw_Static.Curve(i, duration);
	}
};

document.getElementById('spnStaticDuration').addEventListener("blur", function (e) {
	window.drawLorentzStatic();
});

document.getElementById('spnStaticInterval').addEventListener("blur", function (e) {
	window.drawLorentzStatic();
});
