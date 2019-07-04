var Lorentz;
(function (Lorentz) {
    var Items = /** @class */ (function () {
        function Items(svgLorentz) {
            this.items = [];
            this._duration = 10;
            this._lorentzDraw = null;
            this._lorentzDraw = new Lorentz.Draw(svgLorentz);
            this.drawItems();
        }
        Items.prototype.populateStatic = function (duration, increments) {
            if (duration === void 0) { duration = 5; }
            if (increments === void 0) { increments = 0.01; }
            for (var i = 0; i < 0.99; i += 0.01) {
                Lorentz.Item.itemCounterIncrement();
                this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(this._lorentzDraw, Lorentz.Item.itemCounter, duration, i, "", "black");
                Lorentz.Item.itemCounterIncrement();
                this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(this._lorentzDraw, Lorentz.Item.itemCounter, duration, i * -1, "", "black");
            }
            this._duration = duration;
            this.drawItems();
        };
        Items.prototype.populatePoint = function (speed, duration) {
            this.items = [];
            Lorentz.Item.itemCounterIncrement();
            this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(this._lorentzDraw, Lorentz.Item.itemCounter, duration, 0, "Them", "blue");
            Lorentz.Item.itemCounterIncrement();
            this.items[Lorentz.Item.itemCounter] = new Lorentz.Item(this._lorentzDraw, Lorentz.Item.itemCounter, duration, speed / 100, "Me", "red", true);
            this._duration = duration;
            this.drawItems();
        };
        Items.prototype.drawItems = function () {
            this._lorentzDraw.Overlay(this._duration);
            this.items.forEach(function (item) {
                item.drawRay();
            });
        };
        Items.prototype.displayDetails = function (id) {
            if (id === void 0) { id = -1; }
            var item = this.items[id];
            var spnDetails = document.getElementById('spnDetails');
            if (item) {
                spnDetails.innerText = item.name;
            }
            else {
                spnDetails.innerText = "";
            }
        };
        return Items;
    }());
    Lorentz.Items = Items;
})(Lorentz || (Lorentz = {}));
//# sourceMappingURL=lorentz_items.js.map