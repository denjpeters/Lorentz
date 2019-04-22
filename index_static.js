window.drawLorentzStatic = function() {
	const duration = 10;
	const interval = 2;

	lorentz_Draw_Static = new Lorentz.Draw('svgStaticLorentz');

	lorentz_Draw_Static.padding = 0;

	lorentz_Draw_Static.Overlay(duration);

	for (let i=interval; i<duration; i+=interval) {
		lorentz_Draw_Static.Curve(i, duration);
	}
};
