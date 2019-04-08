const svgLorentz = document.getElementById("svgLorentz");

const padding = 5;
const frame = {
	width: svgLorentz.viewBox.baseVal.width * (1- (padding / 100)),
	height: svgLorentz.viewBox.baseVal.height * (1- (padding / 50)),
	xoffset: svgLorentz.viewBox.baseVal.width * (padding / 200),
	yoffset: svgLorentz.viewBox.baseVal.height * (padding / 100)
};

Lorentz.Draw = class {
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
		svgLorentz.appendChild(newRectangle);

		return true;
	};

	static Circle(coords) {
		if (coords.drawPoint === false) {
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
		svgLorentz.appendChild(newCircle);

		return true;
	};

	static Line(coords) {
		Lorentz.Draw._TranslatePercent(coords);

		const newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
		newLine.setAttribute('x1',coords.x);
		newLine.setAttribute('y1',coords.y);
		newLine.setAttribute('x2',coords.tox);
		newLine.setAttribute('y2',coords.toy);
		newLine.setAttribute('class', coords.class);
		svgLorentz.appendChild(newLine);
	};

	static Overlay() {

		Lorentz.Draw.Line({x: 0, y:0, tox: 0, toy:100, class: "centerLine"});

		for (let i = 10; i <= 100; i+=10) {
			Lorentz.Draw.Line({x: i * -1, y:i, tox: i, toy:i, class: "guideLines"});
			Lorentz.Draw.Line({x: i, y:i, tox: i, toy:100, class: "guideLines"});
			Lorentz.Draw.Line({x: i * -1, y:i, tox: i * -1, toy:100, class: "guideLines"});
		}

		Lorentz.Draw.Line({x: 0, y:0, tox: 100, toy:100, class: "lightLines"});
		Lorentz.Draw.Line({x: 0, y:0, tox: -100, toy:100, class: "lightLines"});
	};

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
			if (coords.centerx < -100 || coords.centerx > 100) {
				isValid = false;
			}
			coords.centerx = this._TranslatePercentX(coords.centerx);
		}
		if (coords.centery !== undefined) {
			if (coords.centery < 0 || coords.centery > 100) {
				isValid = false;
			}
			coords.centery = this._TranslatePercentY(coords.centery);
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

	static _TranslatePercentX(oldX) {
		return frame.xoffset + (parseFloat(oldX + 100) / 200) * frame.width;
	};

	static _TranslatePercentY(oldY) {
		return svgLorentz.viewBox.baseVal.height - (frame.yoffset + (parseFloat(oldY) / 100) * frame.height);
	}
};
