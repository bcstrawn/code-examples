describe('1', function() {
	var one = new One();

	it('calculates the sum of multiples of 3 or 5 below 10 as 23', function() {
		expect(one.solve(10)).toBe(23);
	});
});

describe('2', function() {
	var two = new Two();

	it('calculates the sum of even fibonacci numbers below 10 as 44', function() {
		expect(two.solve(89)).toBe(44);
	});
});

describe('3', function() {
	var three = new Three();

	it('calculates the largest prime number of 13195 to be 29', function() {
		expect(three.solve(13195)).toBe(29);
	});
});

