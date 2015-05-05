var app=angular.module('jianjianbaoApp', []);

function PosterObj($http) {
  this.addPoster = function(newPoster, callback){
    //alert("subject | body | amount = " + newPoster.subject + "|" + newPoster.body + "|" + newPoster.amount);
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


app.controller('indexController', ['$scope', '$http', 
                              function($scope, $http) {
    $http.get('/api/posterpages/'+$scope.username)
        .success(function(data, status, headers, config) {
      $scope.posters = data;
      $scope.error = "";
    }).
    error(function(data, status, headers, config) {
      $scope.posters = {};
      $scope.error = data;
    });
  }]);


app.controller('posterPageController', ['$scope', '$http', '$window',
                              function($scope, $http, $window) {
    var url = $window.location.href;
    var pattern = /^http:\/\/localhost:8003/;
    var newURL = url.replace(pattern,"/api");                            
    $http.get(newURL)
        .success(function(data, status, headers, config) {
      $scope.posterSubject = data.subject;
      $scope.posterBody = data.body;
      //$scope.error = "";
    }).
    error(function(data, status, headers, config) {
      //$scope.user = {};
      $scope.error = data;
    });
  }]);

  app.controller('posterController', ['$scope', '$http', '$window','commentSrv', 
                            function($scope, $http, $window,commentSrv) {
     $scope.posterSubject = "";
     $scope.posterBody = "";
     $scope.posterAmt = "";
     $scope.addPoster = function(subject, body, amount){
      //Same as models/poster_model.js field name
       var newPoster = {subject:subject, body:body, amount:amount};
       //alert("newPoster: " + subject + "|" + body + "|"  + amount );
       commentSrv.addPoster(newPoster, function(err, data){
         if (err) {

         } else {
           //$scope.posterSubject = newPoster.subject;
           //$scope.posterBody = newPoster.body; 
           $window.location.href = 'http://localhost:8003/posterpage/'+data.posterid; 
         }
       });
     };
   }]);