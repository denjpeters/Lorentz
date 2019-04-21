let lorentz_Items = null;

window.onload = function () {
	lorentz_Items = new Lorentz.Items();

	Lorentz.Draw.svgLorentz = 'svgSpeedLorentz';

	window.drawLorentz(86.603);

	// Lorentz.Draw.svgLorentz.addEventListener("click", function (e) {
	// 	const element = e.target;
	// 	const item_id = element.getAttribute('data-item_id');
	//
	// 	if (item_id !== null) {
	// 		lorentz_Items.displayDetails(item_id);
	// 	} else {
	// 		lorentz_Items.displayDetails();
	// 	}
	// });

	document.getElementById('txtDuration').addEventListener("focus", function (e) {
		setTimeout(function () {
			document.execCommand('selectAll', false, null);
		}, 150);
	});

	document.getElementById('txtDuration').addEventListener("blur", function (e) {
		window.drawLorentz();
	});

	document.getElementById('yourAgeAcc').addEventListener("focus", function (e) {
		setTimeout(function () {
			document.execCommand('selectAll', false, null);
		}, 150);
	});

	document.getElementById('yourAgeAcc').addEventListener("blur", function (e) {
		document.getElementById('txtDuration').innerText = this.innerText;
		window.drawLorentz();
	});

	document.getElementById('txtSpeed').addEventListener("focus", function (e) {
		setTimeout(function () {
			document.execCommand('selectAll', false, null);
		}, 150);
	});

	document.getElementById('txtSpeed').addEventListener("blur", function (e) {
		window.drawLorentz(parseFloat(this.innerText));
	});

	document.getElementById('rngSpeed').addEventListener("input", function (e) {
		window.drawLorentz(parseFloat(this.value));
	});

	document.getElementById('rngSpeed').addEventListener("dblclick", function (e) {
		window.drawLorentz(parseFloat(0));
	});
};

window.drawLorentz = function (speed) {
	if (speed === undefined) {
		speed = parseFloat(document.getElementById('txtSpeed').innerText);
	}
	if (speed >= 100) speed = 99.999;
	if (speed <= -100) speed = -99.999;

	document.getElementById('txtSpeed').innerText = speed;
	document.getElementById('rngSpeed').value = speed;

	const duration = parseInt(document.getElementById('txtDuration').innerText);

	document.getElementById('txtDuration').innerText = duration;
	document.getElementById('spnDuration').innerText = duration;

	document.getElementById('yourAgeAcc').innerText = duration;

	lorentz_Items.populatePoint(speed, duration);
};
