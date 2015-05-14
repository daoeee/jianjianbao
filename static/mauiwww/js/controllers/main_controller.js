var controllers = angular.module('Jianjianbao.controllers.Main', []);

controllers.controller('MainController', function($scope, $location, $routeParams){
    
    $scope.poster = {};
    
    $scope.createPoster = function() {
        var subject = $scope.poster.subject;
        var amount = $scope.poster.amount;
        //alert(subject + "|" + amount);
        
        //后台调用
        $scope.poster.posterid = "abc123";
        
        document.title = subject;
        
        history.replaceState("", "Title", "#id="+ $scope.poster.posterid +"&vnode=1");
        
        $location.path('/');
    }
    
    $scope.$on('mobile-angular-ui.state.changed.activeSeagmentForAmount', function(e, newVal, oldVal) {
        //alert(newVal);
        $scope.poster.amount = newVal;
  });
  
});


controllers.controller('PosterMainCtrl', function($scope, $location, $routeParams){
    alert($routeParams.id + "|" + $routeParams.vnode); 
    
});


