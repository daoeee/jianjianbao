
app.controller('AppMainCtrl', function($rootScope){
    $rootScope.poster = {};
    $rootScope.posterMainPath = "/";
});

app.controller('WelcomeCtrl', function(){
    document.title = "荐荐宝";
});

app.controller('PosterMainCtrl', function($scope, $rootScope, $routeParams){
    
    document.title = $rootScope.poster.subject;
    
    console.log("PosterMainCtrl: id=" + $routeParams.id);
    console.log("PosterMainCtrl: vnode=" + $routeParams.vnode);
    
    
    $scope.cells = [
        { name: 'Carlos  Flowers', online: true },
        { name: 'Byron Taylor', online: true },
        { name: 'Jana  Terry', online: true },
        { name: 'Darryl  Stone', online: true },
        { name: 'Fannie  Carlson', online: true },
        { name: 'Holly Nguyen', online: true },
        { name: 'Bill  Chavez', online: true },
        { name: 'Veronica  Maxwell', online: true },
        { name: 'Jessica Webster', online: true },
        { name: 'Jackie  Barton', online: true },
        { name: 'Crystal Drake', online: false },
        { name: 'Milton  Dean', online: false },
        { name: 'Joann Johnston', online: false },
        { name: 'Cora  Vaughn', online: false },
        { name: 'Nina  Briggs', online: false },
        { name: 'Casey Turner', online: false },
        { name: 'Jimmie  Wilson', online: false },
        { name: 'Nathaniel Steele', online: false },
        { name: 'Aubrey  Cole', online: false },
        { name: 'Donnie  Summers', online: false },
        { name: 'Kate  Myers', online: false },
        { name: 'Priscilla Hawkins', online: false },
        { name: 'Joe Barker', online: false },
        { name: 'Lee Norman', online: false },
        { name: 'Ebony Rice', online: false }
    ];
    
});


app.controller('PosterCreationCtrl', function($scope, $rootScope, $location, $http){
    
    document.title = "发布";
    
    $scope.poster = {};
    
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
            console.log("success: post /api/v1/poster/" + data._id);
            $rootScope.poster = $scope.poster;
            $rootScope.poster.posterid = data._id;
            
            //微信结口取得用户标识，
            //后台调用: 存储当前访问结点(动作树根结点)
            var vnode = "1";
            
            //不刷新跳转
            $rootScope.posterMainPath = "/poster/"+ $rootScope.poster.posterid +"/vnode/" + vnode;
            $location.path($rootScope.posterMainPath);
        })
        .error(function(data, status, headers, config) {
            console.log("error:  post /api/v1/poster");
        });
    }
    
    //events
    
    $scope.$on('mobile-angular-ui.state.changed.activeSeagmentForAmount', function(e, newVal, oldVal) {
        $scope.poster.amount = newVal;
    });
    
});


