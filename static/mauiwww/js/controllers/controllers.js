
app.controller('AppMainCtrl', function($rootScope){
    $rootScope.poster = {};
});

app.controller('WelcomeCtrl', function(){
    document.title = "荐荐宝";
});

app.controller('PosterMainCtrl', function($rootScope, $routeParams){
    
    document.title = $rootScope.poster.subject;
    
    console.log("PosterMainCtrl: id=" + $routeParams.id);
    console.log("PosterMainCtrl: vnode=" + $routeParams.vnode);
    
});


app.controller('PosterCreationCtrl', function($scope, $rootScope, $location, $http){
    
    document.title = "发布";
    
    $rootScope.poster = {};
    
    //actions
    
    $scope.createPoster = function() {
        
        //后台调用：
      
        var newPoster = {
            "subject" : $rootScope.poster.subject 
            , "body" : $rootScope.poster.body 
            , "tip" : {
                "method" : "现金红包"
                , "tip_amount" : $rootScope.poster.amount
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
            console.log("success: post /api/v1/poster/" + data._id);
            $rootScope.poster.posterid = data._id;
            
            //微信结口取得用户标识，
            //后台调用: 存储当前访问结点(动作树根结点)
            var vnode = "1";
            
            //不刷新跳转
            $location.path("/poster/"+ $rootScope.poster.posterid +"/vnode/" + vnode);
        })
        .error(function(data, status, headers, config) {
            console.log("error:  post /api/v1/poster");
        });
        
    }
    
    //events
    
    $scope.$on('mobile-angular-ui.state.changed.activeSeagmentForAmount', function(e, newVal, oldVal) {
        $rootScope.poster.amount = newVal;
    });
    
});


