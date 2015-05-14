app.controller('AppMainCtrl', function($scope, $location){
        $scope.poster = {};
    
    $scope.createPoster = function() {
        var subject = $scope.poster.subject;
        var amount = $scope.poster.amount;
        //alert(subject + "|" + amount);
        
        //后台调用：
        $scope.poster.posterid = "abc123";
        
        //微信结口取得用户标识，
        //后台调用: 存储当前访问结点(动作树根结点)
        var vnode = "1";
        
        //不刷新跳转
        $location.path("/poster/"+ $scope.poster.posterid +"/vnode/" + vnode);
    }
    
    //events
    
    $scope.$on('mobile-angular-ui.state.changed.activeSeagmentForAmount', function(e, newVal, oldVal) {
        $scope.poster.amount = newVal;
    });
  
});


app.controller('PosterMainCtrl', function($scope, $routeParams){
    
    document.title = $scope.poster.subject;
    alert($routeParams.id + "|" + $routeParams.vnode);
    
});


