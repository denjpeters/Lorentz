const timeSize = 10;
const speedOfLight = 299792458;

var Lorentz = {};

let relativeLorentzItem = null;

Lorentz.Item = class {
	coords = [];
	coords_last = [];

	constructor(speed, name, fillStyle = "black", startTime = 0, endTime = null) {
		this.speed = speed;
		this.name = name;
		this.fillStyle = fillStyle;
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
		} while(coord.posy <= 100 && coord.posx >= -100 && coord.posx <= 100 && time < 400);
	}

	createCoord(atTime) {
		let coord = {};

		if (relativeLorentzItem === null) {
			relativeLorentzItem = new Lorentz.Item(0, "Default");
		}

		coord.lorentz = {};
		coord.lorentz.t = parseFloat(atTime) * 10;
		coord.lorentz.r = coord.lorentz.t * this.speed;
		coord.lorentz.i = Math.sqrt(Math.pow(coord.lorentz.t, 2) - Math.pow(coord.lorentz.r, 2));

		coord.posx = coord.lorentz.r;
		coord.posy = coord.lorentz.i;

		coord.centerx = coord.posx;
		coord.centery = coord.posy;

		coord.fillStyle = this.fillStyle;

		coord.drawPoint = atTime >= this.startTime && (atTime <= this.endTime || this.endTime === null);

		return coord;
	}
};

const cnvsLorentz = document.getElementById("cnvsLorentz");
const ctx = cnvsLorentz.getContext("2d");
const padding = 5;
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

		Lorentz.Draw.ProcessAppearance(coords);
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

		if (coords.lineWidth === undefined) {
			coords.lineWidth = 0;
		}
		if (coords.strokeStyle === undefined) {
			coords.strokeStyle = "transparent";
		}

		ctx.beginPath();
		ctx.arc(coords.centerx, coords.centery, parseFloat(frame.width) * (parseFloat(coords.diameter) / 400), 0, 2 * Math.PI);
		Lorentz.Draw.ProcessAppearance(coords, 0);
		if (coords.lineWidth > 0) {
			ctx.stroke();
		}
		ctx.fill();

		return true;
	};

	static DrawLine(coords) {
		Lorentz.Draw.TranslatePercent(coords);

		ctx.beginPath();
		ctx.moveTo(coords.x, coords.y);
		ctx.lineTo(coords.tox, coords.toy);
		Lorentz.Draw.ProcessAppearance(coords);
		ctx.stroke();
	};

	static DrawOverlay() {

		Lorentz.Draw.DrawLine({x: 0, y:0, tox: 0, toy:100, lineWidth: 5});

		for (let i = 10; i <= 100; i+=10) {
			Lorentz.Draw.DrawLine({x: i * -1, y:i, tox: i, toy:i, lineWidth: 1});
			Lorentz.Draw.DrawLine({x: i, y:i, tox: i, toy:100, lineWidth: 1});
			Lorentz.Draw.DrawLine({x: i * -1, y:i, tox: i * -1, toy:100, lineWidth: 1});
		}

		Lorentz.Draw.DrawLine({x: 0, y:0, tox: 100, toy:100, lineWidth: 5, strokeStyle: "gold"});
		Lorentz.Draw.DrawLine({x: 0, y:0, tox: -100, toy:100, lineWidth: 5, strokeStyle: "gold"});
	};

	static DrawTestPattern() {
		Lorentz.Draw.DrawSquare({centerx: 0, centery: 20, width: 8, height: 8});
		Lorentz.Draw.DrawSquare({centerx: 0, centery: 20, width: 5, height: 5, fillStyle: "blue"});

		Lorentz.Draw.DrawPoint({centerx: 0, centery: 20, diameter: 5});

		Lorentz.Draw.DrawPoint({centerx: -100, centery: 0});
		Lorentz.Draw.DrawPoint({centerx: -100, centery: 100});
		Lorentz.Draw.DrawPoint({centerx: 100, centery: 0});
		Lorentz.Draw.DrawPoint({centerx: 100, centery: 100});
	}

	static ProcessAppearance(coords) {
		if (coords.lineWidth === undefined) {
			ctx.lineWidth = 1;
		} else {
			ctx.lineWidth = coords.lineWidth;
		}
		if (coords.strokeStyle !== undefined) {
			ctx.strokeStyle = coords.strokeStyle;
		} else {
			ctx.strokeStyle = "black";
		}
		if (coords.fillStyle !== undefined) {
			ctx.fillStyle = coords.fillStyle;
		} else {
			ctx.fillStyle = "red";
		}
	}

	static TranslatePercent(coords) {
		let isValid = true;

		if (coords.x !== undefined) {
			coords.x = this.TranslatePercentX(coords.x);
		}
		if (coords.y !== undefined) {
			coords.y = this.TranslatePercentY(coords.y);
		}
		if (coords.tox !== undefined) {
			coords.tox = this.TranslatePercentX(coords.tox);
		}
		if (coords.toy !== undefined) {
			coords.toy = this.TranslatePercentY(coords.toy);
		}
		if (coords.centerx !== undefined) {
			if (coords.centerx < -100 || coords.centerx > 100) {
				isValid = false;
			}
			coords.centerx = this.TranslatePercentX(coords.centerx);
		}
		if (coords.centery !== undefined) {
			if (coords.centery < 0 || coords.centery > 100) {
				isValid = false;
			}
			coords.centery = this.TranslatePercentY(coords.centery);
		}
		if (coords.width !== undefined) {
			coords.width = (parseFloat(coords.width) / 200) * frame.width;
		}
		if (coords.height !== undefined) {
			coords.height = (parseFloat(coords.height) / 100) * frame.height;
		}
		// console.log(coords);

		return isValid;
	};

	static TranslatePercentX(oldX) {
		return frame.xoffset + (parseFloat(oldX + 100) / 200) * frame.width;
	};

	static TranslatePercentY(oldY) {
		return cnvsLorentz.height - (frame.yoffset + (parseFloat(oldY) / 100) * frame.height);
	}
};

function jsonCopy(src) {
	return JSON.parse(JSON.stringify(src));
}
