function FlickBee(options) {
	if (this instanceof FlickBee) {
		this.initialize(options);
	}
	else {
		FlickBee.create(options);
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
	initialize: function(options) {
		console.log('FlickBee');
	},
});
