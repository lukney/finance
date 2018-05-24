
var app = angular.module('products', []);
app.controller('productCTRL', function ($scope, $http, $window) {
	  $http.get('/newuser', {
						 						 
					}).then(function (response) {
						$scope.newuser= response.data.report;
						});
});
