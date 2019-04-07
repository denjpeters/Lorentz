const timeSize = 10;
const speedOfLight = 299792458;

var Lorentz = {};

let relativeLorentzItem = null;

Lorentz.Item = class {
	coords = [];
	coords_last = [];

	constructor(speed, name, color = "black", startTime = 0, endTime = null) {
		this.speed = speed;
		this.name = name;
		this.color = color;
		this.startTime = startTime;
		this.endTime = endTime;
	}

	drawRay() {
		if (this.speed < -1 || this.speed > 1) {
			console.log("Error!  Nothing can travel faster than the speed of light!");
			return false;
		}

		let time = 0;
		let coord = null;

		do {
			coord = this.createCoord(time);
			this.coords[time] = coord;
			Lorentz.Draw.DrawPoint(coord);
			time++;
		} while(coord.posy <= 100 && coord.posx >= 0 && coord.posx <= 200 && time < 400);
	}

	createCoord(atTime) {
		let coord = {};

		if (relativeLorentzItem === null) {
			relativeLorentzItem = new Lorentz.Item(0, "Default");
		}

		coord.v = this.speed;

		// if (coord.v === 1) {
		// 	coord.angle = 45;
		// 	coord.hypotenuse = atTime;
		// 	coord.timelen = 1;
		// 	coord.distancelen = 1;
		// } else if (coord.v === -1) {
		// 	coord.angle = -45;
		// 	coord.hypotenuse = atTime;
		// 	coord.timelen = 1;
		// 	coord.distancelen = -1;
		// } else {
			// coord.lambda = 1 / Math.sqrt(1 - (Math.pow(coord.v * 299792458, 2) / Math.pow(299792458, 2)));
			coord.angle = 45 * coord.v;
			coord.hypotenuse = atTime;
			if (atTime > 0) {
				coord.timelen = Math.sin(coord.angle) * coord.hypotenuse;
				coord.distancelen = Math.sqrt(Math.pow(coord.hypotenuse, 2) - Math.pow(coord.timelen, 2));
			} else {
				coord.timelen = 0;
				coord.distancelen = 0;
			}
		// }

		// coord.lambda = 1 / Math.sqrt(1 - (Math.pow(coord.v * 299792458, 2) / Math.pow(299792458, 2)));
		// coord.newTime = coord.lamda * (atTime - ((coord.v * timeSize)/speedOfLight*speedOfLight));

		coord.posx = 100 + (timeSize * coord.distancelen);
		coord.posy = coord.timelen * timeSize;

		console.log(coord);

		coord.centerx = coord.posx;
		coord.centery = coord.posy;

		coord.color = this.color;

		coord.drawPoint = atTime >= this.startTime && (atTime <= this.endTime || this.endTime === null);

		return coord;
	}
};

const cnvsLorentz = document.getElementById("cnvsLorentz");
const ctx = cnvsLorentz.getContext("2d");
const padding = 10;
const frame = {
	width: cnvsLorentz.width * (1- (padding / 100)),
	height: cnvsLorentz.height * (1- (padding / 50)),
	xoffset: cnvsLorentz.width * (padding / 200),
	yoffset: cnvsLorentz.height * (padding / 100)
};

Lorentz.Draw = class {
	static DrawSquare(coords) {
		if (coords.centerx !== undefined) {
			coords.x = coords.centerx - coords.width / 2;
		}
		if (coords.centery !== undefined) {
			coords.y = coords.centery + coords.height / 2;
		}

		if (!Lorentz.Draw.TranslatePercent(coords)) {
			return false;
		}

		if (coords.color !== undefined) {
			ctx.fillStyle = coords.color;
		} else {
			ctx.fillStyle = "#FF0000";
		}
		ctx.fillRect(coords.x,coords.y,coords.width,coords.height);

		return true;
	};

	static DrawPoint(coords) {
		if (coords.drawPoint === false) {
			return false;
		}

		if (!Lorentz.Draw.TranslatePercent(coords)) {
			return false;
		}

		if (coords.diameter === undefined) {
			coords.diameter = 2.5;
		}

		ctx.beginPath();
		ctx.arc(coords.centerx, coords.centery, parseFloat(frame.width) * (parseFloat(coords.diameter) / 400), 0, 2 * Math.PI);
// 		ctx.stroke();
		if (coords.color !== undefined) {
			ctx.fillStyle = coords.color;
		} else {
			ctx.fillStyle = "#FF0000";
		}
		ctx.fill();

		return true;
	};

	static TranslatePercent(coords) {
		if (coords.centerx < 0 || coords.centerx > 200 || coords.centery < 0 || coords.centery > 100) {
			return false;
		}

		if (coords.x !== undefined) {
			coords.x = frame.xoffset + (parseFloat(coords.x) / 200) * frame.width;
		}
		if (coords.y !== undefined) {
			coords.y = cnvsLorentz.height - (frame.yoffset + (parseFloat(coords.y) / 100) * frame.height);
		}
		if (coords.centerx !== undefined) {
			coords.centerx = frame.xoffset + (parseFloat(coords.centerx) / 200) * frame.width;
		}
		if (coords.centery !== undefined) {
			coords.centery = cnvsLorentz.height - (frame.yoffset + (parseFloat(coords.centery) / 100) * frame.height);
		}
		if (coords.width !== undefined) {
			coords.width = (parseFloat(coords.width) / 200) * frame.width;
		}
		if (coords.height !== undefined) {
			coords.height = (parseFloat(coords.height) / 100) * frame.height;
		}
// 		console.log(coords);

		return true;
	};
};

function jsonCopy(src) {
	return JSON.parse(JSON.stringify(src));
};
