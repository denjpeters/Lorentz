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

	constructor(item_id, duration, speed, name, fillStyle = "black", showAge = false, startTime = 0, endTime = null) {
		this.speed = speed;
		this._duration = duration;
		this.name = name;
		this.fillStyle = fillStyle;
		this.showAge = showAge;
		this.startTime = startTime;
		this.endTime = endTime;
		this.item_id = item_id;
	}

	drawRay() {
		if (this.speed < -1 || this.speed > 1) {
			console.log("Error!  Nothing can travel faster than the speed of light!");
			return false;
		}

		let time = 0;
		let prevCoord = null;
		let coord = null;

		do {
			prevCoord = JSON.parse(JSON.stringify(coord));
			coord = this.createCoord(time);
			this.coords[time] = coord;
			Lorentz.Draw.Circle(coord);
			time++;
		} while(time <= this.duration);

		if (this.showAge) {
			const newPosy = 100;
			const percentOfY = newPosy / coord.posy;
			const newPosx = coord.posx * percentOfY;

			const newTime = Math.sqrt(Math.pow(newPosy, 2) - Math.pow(newPosx, 2)) / (100 / this.duration);

			Lorentz.Draw.Circle({
				centerx: newPosx,
				centery: newPosy,
				fillStyle: "green"
			});
			document.getElementById('yourAge').innerText = newTime.toFixed(3);

			const deltaT = this.duration / Math.sqrt(1 - (Math.pow(this.speed, 2) / Math.pow(1, 2)));

			document.getElementById('myAgeAcc').innerText = deltaT.toFixed(3);

			let equations = "$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$";

			// equations = "{\\displaystyle {\\begin{aligned}t'&=\\gamma \\left(t-{\\frac {vx}{c^{2}}}\\right)\\\\x'&=\\gamma \\left(x-vt\\right)\\\\y'&=y\\\\z'&=z\\end{aligned}}}";
			//
			// equations = "\\begin{aligned}t'&=\\gamma \\left(t-{\\frac {vx}{c^{2}}}\\right)\\\\x'&=\\gamma \\left(x-vt\\right)\\\\y'&=y\\\\z'&=z\\end{aligned}";

			equations = "\\begin{aligned}t'&=\\gamma \\left(t-{\\frac {vx}{c^{2}}}\\right)\\end{aligned}";  // Lorentz Time Transformation
			equations += "\\begin{aligned}\\gamma =\\textstyle \\left({\\sqrt {1-{\\frac {v^{2}}{c^{2}}}}}\\right)^{-1}\\end{aligned}"; // Gamma Definition
			equations += "\\begin{aligned}t'&=\\textstyle \\left({\\sqrt {1-{\\frac {v^{2}}{c^{2}}}}}\\right)^{-1}\\left(t-{\\frac {vx}{c^{2}}}\\right)\\end{aligned}"; // with gamma Definition

			equations += "\\begin{aligned}t&=time=" + this.duration +  "\\end{aligned}";
			equations += "\\begin{aligned}v&=velocity=" + coord.lorentz.velocity.toFixed(3) +  "\\end{aligned}";
			equations += "\\begin{aligned}x&=my\\ distance=" + coord.lorentz.distance +  "\\end{aligned}";
			equations += "\\begin{aligned}c&=speed\\ of\\ light=" + coord.lorentz.sol +  "\\end{aligned}";


			equations += "\\begin{aligned}t'&=\\textstyle \\left({\\sqrt {1-{\\frac {" + coord.lorentz.velocity.toFixed(3) + "^{2}}{" + coord.lorentz.sol + "^{2}}}}}\\right)^{-1}\\left(" + this.duration + "-{\\frac {" + coord.lorentz.velocity.toFixed(3) + "*" + coord.lorentz.distance + "}{" + coord.lorentz.sol + "^{2}}}\\right)\\end{aligned}"; // with values populated

			equations += "\\begin{aligned}t'&=\\textstyle \\left({\\sqrt {1-{\\frac {" + Math.pow(coord.lorentz.velocity, 2).toFixed(3) + "}{" + Math.pow(coord.lorentz.sol, 2).toFixed(3) + "}}}}\\right)^{-1}\\left(" + this.duration + "-{\\frac {" + (coord.lorentz.velocity * coord.lorentz.distance).toFixed(3) + "}{" + Math.pow(coord.lorentz.sol, 2).toFixed(3) + "}}\\right)\\end{aligned}"; // with values populated

			equations += "\\begin{aligned}t'&=\\textstyle \\left({\\sqrt {1-{" + (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2)).toFixed(3) + "}}}\\right)^{-1}\\left(" + this.duration + "-{" + ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2)).toFixed(3) + "}\\right)\\end{aligned}"; // with values populated

			equations += "\\begin{aligned}t'&=\\textstyle \\left({\\sqrt {" + (1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "}}\\right)^{-1}\\left(" + (this.duration - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "\\right)\\end{aligned}"; // with values populated

			equations += "\\begin{aligned}t'&=\\textstyle \\left({" + Math.sqrt(1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "}\\right)^{-1}\\left(" + (this.duration - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "\\right)\\end{aligned}"; // with values populated

			equations += "\\begin{aligned}t'&=\\textstyle " + Math.pow(Math.sqrt(1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2))), -1).toFixed(3) + "\\left(" + (this.duration - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "\\right)\\end{aligned}"; // with values populated

			equations += "\\begin{aligned}t'&=\\textstyle " + (Math.pow(Math.sqrt(1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2))), -1) * (this.duration - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2)))).toFixed(3) + "\\end{aligned}"; // with values populated


			const divEquations = document.getElementById('divEquations');

			divEquations.style.display = "none";
			divEquations.innerHTML = equations;

			MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divEquations"]);
			MathJax.Hub.Queue(function() {
				divEquations.style.display = "block";
			});
		}
	}

	createCoord(atTime) {
		let coord = {};

		coord.lorentz = {};

		coord.lorentz.sol = 1;
		coord.lorentz.time = parseFloat(atTime) * (100 / this.duration);
		coord.lorentz.distance = 0;
		coord.lorentz.velocity = coord.lorentz.sol * this.speed;
		coord.lorentz.gamma = 1 / (Math.sqrt(1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2))));
		coord.lorentz.newTime = coord.lorentz.gamma * (coord.lorentz.time - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2)));
		coord.lorentz.newDistance = coord.lorentz.gamma * (coord.lorentz.distance - (coord.lorentz.velocity * coord.lorentz.time)) * -1;

		coord.posx = coord.lorentz.newDistance;
		coord.posy = coord.lorentz.newTime;

		coord.centerx = coord.posx;
		coord.centery = coord.posy;

		coord.fillStyle = this.fillStyle;

		coord.class = "lorentzItem";
		coord.item_id = this.item_id;

		// console.log(this.speed, coord);

		coord.drawPoint = atTime >= this.startTime && (atTime <= this.endTime || this.endTime === null);

		return coord;
	}
};
