namespace Lorentz {
	export class Items {
		items = [];
		_duration = 10;
		_lorentzDraw = null;

		constructor(svgLorentz) {
			this._lorentzDraw = new Draw(svgLorentz);

			this.drawItems();
		}

		populateStatic(duration = 5, increments = 0.01) {
			for (let i = 0; i < 0.99; i += 0.01) {
				Item.itemCounterIncrement();
				this.items[Item.itemCounter] = new Item(this._lorentzDraw, Item.itemCounter, duration, i, "", "black");

				Item.itemCounterIncrement();
				this.items[Item.itemCounter] = new Item(this._lorentzDraw, Item.itemCounter, duration, i * -1, "", "black");
			}

			this._duration = duration;

			this.drawItems();
		}

		populatePoint(speed, duration) {
			this.items = [];

			Item.itemCounterIncrement();
			this.items[Item.itemCounter] = new Item(this._lorentzDraw, Item.itemCounter, duration, 0, "Them", "blue");
			Item.itemCounterIncrement();
			this.items[Item.itemCounter] = new Item(this._lorentzDraw, Item.itemCounter, duration, speed / 100, "Me", "red", true);

			this._duration = duration;

			this.drawItems();
		}

		drawItems() {
			this._lorentzDraw.Overlay(this._duration);

			this.items.forEach(function (item) {
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
	}
}
