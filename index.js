const lightColor = "gold";
const catColor = "gray";

Lorentz.Draw.DrawOverlay();

let leftLight = new Lorentz.Item(-1, "Light", lightColor);
let rightLight = new Lorentz.Item(1, "Light", lightColor);

let me = new Lorentz.Item(0.8, "Me", "black");
let cat = new Lorentz.Item(0.5, "Cat", "orange");
let cat2 = new Lorentz.Item(0.99, "Cat", "red");

// leftLight.drawRay();
// rightLight.drawRay();
me.drawRay();
cat.drawRay();
cat2.drawRay();

// Lorentz.Draw.DrawTestPattern();

