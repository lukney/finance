var app = angular.module('plunker', ['nvd3ChartDirectives']);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
  
        $scope.exampleDataPieChart0 = [
            { key: "One", y: 59809 },
            { key: "Two", y: 2899 },
           
        ];  
        
        $scope.exampleDataPieChart1 = [
            { key: "One", y: 5 },
            { key: "Two", y: 2 },
         
        ];  
        
    $scope.exampleDataPieChart = [
      $scope.exampleDataPieChart0,
      $scope.exampleDataPieChart1
    ];
        
        $scope.xFunction = function () {
            return function (d) {
                return d.key;
            };
        };

        $scope.yFunction = function(){
            return function(d){
                return d.y;
            };
        }
});
