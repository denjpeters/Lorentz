Lorentz.Item = class {
	static get itemCounter() {
		if (Lorentz.Item._itemCounter === undefined) {
			return 0;
		}

		return Lorentz.Item._itemCounter;
	}
	coords = [];

	static itemCounterIncrement() {
		Lorentz.Item._itemCounter = Lorentz.Item.itemCounter + 1;
	};

	constructor(item_id, speed, name, fillStyle = "black", startTime = 0, endTime = null) {
		this.speed = speed;
		this.name = name;
		this.fillStyle = fillStyle;
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
		let coord = null;

		do {
			coord = this.createCoord(time);
			this.coords[time] = coord;
			Lorentz.Draw.Circle(coord);
			time++;
		} while(coord.posy <= 100 && coord.posx >= -100 && coord.posx <= 100 && time < 400);
	}

	createCoord(atTime) {
		let coord = {};

		coord.lorentz = {};

		coord.lorentz.sol = 1;
		coord.lorentz.time = parseFloat(atTime) * 10;
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

		coord.drawPoint = atTime >= this.startTime && (atTime <= this.endTime || this.endTime === null);

		return coord;
	}
};
