var Three = function() {
	this.solve = function(unfactoredNumber) {
		var partlyFactoredNumber = unfactoredNumber;
		var factors = [];

		for (var i = 2; i <= partlyFactoredNumber; i++) {
			if (partlyFactoredNumber % i === 0) {
				partlyFactoredNumber /= i;
				factors.push(i);
			}
		}

		return factors[factors.length-1];
	}
}