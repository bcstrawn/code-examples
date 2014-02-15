var Two = function() {
	this.solve = function(max) {
		var num1 = 1;
		var num2 = 2;
		var nums = [num1, num2];
		var sum = 0;

		for (var i = 2; ; i++) {
			var nextFibonacci = nums[i-1] + nums[i-2];
			if (nextFibonacci > max)
				break;
			nums.push(nextFibonacci);
		}

		for (var i = 0; i < nums.length; i++) {
			if (nums[i] % 2 == 0) {
				sum += nums[i];
			}
		}

		return sum;
	};
};