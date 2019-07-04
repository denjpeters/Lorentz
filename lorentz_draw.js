var Lorentz;
(function (Lorentz) {
    var Draw = /** @class */ (function () {
        function Draw(svgLorentz) {
            this._svgLorentz = null;
            this._Padding = null;
            this._fullWidth = null;
            this.Duration = null;
            this.DurationSize = null;
            this.svgLorentz = svgLorentz;
        }
        Object.defineProperty(Draw.prototype, "svgLorentz", {
            get: function () {
                if (this._svgLorentz === null) {
                    this._svgLorentz = document.getElementById("svgSpeedLorentz");
                }
                return this._svgLorentz;
            },
            set: function (value) {
                this._svgLorentz = document.getElementById(value);
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        Object.defineProperty(Draw.prototype, "padding", {
            get: function () {
                if (this._Padding === null) {
                    return 5;
                }
                return this._Padding;
            },
            set: function (value) {
                this._Padding = value;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Draw.prototype, "fullWidth", {
            get: function () {
                if (this._fullWidth === null) {
                    return true;
                }
                return this._fullWidth;
            },
            set: function (value) {
                this._fullWidth = value;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Draw.prototype, "frame", {
            get: function () {
                return {
                    width: this.svgLorentz.viewBox.baseVal.width * (1 - (this.padding / 100)),
                    height: this.svgLorentz.viewBox.baseVal.height * (1 - (this.padding / 50)),
                    xoffset: this.svgLorentz.viewBox.baseVal.width * (this.padding / 200),
                    yoffset: this.svgLorentz.viewBox.baseVal.height * (this.padding / 100)
                };
            },
            enumerable: true,
            configurable: true
        });
        ;
        Draw.prototype.Rectangle = function (coords) {
            if (coords.centerx !== undefined && coords.x === undefined) {
                coords.x = coords.centerx - coords.width / 2;
            }
            if (coords.centery !== undefined && coords.y === undefined) {
                coords.y = coords.centery + coords.height / 2;
            }
            if (!this._TranslatePercent(coords)) {
                return false;
            }
            var newRectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            newRectangle.setAttribute('x', coords.x);
            newRectangle.setAttribute('y', coords.y);
            newRectangle.setAttribute('width', coords.width);
            newRectangle.setAttribute('height', coords.height);
            newRectangle.setAttribute('class', coords.class);
            this.svgLorentz.appendChild(newRectangle);
            return true;
        };
        ;
        Draw.prototype.Circle = function (coords) {
            if (coords !== undefined && coords.drawPoint === false) {
                return false;
            }
            if (coords.width === undefined) {
                coords.width = 1;
            }
            if (!this._TranslatePercent(coords)) {
                return false;
            }
            var newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
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
            this.svgLorentz.appendChild(newCircle);
            return true;
        };
        ;
        Draw.prototype.Line = function (coords) {
            if (this._TranslatePercent(coords)) {
                var newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                newLine.setAttribute('x1', coords.x);
                newLine.setAttribute('y1', coords.y);
                newLine.setAttribute('x2', coords.tox);
                newLine.setAttribute('y2', coords.toy);
                if (coords.class) {
                    newLine.setAttribute('class', coords.class);
                }
                if (coords.stroke) {
                    newLine.setAttribute('stroke', coords.stroke);
                }
                if (coords.stroke_width) {
                    newLine.setAttribute('stroke-width', coords.stroke_width);
                }
                this.svgLorentz.appendChild(newLine);
            }
        };
        ;
        Draw.prototype.Overlay = function (duration) {
            if (duration === void 0) { duration = "10"; }
            this.Duration = parseFloat(duration);
            this.DurationSize = 100 / this.Duration;
            var parentNode = this.svgLorentz.parentNode;
            var emptySvg = this.svgLorentz.cloneNode(false);
            parentNode.removeChild(this.svgLorentz);
            parentNode.appendChild(emptySvg);
            this._svgLorentz = emptySvg;
            this.Line({ x: 0, y: 0, tox: 0, toy: 100, class: "centerLine" });
            for (var i = this.DurationSize; Math.round(i) <= 100; i += this.DurationSize) {
                this.Line({ x: i * -1, y: i, tox: i, toy: i, class: "guideLines" });
                this.Line({ x: i, y: i, tox: i, toy: 100, class: "guideLines" });
                this.Line({ x: i * -1, y: i, tox: i * -1, toy: 100, class: "guideLines" });
            }
            this.Line({ x: 0, y: 0, tox: 100, toy: 100, class: "lightLines" });
            this.Line({ x: 0, y: 0, tox: -100, toy: 100, class: "lightLines" });
        };
        ;
        Draw.prototype.Padding = function (addLabels) {
            if (addLabels === void 0) { addLabels = 10; }
            var newRectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            newRectangle.setAttribute('x', "-1");
            newRectangle.setAttribute('y', "-1");
            newRectangle.setAttribute('width', this.svgLorentz.viewBox.baseVal.width + 2);
            newRectangle.setAttribute('height', this.frame.yoffset.toString());
            newRectangle.setAttribute('class', 'padding');
            this.svgLorentz.appendChild(newRectangle);
            newRectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            newRectangle.setAttribute('x', "-1");
            newRectangle.setAttribute('y', "-1");
            newRectangle.setAttribute('width', this.frame.xoffset.toString());
            newRectangle.setAttribute('height', this.svgLorentz.viewBox.baseVal.height + 2);
            newRectangle.setAttribute('class', 'padding');
            this.svgLorentz.appendChild(newRectangle);
            newRectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            newRectangle.setAttribute('x', "-1");
            newRectangle.setAttribute('y', ((this.svgLorentz.viewBox.baseVal.height + 1) - this.frame.yoffset).toString());
            newRectangle.setAttribute('width', this.svgLorentz.viewBox.baseVal.width + 2);
            newRectangle.setAttribute('height', this.frame.yoffset.toString());
            newRectangle.setAttribute('class', 'padding');
            this.svgLorentz.appendChild(newRectangle);
            newRectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            newRectangle.setAttribute('x', ((this.svgLorentz.viewBox.baseVal.width + 1) - this.frame.xoffset).toString());
            newRectangle.setAttribute('y', "-1");
            newRectangle.setAttribute('width', this.frame.xoffset.toString());
            newRectangle.setAttribute('height', this.svgLorentz.viewBox.baseVal.height + 2);
            newRectangle.setAttribute('class', 'padding');
            this.svgLorentz.appendChild(newRectangle);
            if (addLabels > 0) {
                var newText = null;
                var textNode = null;
                for (var i = 0; i <= 100; i += addLabels) {
                    if (this.fullWidth) {
                        if (i === 0) {
                            newText = document.createElementNS('http://www.w3.org/2000/svg', "text");
                            newText.setAttributeNS(null, "x", this.frame.xoffset + (this.frame.width / 2) + (this.frame.width * (i / addLabels / 10)));
                            newText.setAttributeNS(null, "y", this.frame.yoffset * .75);
                            newText.setAttributeNS(null, "text-anchor", "middle");
                            textNode = document.createTextNode(i + "%");
                            newText.appendChild(textNode);
                            this.svgLorentz.appendChild(newText);
                        }
                        else {
                            newText = document.createElementNS('http://www.w3.org/2000/svg', "text");
                            newText.setAttributeNS(null, "x", this.frame.xoffset + (this.frame.width / 2) - (this.frame.width * (i / addLabels / 20)));
                            newText.setAttributeNS(null, "y", this.frame.yoffset * .75);
                            newText.setAttributeNS(null, "text-anchor", "middle");
                            textNode = document.createTextNode(i + "%");
                            newText.appendChild(textNode);
                            this.svgLorentz.appendChild(newText);
                            newText = document.createElementNS('http://www.w3.org/2000/svg', "text");
                            newText.setAttributeNS(null, "x", this.frame.xoffset + (this.frame.width / 2) + (this.frame.width * (i / addLabels / 20)));
                            newText.setAttributeNS(null, "y", this.frame.yoffset * .75);
                            newText.setAttributeNS(null, "text-anchor", "middle");
                            textNode = document.createTextNode(i + "%");
                            newText.appendChild(textNode);
                            this.svgLorentz.appendChild(newText);
                        }
                    }
                    else {
                        newText = document.createElementNS('http://www.w3.org/2000/svg', "text");
                        newText.setAttributeNS(null, "x", this.frame.xoffset + (this.frame.width * (i / addLabels / 10)));
                        newText.setAttributeNS(null, "y", this.frame.yoffset * .75);
                        newText.setAttributeNS(null, "text-anchor", "middle");
                        textNode = document.createTextNode(i + "%");
                        newText.appendChild(textNode);
                        this.svgLorentz.appendChild(newText);
                    }
                }
            }
        };
        ;
        Draw.prototype.Curve = function (atTime, duration) {
            var speedInterval = 0.01;
            var prevCoord = this.CreateCoord(atTime, duration, 0);
            for (var i = 0; i < 0.999; i += speedInterval) {
                var nextCoord = this.CreateCoord(atTime, duration, i);
                if (this._ValidY(nextCoord.centery)) {
                    this.Line({
                        x: prevCoord.centerx,
                        y: prevCoord.centery,
                        tox: nextCoord.centerx,
                        toy: nextCoord.centery,
                        class: "staticLines"
                    });
                    this.Line({
                        x: prevCoord.centerx * -1,
                        y: prevCoord.centery,
                        tox: nextCoord.centerx * -1,
                        toy: nextCoord.centery,
                        class: "staticLines"
                    });
                    prevCoord = nextCoord;
                }
                else {
                    prevCoord = nextCoord;
                    break;
                }
            }
        };
        ;
        Draw.prototype.CreateCoord = function (atTime, duration, speed) {
            var coord = {};
            coord.lorentz = {};
            coord.lorentz.sol = 1;
            coord.lorentz.time = parseFloat(atTime) * (100 / duration);
            coord.lorentz.distance = 0;
            coord.lorentz.velocity = coord.lorentz.sol * speed;
            coord.lorentz.gamma = 1 / (Math.sqrt(1 - (Math.pow(coord.lorentz.velocity, 2) / Math.pow(coord.lorentz.sol, 2))));
            coord.lorentz.newTime = coord.lorentz.gamma * (coord.lorentz.time - ((coord.lorentz.velocity * coord.lorentz.distance) / Math.pow(coord.lorentz.sol, 2)));
            coord.lorentz.newDistance = coord.lorentz.gamma * (coord.lorentz.distance - (coord.lorentz.velocity * coord.lorentz.time)) * -1;
            coord.posx = coord.lorentz.newDistance;
            coord.posy = coord.lorentz.newTime;
            coord.centerx = coord.posx;
            coord.centery = coord.posy;
            coord.class = "lorentzItem";
            return coord;
        };
        ;
        Draw.prototype.CreateCoordRealTime = function (realTime, duration, speed) {
            var relCoord = this.CreateCoord(1, duration, speed);
            var coord = {};
            coord.centery = parseFloat(realTime) * (100 / duration);
            coord.percentOfY = coord.centery / relCoord.centery;
            coord.centerx = relCoord.centerx * coord.percentOfY;
            coord.class = "lorentzItem";
            return coord;
        };
        ;
        Draw.prototype.TestPattern = function () {
            this.Rectangle({ centerx: 0, centery: 20, width: 8, height: 8, class: "testRed" });
            this.Rectangle({ centerx: 0, centery: 20, width: 5, height: 5, class: "testBlue" });
            this.Circle({ centerx: 0, centery: 20, diameter: 5 });
            this.Circle({ centerx: -100, centery: 0 });
            this.Circle({ centerx: -100, centery: 100 });
            this.Circle({ centerx: 100, centery: 0 });
            this.Circle({ centerx: 100, centery: 100 });
        };
        Draw.prototype._TranslatePercent = function (coords) {
            var isValid = true;
            if (coords.x !== undefined) {
                if (!this._ValidX(coords.x)) {
                    isValid = false;
                }
                coords.x = this._TranslatePercentX(coords.x);
            }
            if (coords.y !== undefined) {
                if (!this._ValidY(coords.y)) {
                    isValid = false;
                }
                coords.y = this._TranslatePercentY(coords.y);
            }
            if (coords.tox !== undefined) {
                if (!this._ValidX(coords.tox)) {
                    isValid = false;
                }
                coords.tox = this._TranslatePercentX(coords.tox);
            }
            if (coords.toy !== undefined) {
                if (!this._ValidY(coords.toy)) {
                    isValid = false;
                }
                coords.toy = this._TranslatePercentY(coords.toy);
            }
            if (coords.centerx !== undefined) {
                if (!this._ValidX(coords.centerx)) {
                    isValid = false;
                }
                coords.centerx = this._TranslatePercentX(coords.centerx);
            }
            if (coords.centery !== undefined) {
                if (!this._ValidY(coords.centery)) {
                    isValid = false;
                }
                coords.centery = this._TranslatePercentY(coords.centery);
            }
            if (coords.width !== undefined) {
                coords.width = (parseFloat(coords.width) / 200) * this.frame.width;
            }
            if (coords.height !== undefined) {
                coords.height = (parseFloat(coords.height) / 100) * this.frame.height;
            }
            return isValid;
        };
        ;
        Draw.prototype._TranslatePercentX = function (oldX) {
            return this.frame.xoffset + ((parseFloat(oldX + 100) / (this.fullWidth ? 200 : 100)) * this.frame.width) - (this.fullWidth ? 0 : (this.frame.width));
        };
        ;
        Draw.prototype._TranslatePercentY = function (oldY) {
            return this.svgLorentz.viewBox.baseVal.height - (this.frame.yoffset + (parseFloat(oldY) / 100) * this.frame.height);
        };
        ;
        Draw.prototype._ValidX = function (x) {
            return true || Math.round(x) >= (this.fullWidth ? -100 : 0) && Math.round(x) <= 100;
        };
        ;
        Draw.prototype._ValidY = function (y) {
            return true || Math.round(y) >= 0 && Math.round(y) <= 100;
        };
        ;
        return Draw;
    }());
    Lorentz.Draw = Draw;
})(Lorentz || (Lorentz = {}));
//# sourceMappingURL=lorentz_draw.js.map