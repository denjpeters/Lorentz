svgLorentz.addEventListener("click", function(e) {
	const element = e.target;
	const item_id = element.getAttribute('data-item_id');

	if (item_id !== null) {
		lorentz_Items.displayDetails(item_id);
	} else {
		lorentz_Items.displayDetails();
	}
});
