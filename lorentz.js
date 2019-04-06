var Lorentz = {};
Lorentz.Draw = {};

(function (context) {
	const cnvsLorentz = document.getElementById("cnvsLorentz");
	const ctx = cnvsLorentz.getContext("2d");
	const padding = 10;
	const frame = {
		width: cnvsLorentz.width * (1- (padding / 100)),
		height: cnvsLorentz.height * (1- (padding / 50)),
		xoffset: cnvsLorentz.width * (padding / 200),
		yoffset: cnvsLorentz.height * (padding / 100)
	};
	
	context.DrawSquare = function(coords) {
		if (coords.centerx !== undefined) {
			coords.x = coords.centerx - coords.width / 2;
		}
		if (coords.centery !== undefined) {
			coords.y = coords.centery + coords.height / 2;
		}
		
		context.TranslatePercent(coords);
		
		if (coords.color !== undefined) {
			ctx.fillStyle = coords.color;
		} else {
			ctx.fillStyle = "#FF0000";
		}
		ctx.fillRect(coords.x,coords.y,coords.width,coords.height);
	};

	context.DrawPoint = function(coords) {
		context.TranslatePercent(coords);
		
		if (coords.diameter === undefined) {
			coords.diameter = 2.5;
		}
		
		ctx.beginPath();
		ctx.arc(coords.centerx, coords.centery, parseFloat(frame.width) * (parseFloat(coords.diameter) / 400), 0, 2 * Math.PI);
// 		ctx.stroke();
		if (coords.color !== undefined) {
			ctx.fillStyle = coords.color;
		} else {
			ctx.fillStyle = "#FF0000";
		}
		ctx.fill();
	};
	
	context.TranslatePercent = function(coords) {
		if (coords.x !== undefined) {
			coords.x = frame.xoffset + (parseFloat(coords.x) / 200) * frame.width;
		}
		if (coords.y !== undefined) {
			coords.y = cnvsLorentz.height - (frame.yoffset + (parseFloat(coords.y) / 100) * frame.height);
		}
		if (coords.centerx !== undefined) {
			coords.centerx = frame.xoffset + (parseFloat(coords.centerx) / 200) * frame.width;
		}
		if (coords.centery !== undefined) {
			coords.centery = cnvsLorentz.height - (frame.yoffset + (parseFloat(coords.centery) / 100) * frame.height);
		}
		if (coords.width !== undefined) {
			coords.width = (parseFloat(coords.width) / 200) * frame.width;
		}
		if (coords.height !== undefined) {
			coords.height = (parseFloat(coords.height) / 100) * frame.height;
		}
		console.log(coords);
	};
})(Lorentz.Draw);
