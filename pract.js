var options = {
	series: {
		pie: {
			show: true,
			label: {
				show: true,
				threshold: 0.2
			}
		}
	},
	legend: {
		show: false
	}
};

angular.module('plunker', [])
.directive('myChart', function(){
    return {
        restrict: 'A',
        scope: {
          chartdata: "=",
        },
        link: function(scope, elm){
            $.plot($(elm), scope.chartdata, options);
        }
    }
})
.controller('AppCtrl', function($scope, $http) {
	 $http.get('http://localhost:3000/api/books')
            .then(function (response) {
              
					$scope.recordedEvents = response.data;
				
            })
	/*$scope.recordedEvents = [
	  {
	    "name": "server1",
	    "data":[{label: "", data:20, color: "#007cbb"}, {label: "", data:80, color: "#c2c6c9"}]
	  },
	  {
	    "name": "server2",
	    "data":[{label: "", data:70, color: "#007cbb"}, {label: "", data:30, color: "#c2c6c9"}]
	  }];*/
});