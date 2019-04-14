let lorentz_Items = null;

window.onload = function() {
	// Lorentz.Draw.Overlay();
	//
	// lorentz_Items = new Lorentz.Items();

	// Lorentz.Items.TestPattern();

	// Lorentz.Draw.TestPattern();

	lorentz_Items = new Lorentz.Items();

	window.drawLorentz(0);

	Lorentz.Draw.svgLorentz.addEventListener("click", function(e) {
		const element = e.target;
		const item_id = element.getAttribute('data-item_id');

		if (item_id !== null) {
			lorentz_Items.displayDetails(item_id);
		} else {
			lorentz_Items.displayDetails();
		}
	});

	document.getElementById('txtSpeed').addEventListener("change", function(e) {
		window.drawLorentz(parseFloat(this.value));
	});

	document.getElementById('rngSpeed').addEventListener("input", function(e) {
		window.drawLorentz(parseFloat(this.value));
	});
};

window.drawLorentz = function(speed) {
	if (speed >= 100) speed = 99.99;
	if (speed <= -100) speed = -99.99;

	document.getElementById('txtSpeed').value = speed;
	document.getElementById('rngSpeed').value = speed;

	lorentz_Items.populate(speed);
};
