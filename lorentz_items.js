Lorentz.Items = class {
	constructor() {
		this.items = [];
		this._duration = 10;

		this.drawItems();
	}

	populate(speed, duration) {
		this.items = [];

		// for (let i = 0; i < 0.99; i+= 0.01) {
		// 	Lorentz.Item.itemCounterIncrement();
		// 	this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(Lorentz.Item.itemCounter, duration, i, "", "black");
		//
		// 	Lorentz.Item.itemCounterIncrement();
		// 	this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(Lorentz.Item.itemCounter, duration, i * -1, "", "black");
		// }

		Lorentz.Item.itemCounterIncrement();
		this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(Lorentz.Item.itemCounter, duration, 0, "Them", "blue");
		Lorentz.Item.itemCounterIncrement();
		this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(Lorentz.Item.itemCounter, duration, speed / 100, "Me", "red", true);

		this._duration = duration;

		this.drawItems();
	}

	drawItems() {
		Lorentz.Draw.Overlay(this._duration);

		this.items.forEach(function(item) {
			item.drawRay();
		});
	}

	displayDetails(id = -1) {
		const item = this.items[id];
		const spnDetails = document.getElementById('spnDetails');

		if (item) {
			spnDetails.innerText = item.name;
		} else {
			spnDetails.innerText = "";
		}
	}
};
