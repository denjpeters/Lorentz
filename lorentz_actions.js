svgLorentz.addEventListener("click", function(e) {
	const element = e.target;
	const item_id = element.getAttribute('data-item_id');

	if (item_id !== null) {
		console.log(item_id);
	}
});
