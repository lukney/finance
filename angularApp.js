var angularApp = angular.module('angularApp', ['chart.js']);

angularApp.controller('wallPosts', ['$scope', '$http', function($scope, $http){
    $scope.posts = [];
    $scope.labels = ["Agree", "Disagree"];
    $scope.data = [];

$http.get('http://localhost:3000/api/books/')
   .success(function(res) {
     $scope.posts = res.posts;

     // populate post.data
     $scope.posts.forEach(function(post) {
        post.data = [post.TAmount, post.LAmount];
     });
   })
}]);