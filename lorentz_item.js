var Lorentz;
(function (Lorentz) {
    var Item = /** @class */ (function () {
        function Item(lorentzDraw, item_id, duration, speed, name, fillStyle, showAge, startTime, endTime) {
            if (fillStyle === void 0) { fillStyle = "black"; }
            if (showAge === void 0) { showAge = false; }
            if (startTime === void 0) { startTime = 0; }
            if (endTime === void 0) { endTime = null; }
            this._coords = [];
            this._duration = 10;
            this.speed = 0;
            this.name = "";
            this.fillStyle = "";
            this.showAge = false;
            this.startTime = 0;
            this.endTime = null;
            this.item_id = "";
            this.lorentzDraw = null;
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
        Object.defineProperty(Item, "itemCounter", {
            get: function () {
                return Lorentz.Item._itemCounter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "coords", {
            get: function () {
                return this._coords;
            },
            enumerable: true,
            configurable: true
        });
        Item.itemCounterIncrement = function () {
            Lorentz.Item._itemCounter = Lorentz.Item.itemCounter + 1;
        };
        ;
        Object.defineProperty(Item.prototype, "duration", {
            get: function () {
                return this._duration;
            },
            set: function (newDuration) {
                this._duration = newDuration;
            },
            enumerable: true,
            configurable: true
        });
        Item.prototype.drawRay = function () {
            if (this.speed < -1 || this.speed > 1) {
                console.log("Error!  Nothing can travel faster than the speed of light!");
                return false;
            }
            var time = 0;
            var lastGoodCoord = null;
            var prevCoord = null;
            var coord = null;
            do {
                lastGoodCoord = JSON.parse(JSON.stringify(prevCoord));
                coord = this.lorentzDraw.CreateCoord(time, this.duration, this.speed);
                coord.fillStyle = this.fillStyle;
                coord.item_id = this.item_id;
                coord.drawPoint = time >= this.startTime && (time <= this.endTime || this.endTime === null) && Math.round(coord.centery) <= 100;
                this.coords[time] = coord;
                if (prevCoord && coord.drawPoint) {
                    var lineCoord = JSON.parse(JSON.stringify({
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
            } while (time <= this.duration && coord.drawPoint);
            if (this.showAge) {
                var realCoord = this.lorentzDraw.CreateCoordRealTime(this.duration, this.duration, this.speed);
                var lineCoord = JSON.parse(JSON.stringify({
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
                var newTime = Math.sqrt(Math.pow(realCoord.centery, 2) - Math.pow(realCoord.centerx, 2)) / (100 / this.duration);
                document.getElementById('yourAge').innerText = newTime.toFixed(3);
                var deltaT = this.duration / Math.sqrt(1 - (Math.pow(this.speed, 2) / Math.pow(1, 2)));
                document.getElementById('myAgeAcc').innerText = deltaT.toFixed(3);
                var equations = "\\begin{aligned}t'&=\\textstyle \\left(t-{\\frac {vx}{c^{2}}}\\right)/\\sqrt {1-{\\frac {v^{2}}{c^{2}}}}\\end{aligned}"; // with gamma Definition
                equations += "\\begin{aligned}t'&=my\\ future\\ age=?\\end{aligned}";
                equations += "\\begin{aligned}t&=your\\ future\\ age=" + this.duration + "\\end{aligned}";
                equations += "\\begin{aligned}v&=your\\ velocity=" + coord.lorentz.velocity.toFixed(3) + "\\end{aligned}";
                equations += "\\begin{aligned}x&=my\\ distance\\ travelled=" + coord.lorentz.distance + "\\end{aligned}";
                equations += "\\begin{aligned}c&=speed\\ of\\ light=" + coord.lorentz.sol + "\\end{aligned}";
                equations += "\\begin{aligned}t'&=\\textstyle \\left(" + this.duration + "-{\\frac {" + coord.lorentz.velocity.toFixed(3) + "\\ *\\ " + coord.lorentz.distance + "}{" + coord.lorentz.sol + "^{2}}}\\right)/\\sqrt {1-{\\frac {" + coord.lorentz.velocity.toFixed(3) + "^{2}}{" + coord.lorentz.sol + "^{2}}}}\\end{aligned}"; // with values populated
                equations += "\\begin{aligned}t'&=\\textstyle \\left(" + this.duration + "-{\\frac {" + (coord.lorentz.velocity * coord.lorentz.distance).toFixed(3) + "}{" + Math.pow(coord.lorentz.sol, 2).toFixed(3) + "}}\\right)/\\sqrt {1-{\\frac {" + Math.pow(coord.lorentz.velocity, 2).toFixed(3) + "}{" + Math.pow(coord.lorentz.sol, 2).toFixed(3) + "}}}\\end{aligned}"; // with values populated
                equations += "\\begin{aligned}t'&=\\textstyle \\left(" + this.duration + "-{" + ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2)).toFixed(3) + "}\\right)/\\sqrt {1-{" + (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2)).toFixed(3) + "}}\\end{aligned}"; // with values populated
                equations += "\\begin{aligned}t'&=\\textstyle " + (this.duration - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "/\\sqrt {" + (1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "}\\end{aligned}"; // with values populated
                equations += "\\begin{aligned}t'&=\\textstyle " + (this.duration - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "\\ /\\ " + Math.sqrt(1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "\\end{aligned}"; // with values populated
                equations += "\\begin{aligned}t'&=\\textstyle " + ((this.duration - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2))) / Math.sqrt(1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2)))).toFixed(3) + "=my\\ future\\ age\\ when\\ you\\ are\\ " + this.duration + "\\end{aligned}"; // with values populated
                // equations += "\\begin{aligned}t&=\\textstyle " + (this.duration - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "\\ *\\ " + Math.sqrt(1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2))).toFixed(3) + "\\end{aligned}"; // with values populated
                //
                // equations += "\\begin{aligned}t&=\\textstyle " + ((this.duration - ((coord.lorentz.velocity * -1 * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2))) * Math.sqrt(1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2)))).toFixed(3) + "=your\\ future\\ age\\ when\\ I\\ am\\ " + this.duration + "\\end{aligned}"; // with values populated
                var divEquations_1 = document.getElementById('divEquations');
                divEquations_1.style.display = "none";
                divEquations_1.innerHTML = equations;
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "divEquations"]);
                MathJax.Hub.Queue(function () {
                    divEquations_1.style.display = "block";
                });
            }
        };
        Item._itemCounter = 0;
        return Item;
    }());
    Lorentz.Item = Item;
})(Lorentz || (Lorentz = {}));
//# sourceMappingURL=lorentz_item.js.map