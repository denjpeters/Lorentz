namespace Lorentz {
	export function drawLorentzStatic() {
		const duration = parseInt(document.getElementById('spnStaticDuration').innerText);
		const interval = parseInt(document.getElementById('spnStaticInterval').innerText);

		lorentz_Draw_Static.padding = 5;

		lorentz_Draw_Static.Overlay(duration);

		for (let i = interval; i < duration; i += interval) {
			lorentz_Draw_Static.Curve(i, duration);
		}

		lorentz_Draw_Static.Padding();
	}
}

document.getElementById('spnStaticDuration').addEventListener("blur", function (e) {
	Lorentz.drawLorentzStatic();
});

document.getElementById('spnStaticInterval').addEventListener("blur", function (e) {
	Lorentz.drawLorentzStatic();
});
