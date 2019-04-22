window.drawLorentzStaticHalf = function() {
	const duration = 10;
	const interval = 1;

	// lorentz_Draw_Static_Half.padding = 0;
	lorentz_Draw_Static_Half.fullWidth = false;

	lorentz_Draw_Static_Half.Overlay(duration);

	// for (let i=interval; i<duration; i+=interval) {
	// 	lorentz_Draw_Static_Half.Curve(i, duration);
	// }

	lorentz_Draw_Static_Half.Curve(2, duration);

	lorentz_Draw_Static_Half.Padding();
};
