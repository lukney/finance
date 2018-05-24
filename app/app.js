(function (window, angular, undefined) {
  'use strict';

  var app = angular.module('myApp', ['chart.js']);
  angular.module('myApp').controller('PieCtrl', PieCtrl);
  PieCtrl.$inject = ['$scope'];
  function PieCtrl($scope) {
    $scope.chartLabels = ['Series A','Series B'];
    var a=2000,b=3000,c,d;
	c= 100-((a/b)*100)
	d =(a/b)*100
	
	$scope.chartData = [c, d];
	$scope.onClickSlice = function (points, evt) {
          console.log(points);
        };
  };
  

})(window, window.angular);
