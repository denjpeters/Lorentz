Lorentz.Items = class {
	constructor() {
		this.items = [];

		// Lorentz.Item.itemCounterIncrement();
		// this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(Lorentz.Item.itemCounter, -0.85, "Me", "black");
		// Lorentz.Item.itemCounterIncrement();
		// this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(Lorentz.Item.itemCounter, 0.8, "Cat O", "orange");
		// Lorentz.Item.itemCounterIncrement();
		// this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(Lorentz.Item.itemCounter, 0.9, "Cat R", "red");


		// for (var i = 0; i < 0.99; i+= 0.01) {
		// 	Lorentz.Item.itemCounterIncrement();
		// 	this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(Lorentz.Item.itemCounter, i, "", "black");
		//
		// 	Lorentz.Item.itemCounterIncrement();
		// 	this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(Lorentz.Item.itemCounter, i * -1, "", "black");
		// }


		this.drawItems();
	}

	populate(speed) {
		this.items = [];
		Lorentz.Item.itemCounterIncrement();
		this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(Lorentz.Item.itemCounter, 0, "Them", "blue");
		Lorentz.Item.itemCounterIncrement();
		this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(Lorentz.Item.itemCounter, speed / 100, "Me", "red");

		this.drawItems();
	}

	drawItems() {
		Lorentz.Draw.Overlay();

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

	static TestPattern() {
		// for (var i = 0; i < 0.9; i+= 0.02) {
		// 	let itemFaster = new Lorentz.Item(i, "", "black");
		// 	itemFaster.drawRay();
		//
		// 	let itemSlower = new Lorentz.Item(i * -1, "", "black");
		// 	itemSlower.drawRay();
		// }

		// let me = new Lorentz.Item(-0.5, "Me", "black");
		// let cat = new Lorentz.Item(0.8, "Cat O", "orange");
		// let cat2 = new Lorentz.Item(0.9, "Cat R", "red");
		//
		// me.drawRay();
		// cat.drawRay();
		// cat2.drawRay();
	}
};
