const lightColor = "gold";
const catColor = "gray";

let leftLight = new Lorentz.Item(-1, "Light", lightColor);
let rightLight = new Lorentz.Item(1, "Light", lightColor);

let me = new Lorentz.Item(0, "Me", "black");
let cat = new Lorentz.Item(0.25, "Cat", catColor);
let cat2 = new Lorentz.Item(-0.25, "Cat", "red");

// leftLight.drawRay();
// rightLight.drawRay();
// me.drawRay();
// cat.drawRay();
// cat2.drawRay();

// Lorentz.Draw.DrawSquare({centerx: 0, centery: 20, width: 8, height: 8});
// Lorentz.Draw.DrawSquare({centerx: 0, centery: 20, width: 5, height: 5, color: "blue"});

Lorentz.Draw.DrawPoint({centerx: 0, centery: 20, diameter: 5});

Lorentz.Draw.DrawPoint({centerx: -100, centery: 0});
Lorentz.Draw.DrawPoint({centerx: -100, centery: 100});
Lorentz.Draw.DrawPoint({centerx: 100, centery: 0});
Lorentz.Draw.DrawPoint({centerx: 100, centery: 100});

