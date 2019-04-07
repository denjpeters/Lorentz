const lightColor = "yellow";

let leftLight = new Lorentz.Item(-1, "Light", lightColor);
let rightLight = new Lorentz.Item(1, "Light", lightColor);

leftLight.drawRay();
rightLight.drawRay();

// Lorentz.Draw.DrawSquare({centerx: 100, centery: 20, width: 8, height: 8});
// Lorentz.Draw.DrawSquare({centerx: 100, centery: 20, width: 5, height: 5, color: "blue"});
// Lorentz.Draw.DrawPoint({centerx: 100, centery: 20, diameter: 5});
// 
// Lorentz.Draw.DrawPoint({centerx: 0, centery: 0});
// Lorentz.Draw.DrawPoint({centerx: 0, centery: 100});
// Lorentz.Draw.DrawPoint({centerx: 200, centery: 0});
// Lorentz.Draw.DrawPoint({centerx: 200, centery: 100});

