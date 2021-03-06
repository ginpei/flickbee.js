/* eslint new-cap: ["error", { "capIsNewExceptions": ["FlickBee"] }] */
/* global FlickBee */

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
	var elDialogContent = event.currentTarget;
	var elDialog = elDialogContent.closest('.js-dialog');
	var flickbee = window.flickbee;
	flickbee.fadeOut(function() {
		elDialog.classList.remove('is-visible');
		flickbee.restore();
	});
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
		var el = this;  // eslint-disable-line consistent-this
		for (el; el&&!el.matches(selector); el=el.parentElement) {
			// nothing to do
		}
		return el;
	};
}
