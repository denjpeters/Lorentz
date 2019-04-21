Lorentz.Draw = class {
	static get svgLorentz() {
		if (Lorentz.Draw._svgLorentz === undefined) {
			Lorentz.Draw._svgLorentz = document.getElementById("svgSpeedLorentz");
		}

		return Lorentz.Draw._svgLorentz;
	};
	static get padding() {
		if (Lorentz.Draw._Padding === undefined) {
			return 5;
		}
		return Lorentz.Draw._Padding;
	};
	static set padding(value) {
		Lorentz.Draw._Padding = value;
	}
	static get frame() {
		return {
			width: Lorentz.Draw.svgLorentz.viewBox.baseVal.width * (1 - (Lorentz.Draw.padding / 100)),
			height: Lorentz.Draw.svgLorentz.viewBox.baseVal.height * (1 - (Lorentz.Draw.padding / 50)),
			xoffset: Lorentz.Draw.svgLorentz.viewBox.baseVal.width * (Lorentz.Draw.padding / 200),
			yoffset: Lorentz.Draw.svgLorentz.viewBox.baseVal.height * (Lorentz.Draw.padding / 100)
		};
	};

	static Rectangle(coords) {
		if (coords.centerx !== undefined && coords.x === undefined) {
			coords.x = coords.centerx - coords.width / 2;
		}
		if (coords.centery !== undefined && coords.y === undefined) {
			coords.y = coords.centery + coords.height / 2;
		}

		if (!Lorentz.Draw._TranslatePercent(coords)) {
			return false;
		}

		const newRectangle = document.createElementNS('http://www.w3.org/2000/svg','rect');
		newRectangle.setAttribute('x',coords.x);
		newRectangle.setAttribute('y',coords.y);
		newRectangle.setAttribute('width',coords.width);
		newRectangle.setAttribute('height',coords.height);
		newRectangle.setAttribute('class', coords.class);
		Lorentz.Draw.svgLorentz.appendChild(newRectangle);

		return true;
	};

	static Circle(coords) {
		if (coords !== undefined && coords.drawPoint === false) {
			return false;
		}

		if (coords.width === undefined) {
			coords.width = 1;
		}

		if (!Lorentz.Draw._TranslatePercent(coords)) {
			return false;
		}

		const newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		newCircle.setAttribute("cx", coords.centerx);
		newCircle.setAttribute("cy", coords.centery);
		newCircle.setAttribute("r", coords.width);
		newCircle.setAttribute("fill", coords.fillStyle);
		if (coords.class !== undefined) {
			newCircle.setAttribute("class", coords.class);
		}
		if (coords.attributes !== undefined) {
			newCircle.setAttribute("data-attributes", JSON.stringify(coords.attributes));
		}
		if (coords.item_id !== undefined) {
			newCircle.setAttribute("data-item_id", coords.item_id);
		}
		Lorentz.Draw.svgLorentz.appendChild(newCircle);

		return true;
	};

	static Line(coords) {
		if (Lorentz.Draw._TranslatePercent(coords)) {

			const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
			newLine.setAttribute('x1', coords.x);
			newLine.setAttribute('y1', coords.y);
			newLine.setAttribute('x2', coords.tox);
			newLine.setAttribute('y2', coords.toy);
			newLine.setAttribute('class', coords.class);
			Lorentz.Draw.svgLorentz.appendChild(newLine);
		}
	};

	static Overlay(duration) {
		if (duration === undefined) {
			duration = 10;
		}
		Lorentz.Draw.Duration = parseFloat(duration);
		Lorentz.Draw.DurationSize = 100 / Lorentz.Draw.Duration;

		const parentElement = Lorentz.Draw.svgLorentz.parentElement;
		const emptySvg = Lorentz.Draw.svgLorentz.cloneNode(false);
		parentElement.removeChild(Lorentz.Draw.svgLorentz);
		parentElement.appendChild(emptySvg);
		Lorentz.Draw._svgLorentz = emptySvg;

		Lorentz.Draw.Line({x: 0, y:0, tox: 0, toy:100, class: "centerLine"});

		for (let i = Lorentz.Draw.DurationSize; Math.round(i) <= 100; i+=Lorentz.Draw.DurationSize) {
			Lorentz.Draw.Line({x: i * -1, y:i, tox: i, toy:i, class: "guideLines"});
			Lorentz.Draw.Line({x: i, y:i, tox: i, toy:100, class: "guideLines"});
			Lorentz.Draw.Line({x: i * -1, y:i, tox: i * -1, toy:100, class: "guideLines"});
		}

		Lorentz.Draw.Line({x: 0, y:0, tox: 100, toy:100, class: "lightLines"});
		Lorentz.Draw.Line({x: 0, y:0, tox: -100, toy:100, class: "lightLines"});
	};

	static Curve(atTime, duration) {
		const speedInterval = 0.01;
		let prevCoord = Lorentz.Draw.CreateCoord(atTime, duration, 0);

		for (let i=0; i<0.999; i+=speedInterval) {
			let nextCoord = Lorentz.Draw.CreateCoord(atTime, duration, i);
			Lorentz.Draw.Line({x: prevCoord.centerx, y: prevCoord.centery, tox: nextCoord.centerx, toy: nextCoord.centery, class: "staticLines"});
			Lorentz.Draw.Line({x: prevCoord.centerx * -1, y: prevCoord.centery, tox: nextCoord.centerx * -1, toy: nextCoord.centery, class: "staticLines"});
			prevCoord = nextCoord;
		}
	}

	static CreateCoord(atTime, duration, speed) {
		let coord = {};

		coord.lorentz = {};

		coord.lorentz.sol = 1;
		coord.lorentz.time = parseFloat(atTime) * (100 / duration);
		coord.lorentz.distance = 0;
		coord.lorentz.velocity = coord.lorentz.sol * speed;
		coord.lorentz.gamma = 1 / (Math.sqrt(1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2))));
		coord.lorentz.newTime = coord.lorentz.gamma * (coord.lorentz.time - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2)));
		coord.lorentz.newDistance = coord.lorentz.gamma * (coord.lorentz.distance - (coord.lorentz.velocity * coord.lorentz.time)) * -1;

		coord.posx = coord.lorentz.newDistance;
		coord.posy = coord.lorentz.newTime;

		coord.centerx = coord.posx;
		coord.centery = coord.posy;


		coord.class = "lorentzItem";

		return coord;
	}

	static TestPattern() {
		Lorentz.Draw.Rectangle({centerx: 0, centery: 20, width: 8, height: 8, class: "testRed"});
		Lorentz.Draw.Rectangle({centerx: 0, centery: 20, width: 5, height: 5, class: "testBlue"});

		Lorentz.Draw.Circle({centerx: 0, centery: 20, diameter: 5});

		Lorentz.Draw.Circle({centerx: -100, centery: 0});
		Lorentz.Draw.Circle({centerx: -100, centery: 100});
		Lorentz.Draw.Circle({centerx: 100, centery: 0});
		Lorentz.Draw.Circle({centerx: 100, centery: 100});
	}

	static _TranslatePercent(coords) {
		let isValid = true;

		if (coords.x !== undefined) {
			coords.x = this._TranslatePercentX(coords.x);
		}
		if (coords.y !== undefined) {
			coords.y = this._TranslatePercentY(coords.y);
		}
		if (coords.tox !== undefined) {
			coords.tox = this._TranslatePercentX(coords.tox);
		}
		if (coords.toy !== undefined) {
			coords.toy = this._TranslatePercentY(coords.toy);
		}
		if (coords.centerx !== undefined) {
			if (Math.round(coords.centerx) < -100 || Math.round(coords.centerx) > 100) {
				isValid = false;
			}
			coords.centerx = this._TranslatePercentX(coords.centerx);
		}
		if (coords.centery !== undefined) {
			if (Math.round(coords.centery) < 0 || Math.round(coords.centery) > 100) {
				isValid = false;
			}
			coords.centery = this._TranslatePercentY(coords.centery);
		}
		if (coords.width !== undefined) {
			coords.width = (parseFloat(coords.width) / 200) * Lorentz.Draw.frame.width;
		}
		if (coords.height !== undefined) {
			coords.height = (parseFloat(coords.height) / 100) * Lorentz.Draw.frame.height;
		}

		return isValid;
	};

	static _TranslatePercentX(oldX) {
		return Lorentz.Draw.frame.xoffset + (parseFloat(oldX + 100) / 200) * Lorentz.Draw.frame.width;
	};

	static _TranslatePercentY(oldY) {
		return Lorentz.Draw.svgLorentz.viewBox.baseVal.height - (Lorentz.Draw.frame.yoffset + (parseFloat(oldY) / 100) * Lorentz.Draw.frame.height);
	}
};
