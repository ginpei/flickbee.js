document.querySelector('.js-open').addEventListener('click', function(event) {
	var elDialog = document.querySelector('.js-dialog');
	elDialog.classList.add('is-visible');
	FlickBee({
		el: elDialog,
	});
});

document.addEventListener('click', function(event) {
	var elTarget = event.target;
	if (elTarget.closest('.dialog-content')) {
		// nothing to do
		return;
	}

	var elDialog = elTarget.closest('.dialog');
	if (elDialog) {
		elDialog.classList.remove('is-visible');
		return;
	}
});

if (!window.Element.prototype.closest) {
	window.Element.prototype.closest = function(selector) {
		for (var el=this; el&&!el.matches(selector); el=el.parentElement) ;
		return el;
	};
}
