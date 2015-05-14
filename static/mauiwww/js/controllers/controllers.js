app.controller('AppMainCtrl', function($scope, $location, $routeParams){
    document.title = "荐荐宝";
    
    $scope.poster = {};
});


app.controller('PosterMainCtrl', function($scope, $routeParams){
    
    document.title = $scope.poster.subject;
    
    console.log("id:" + $routeParams.id);
    console.log("vnode:" + $routeParams.vnode);
    
});


app.controller('PosterCreationCtrl', function($scope, $location, $http){
    
    document.title = "发布";
    
    $scope.poster.subject = "newsubject-1";
    $scope.poster.body = "newbody-say-1";
    $scope.poster.amount = 50;
    
    
    //actions
    
    $scope.createPoster = function() {
        
        //后台调用：
      
        var newPoster = {
            "subject" : $scope.poster.subject 
            , "body" : $scope.poster.body 
            , "tip" : {
                "method" : "现金红包"
                , "tip_amount" : $scope.poster.amount
                //, "保证帐户收款流水号" : ["1"]
                , "tip_method" : []
            }
            , "create_userid" : "1"
            , "close_status" : "是"
            , "close_timestamp" : null
        };
       
        newPoster.tip.tip_method.push({"userid": "2", "tip_amount": 4.00, "pay_id":["2"]});
        newPoster.tip.tip_method.push({"userid": "3", "tip_amount": 16.00, "pay_id":["3"]});
        
        $http.post('/api/v1/poster', {newPoster: newPoster})
        .success(function(data, status, headers, config) {
            console.log("success: post /api/v1/poster");
            $scope.poster.posterid = data.posterid;
        })
        .error(function(data, status, headers, config) {
            console.log("error:  post /api/v1/poster");
        });
        
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


