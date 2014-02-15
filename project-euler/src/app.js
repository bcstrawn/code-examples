angular.module('euler', [])
.controller('eulerCtrl', ['$scope', function($scope) {
	$scope.problems = [
		{number: 1, answer: (new One()).solve(1000)},
		{number: 2, answer: (new Two()).solve(4000000)}
	];
}]);