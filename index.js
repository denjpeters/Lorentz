let lorentz_Items_Speed = null;
let lorentz_Draw_Static = null;
let navButtons = document.querySelectorAll("#divNav button");
let divBodys = document.querySelectorAll(".divBody");

window.onload = function () {
	lorentz_Items_Speed = new Lorentz.Items('svgSpeedLorentz');

	window.drawLorentzSpeed(86.603);
	window.drawLorentzStatic();

	drawPage();
};

function drawPage(targetDiv) {
	if (targetDiv === undefined) {
		targetDiv = getCookie('tabSet', 'divSpeed');
	}

	setCookie('tabSet', targetDiv);

	for (let i=0; i<navButtons.length; i++) {
		if (navButtons[i].getAttribute("data-target") === targetDiv) {
			navButtons[i].style.backgroundColor = "lightblue";
		} else {
			navButtons[i].style.backgroundColor = "white";
		}
	}

	for (let i=0; i<divBodys.length; i++) {
		if (divBodys[i].classList.contains(targetDiv)) {
			divBodys[i].style.display = "block";
		} else {
			divBodys[i].style.display = "none";
		}
	}
}

function setCookie(cname, cvalue, exdays = 10) {
	let d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname, cdefault = "") {
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return cdefault;
}

for (let i=0; i<navButtons.length; i++) {
	navButtons[i].addEventListener("click", function (e) {
		drawPage(this.getAttribute("data-target"));
	});
}
