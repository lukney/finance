/*var data = [
        {label: "", data:20, color: "#007cbb"},
        {label: "", data:80, color: "#c2c6c9"}
    ];*/
	var data = [$scope.recordedEvents]
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
        link: function(scope, elm){
            $.plot($(elm), data, options);
        }
    }
})
.controller('AppCtrl', function($scope) {
	$scope.recordedEvents = [
		{id: '#007cbb', name: 'customers', data: 89},
		{id: '#ef7624', name: 'employees', data: 90},
		{id: '#bbb322', name: 'vendors', data: 78},
		{id: '#449955', name: 'admin', data: 89}
    ];
});