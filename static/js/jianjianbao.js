var app=angular.module('myApp', []);

function PosterObj($http) {
  this.addPoster = function(newPoster, callback){
    $http.post('/poster/add', {newPoster: newPoster })
    .success(function(data, status, headers, config) {
      callback(null, data);
    })
    .error(function(data, status, headers, config) {
    });
  };
}

app.service('commentSrv', ['$http', PosterObj]);
  
  app.controller('myController', ['$scope', '$http', 
                              function($scope, $http) {
    $http.get('/user/profile')
        .success(function(data, status, headers, config) {
      $scope.user = data;
      $scope.error = "";
    }).
    error(function(data, status, headers, config) {
      $scope.user = {};
      $scope.error = data;
    });
  }]);

  app.controller('posterController', ['$scope', '$http','commentSrv', 
                            function($scope, $http, commentSrv) {
     $scope.posterSubject = "";
     $scope.posterBody = "";
     $scope.addPoster = function(subject, body){
       var newPoster = {subject:subject, body:body};
       commentSrv.addPoster(newPoster, function(err, comment){
         //$scope.loadComments();
       });
     };
   }]);