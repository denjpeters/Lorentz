Lorentz.Items = class {
	items = [];

	initialize() {
		Lorentz.Item.itemCounter++;
		this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(Lorentz.Item.itemCounter, -0.85, "Me", "black");
		Lorentz.Item.itemCounter++;
		this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(Lorentz.Item.itemCounter, 0.8, "Cat O", "orange");
		Lorentz.Item.itemCounter++;
		this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(Lorentz.Item.itemCounter, 0.9, "Cat R", "red");

		this.drawItems();
	}

	drawItems() {
		this.items.forEach(function(item) {
			item.drawRay();
		});
	}

	static TestPattern() {
		// for (var i = 0; i < 0.9; i+= 0.02) {
		// 	let itemFaster = new Lorentz.Item(i, "", "black");
		// 	itemFaster.drawRay();
		//
		// 	let itemSlower = new Lorentz.Item(i * -1, "", "black");
		// 	itemSlower.drawRay();
		// }

		let me = new Lorentz.Item(-0.5, "Me", "black");
		let cat = new Lorentz.Item(0.8, "Cat O", "orange");
		let cat2 = new Lorentz.Item(0.9, "Cat R", "red");

		me.drawRay();
		cat.drawRay();
		cat2.drawRay();
	}
};
