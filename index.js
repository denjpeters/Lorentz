const lightColor = "gold";
const catColor = "gray";

Lorentz.Draw.DrawOverlay();

// let leftLight = new Lorentz.Item(-1, "Light", lightColor);
// let rightLight = new Lorentz.Item(1, "Light", lightColor);

// let me = new Lorentz.Item(-0.5, "Me", "black");
// let cat = new Lorentz.Item(0.8, "Cat", "orange");
// let cat2 = new Lorentz.Item(0.99, "Cat", "red");

// leftLight.drawRay();
// rightLight.drawRay();
// me.drawRay();
// cat.drawRay();
// cat2.drawRay();

for (var i = 0; i < 0.9; i+= 0.02) {
	let itemFaster = new Lorentz.Item(i, "", "black");
	itemFaster.drawRay();

	let itemSlower = new Lorentz.Item(i * -1, "", "black");
	itemSlower.drawRay();
}

// Lorentz.Draw.DrawTestPattern();

