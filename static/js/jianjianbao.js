var app=angular.module('jianjianbaoApp', []);

function PosterObj($http) {
  this.addPoster = function(newPoster, callback){
    alert("subject | body | amount = " + newPoster.subject + "|" + newPoster.body + "|" + newPoster.amount);
    
    $http.post('/poster/add', {newPoster: newPoster })
    .success(function(data, status, headers, config) {
      callback(null, data);
    })
    .error(function(data, status, headers, config) {
    });
  };
}

app.service('commentSrv', ['$http', PosterObj]);
  
  app.controller('userController', ['$scope', '$http', 
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
     $scope.addPoster = function(subject, body, amount){
      //Same as models/poster_model.js field name
       var newPoster = {subject:subject, body:body, amount:amount};
       alert("newPoster: " + subject + "|" + body + "|"  + amount );
       commentSrv.addPoster(newPoster, function(err, newPoster){
         if (err) {

         } else {
           $scope.posterSubject = newPoster.subject;
           $scope.posterBody = newPoster.body;  
         }
       });
     };
   }]);