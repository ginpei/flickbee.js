function FlickBee(options) {
	if (this instanceof FlickBee) {
		this.initialize(options);
	}
	else {
		return FlickBee.create(options);
	}
}

FlickBee.create = function(options) {
	var instance = new FlickBee(options);
	return instance;
};

if (!Object.assign) {
	Object.assign = function(orig) {
		// FIXME
		throw new Error('Object.assign is not implemented.');
	};
}

Object.assign(FlickBee.prototype, {
	/**
	 * @type number
	 */
	thresholdX: 100,

	/**
	 * @type Boolean
	 * @see #_startSwiping
	 * @see #_stopSwiping
	 */
	swiping: false,

	/**
	 * @param {object} options
	 */
	initialize: function(options) {
		this.el = options.el;

		this._bind(this.el);
	},

	/**
	 * @param {HTMLElement} el
	 */
	_bind: function(el) {
		el.addEventListener('mousedown', this.el_onmousedown.bind(this));
		window.document.addEventListener('mousemove', this.document_onmousemove.bind(this));
		window.document.addEventListener('mouseup', this.document_onmouseup.bind(this));
	},

	/**
	 * @param {number} event.clientX
	 * @param {number} event.clientY
	 */
	_saveStartPoint: function(event) {
		this._startX = event.clientX;
		this._startY = event.clientY;
	},

	/**
	 * @param {object} event If `null`, reset position.
	 * @param {number} event.clientX
	 * @param {number} event.clientY
	 */
	_move: function(event) {
		var dx;
		var dy;
		var style;

		if (event) {
			dx = event.clientX - this._startX;
			dy = event.clientY - this._startY;

			style = {
				rotate: this._getRotate(dx, dy),
				x: dx / 2,
				y: dy / 3,
			};
		}
		else {
			dx = 0;
			dy = 0;
			style = null;
		}

		this._dx = dx;
		this._dy = dy;
		this._setStyle(style);
	},

	/**
	 */
	restore: function() {
		this._move(null);
	},

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {number}
	 */
	_getRotate: function(x, y) {
		return x/20;
	},

	/**
	 * @param {number} style.x
	 * @param {number} style.y
	 * @param {number} style.rotate
	 */
	_setStyle: function(style) {
		var styleText;
		if (style) {
			var styleDefinitions = [
				'translateX(' + style.x + 'px)',
				'translateY(' + style.y + 'px)',
				'rotate(' + style.rotate + 'deg)',
			];
			styleText = styleDefinitions.join(' ');
		}
		else {
			styleText = null;
		}
		this.el.style.transform = styleText;
	},

	/**
	 * @see #swiping
	 */
	_startSwiping: function() {
		this.swiping = true;
	},

	/**
	 * @see #swiping
	 */
	_stopSwiping: function() {
		this.swiping = false;
	},

	/**
	 * @returns {Boolean}
	 */
	isSwipedFarther: function() {
		return (this._dx < -this.thresholdX || this._dx > this.thresholdX);
	},

	/**
	 */
	_triggerSwiped: function() {
		var event = this._createSwipeOutEvent();
		this.el.dispatchEvent(event);
	},

	/**
	 * @returns {Event}
	 */
	_createSwipeOutEvent: function() {
		var event = new Event('swipeout');
		event.type = 'swipeout';
		event.dx = this._dx;
		event.dy = this._dy;
		return event;
	},

	/**
	 * @param {Event} event
	 */
	el_onmousedown: function(event) {
		event.preventDefault();
		this._startSwiping();
		this._saveStartPoint(event);
	},

	/**
	 * @param {Event} event
	 */
	document_onmousemove: function(event) {
		if (this.swiping) {
			this._move(event);
		}
	},

	/**
	 * @param {Event} event
	 */
	document_onmouseup: function(event) {
		if (this.swiping) {
			this._stopSwiping();
			if (this.isSwipedFarther()) {
				this._triggerSwiped();
			}
			else {
				this.restore();
			}
		}
	},
});
