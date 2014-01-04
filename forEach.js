module.exports = exports = {
	do: function(set, callback) {
		for (var i = 0; i < set.length; i++) {
			var item = set[i];
			callback(item);
		}
	},

	select: function(set, callback, options) {
		var processed = [];
		if (set === null || set === undefined) {
			return null;
		}

		for (var i = 0; i < set.length; i++) {
			var item = set[i];
			var result = callback(item, processed);
			if (result !== null && result !== undefined) {
				if (options && options.unique === true) {
					if (processed.indexOf(result) === -1) {
						processed.push(result);
					}
				} else {
					processed.push(result);
				}
			}
		}

		if (processed.length === 0 && !(options && options.returnEmpty)) {
			return null;
		} else if (processed.length === 1 && !(options && options.forceArray)) {
			return processed[0];
		}

		return processed;
	},

	obj: {
		do: function(set, callback) {
			for (var field in set) {
				if (set.hasOwnProperty(field)) {
					var item = set[field];
					callback(item);
				}
			}
		},

		select: function(set, callback, options) {
			var processed;
			if (options && options.returnObject) {
				processed = {};
			} else {
				processed = [];
			}

			for (var field in set) {
				if (set.hasOwnProperty(field)) {
					var item = set[field];
					var result = callback(item);

					if (options && options.returnObject) {
						processed[field] = result;
					} else {
						processed.push(result);
					}
				}
			}

			return processed;
		}
	}
};