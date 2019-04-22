Lorentz.Item = class {
	static get itemCounter() {
		if (Lorentz.Item._itemCounter === undefined) {
			return 0;
		}

		return Lorentz.Item._itemCounter;
	}
	get coords() {
		if (this._coords === undefined) {
			return [];
		}
		return this._coords;
	}

	static itemCounterIncrement() {
		Lorentz.Item._itemCounter = Lorentz.Item.itemCounter + 1;
	};

	get duration() {
		if (this._duration === undefined) this._duration = parseFloat(10);

		return this._duration;
	}

	set duration(newDuration) {
		this._duration = newDuration;
	}

	constructor(lorentzDraw, item_id, duration, speed, name, fillStyle = "black", showAge = false, startTime = 0, endTime = null) {
		this.speed = speed;
		this._duration = duration;
		this.name = name;
		this.fillStyle = fillStyle;
		this.showAge = showAge;
		this.startTime = startTime;
		this.endTime = endTime;
		this.item_id = item_id;
		this.lorentzDraw = lorentzDraw;
	}

	drawRay() {
		if (this.speed < -1 || this.speed > 1) {
			console.log("Error!  Nothing can travel faster than the speed of light!");
			return false;
		}

		let time = 0;
		let lastGoodCoord = null;
		let prevCoord = null;
		let coord = null;

		do {
			lastGoodCoord = JSON.parse(JSON.stringify(prevCoord));
			coord = this.lorentzDraw.CreateCoord(time, this.duration, this.speed);
			coord.fillStyle = this.fillStyle;
			coord.item_id = this.item_id;
			coord.drawPoint = time >= this.startTime && (time <= this.endTime || this.endTime === null) && Math.round(coord.centery) <= 100;
			this.coords[time] = coord;
			if (prevCoord && coord.drawPoint) {
				const lineCoord = JSON.parse(JSON.stringify({
					x: prevCoord.centerx,
					y: prevCoord.centery,
					tox: coord.centerx,
					toy: coord.centery,
					stroke: coord.fillStyle,
					stroke_width: 1
				}));
				this.lorentzDraw.Line(lineCoord);
			}
			prevCoord = JSON.parse(JSON.stringify(coord));
			this.lorentzDraw.Circle(coord);
			time++;
		} while(time <= this.duration && coord.drawPoint);

		if (this.showAge) {
			const realCoord = this.lorentzDraw.CreateCoordRealTime(this.duration, this.duration, this.speed);
			const lineCoord = JSON.parse(JSON.stringify({
				x: lastGoodCoord.centerx,
				y: lastGoodCoord.centery,
				tox: realCoord.centerx,
				toy: realCoord.centery,
				stroke: coord.fillStyle,
				stroke_width: 1
			}));
			this.lorentzDraw.Line(lineCoord);
			this.lorentzDraw.Circle({
				centerx: realCoord.centerx,
				centery: realCoord.centery,
				fillStyle: "green"
			});

			const newTime = Math.sqrt(Math.pow(realCoord.centery, 2) - Math.pow(realCoord.centerx, 2)) / (100 / this.duration);

			document.getElementById('yourAge').innerText = newTime.toFixed(3);

			const deltaT = this.duration / Math.sqrt(1 - (Math.pow(this.speed, 2) / Math.pow(1, 2)));

			document.getElementById('myAgeAcc').innerText = deltaT.toFixed(3);

			let equations = "\\begin{aligned}t'&=\\textstyle \\left(t-{\\frac {vx}{c^{2}}}\\right)/\\sqrt {1-{\\frac {v^{2}}{c^{2}}}}\\end{aligned}"; // with gamma Definition

			equations += "\\begin{aligned}t'&=my\\ future\\ age=?\\end{aligned}";
			equations += "\\begin{aligned}t&=your\\ future\\ age=" + this.duration +  "\\end{aligned}";
			equations += "\\begin{aligned}v&=your\\ velocity=" + coord.lorentz.velocity.toFixed(3) +  "\\end{aligned}";
			equations += "\\begin{aligned}x&=my\\ distance\\ travelled=" + coord.lorentz.distance +  "\\end{aligned}";
			equations += "\\begin{aligned}c&=speed\\ of\\ light=" + coord.lorentz.sol +  "\\end{aligned}";


			equations += "\\begin{aligned}t'&=\\textstyle \\left(" + this.duration + "-{\\frac {" + coord.lorentz.velocity.toFixed(3) + "\\ *\\ " + coord.lorentz.distance + "}{" + coord.lorentz.sol + "^{2}}}\\right)/\\sqrt {1-{\\frac {" + coord.lorentz.velocity.toFixed(3) + "^{2}}{" + coord.lorentz.sol + "^{2}}}}\\end{aligned}"; // with values populated

			equations += "\\begin{aligned}t'&=\\textstyle \\left(" + this.duration + "-{\\frac {" + (coord.lorentz.velocity * coord.lorentz.distance).toFixed(3) + "}{" + Math.pow(coord.lorentz.sol, 2).toFixed(3) + "}}\\right)/\\sqrt {1-{\\frac {" + Math.pow(coord.lorentz.velocity, 2).toFixed(3) + "}{" + Math.pow(coord.lorentz.sol, 2).toFixed(3) + "}}}\\end{aligned}"; // with values populated

			equations += "\\begin{aligned}t'&=\\textstyle \\left(" + this.duration + "-{" + ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2)).toFixed(3) + "}\\right)/\\sqrt {1-{" + (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2)).toFixed(3) + "}}\\end{aligned}"; // with values populated

			equations += "\\begin{aligned}t'&=\\textstyle " + (this.duration - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "/\\sqrt {" + (1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "}\\end{aligned}"; // with values populated

			equations += "\\begin{aligned}t'&=\\textstyle " + (this.duration - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "\\ /\\ " + Math.sqrt(1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "\\end{aligned}"; // with values populated

			equations += "\\begin{aligned}t'&=\\textstyle " + ((this.duration - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2))) / Math.sqrt(1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2)))).toFixed(3) + "=my\\ future\\ age\\ when\\ you\\ are\\ " + this.duration + "\\end{aligned}"; // with values populated

			// equations += "\\begin{aligned}t&=\\textstyle " + (this.duration - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "\\ *\\ " + Math.sqrt(1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "\\end{aligned}"; // with values populated
			//
			// equations += "\\begin{aligned}t&=\\textstyle " + ((this.duration - ((coord.lorentz.velocity * -1 * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2))) * Math.sqrt(1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2)))).toFixed(3) + "=your\\ future\\ age\\ when\\ I\\ am\\ " + this.duration + "\\end{aligned}"; // with values populated

			const divEquations = document.getElementById('divEquations');

			divEquations.style.display = "none";
			divEquations.innerHTML = equations;

			MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divEquations"]);
			MathJax.Hub.Queue(function() {
				divEquations.style.display = "block";
			});
		}
	}
};
