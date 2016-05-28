document.querySelector('.js-open').addEventListener('click', function(event) {
	var elDialog = document.querySelector('.js-dialog');
	elDialog.classList.add('is-visible');
	if (!window.flickbee) {
		window.flickbee = FlickBee({
			el: elDialog.querySelector('.dialog-content'),
		});
	}
});

document.querySelector('.js-dialogContent').addEventListener('swipeout', function(event) {
	console.log('flicked out!', event.dx, event.dy, event.rotate);
	window.flickbee.restore();
});

document.addEventListener('click', function(event) {
	var elTarget = event.target;
	if (elTarget.closest('.dialog-content')) {
		// ignore
		return;
	}

	var elDialog = elTarget.closest('.js-dialog');
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
