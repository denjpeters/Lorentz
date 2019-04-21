let lorentz_Items = null;

window.onload = function () {
	const duration = 10;
	const interval = 2;

	Lorentz.Draw.svgLorentz = 'svgStaticLorentz';

	Lorentz.Draw.padding = 0;

	Lorentz.Draw.Overlay(duration);

	for (let i=interval; i<duration; i+=interval) {
		Lorentz.Draw.Curve(i, duration);
	}
};
