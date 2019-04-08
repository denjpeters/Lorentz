
Lorentz.Draw.Overlay();

// for (var i = 0; i < 0.9; i+= 0.02) {
// 	let itemFaster = new Lorentz.Item(i, "", "black");
// 	itemFaster.drawRay();
//
// 	let itemSlower = new Lorentz.Item(i * -1, "", "black");
// 	itemSlower.drawRay();
// }

let me = new Lorentz.Item(-0.5, "Me", "black");
let cat = new Lorentz.Item(0.8, "Cat", "orange");
let cat2 = new Lorentz.Item(0.9, "Cat", "red");

me.drawRay();
cat.drawRay();
cat2.drawRay();

// Lorentz.Draw.TestPattern();

