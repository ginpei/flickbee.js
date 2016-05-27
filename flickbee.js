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
	 * @param {number} event.clientX
	 * @param {number} event.clientY
	 */
	_move: function(event) {
		var dx = event.clientX - this._startX;
		var dy = event.clientY - this._startY;

		var style = {
			y: dy / 3,
		};
		this._setStyle(style);
	},

	_setStyle: function(style) {
		var styleDefinitions = [
			'translateY(' + style.y + 'px)'
		];
		var styleText = styleDefinitions.join(' ');
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
		}
	},
});
