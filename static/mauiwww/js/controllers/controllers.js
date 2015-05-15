
app.controller('AppMainCtrl', function($rootScope, $http, $location){
    $rootScope.poster = {};
    
    $rootScope.loadPoster = function(id) {
        console.log("AppMainCtrl: 从后台取当面海报，id=" + id);
        
        $http.get('/api/v1/poster/' + id)
        .success(function(data, status, headers, config) {
            console.log("success: get /api/v1/poster/" + data._id);
            $rootScope.poster = data;
            
            //微信结口取得用户标识，
            //后台调用: 存储当前访问结点(动作树根结点)
            $rootScope.node = "current";
            
            //不刷新跳转
            $rootScope.posterMainPath = "/poster/"+ $rootScope.poster._id +"/node/" + $rootScope.node;
            $location.path($rootScope.posterMainPath);
            
            document.title = $rootScope.poster.subject;
        })
        .error(function(data, status, headers, config) {
            console.log("error:  get /api/v1/poster");
            $rootScope.posterMainPath = "";
            $location.path($rootScope.posterMainPath);
        });
    }
    
    //TODO 可以用Filter实现
    $rootScope.timeDiff = function(dateTimeStamp) {
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        
        var now = new Date().getTime();
        var diffValue = now - new Date(dateTimeStamp).getTime();

        
        if(diffValue < 0){
            //若日期不符则弹出窗口告之
            //alert("结束日期不能小于开始日期！");
         }
        var monthC =diffValue/month;
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;
        
        if (dayC>=2) {
            return parseInt(dayC) +"天前";
        } else if (dayC>=1){
            return "昨天";
        } else if(hourC>=1){
            return parseInt(hourC) +"小时前";
        } else if(minC>=1){
            return parseInt(minC) +"分钟前";
        }else {
            return "刚刚";
        }
    }
    
});

app.controller('WelcomeCtrl', function($rootScope){
    document.title = "荐荐宝";
    $rootScope.posterMainPath = "";
});

app.controller('PosterMainCtrl', function($scope, $rootScope, $routeParams){
    document.title = $rootScope.poster.subject;
    
    console.log("PosterMainCtrl: id=" + $routeParams.id);
    console.log("PosterMainCtrl: node=" + $routeParams.node);
    
    if ($rootScope.poster._id == null)  {
        $rootScope.loadPoster($routeParams.id);
    }
    
    $scope.cells = [
        //{ name: 'Carlos  Flowers', online: true },
        //{ name: 'Ebony Rice', online: false }
    ];
    
});

app.controller('PosterCreationCtrl', function($scope, $rootScope, $location, $http, $routeParams){
    
    document.title = "发布";
    $scope.poster = {tip:{}};
    
    if ($rootScope.poster._id == null)  {
        $rootScope.loadPoster($routeParams.id);
    }
    
    //actions
    
    $scope.createPoster = function() {
        
        //后台调用：
      
        var newPoster = {
            "subject" : $scope.poster.subject 
            , "body" : $scope.poster.body 
            , "tip" : {
                "method" : "现金红包"
                , "tip_amount" : $scope.poster.tip.tip_amount
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
            $rootScope.poster = data;
            
            //微信结口取得用户标识，
            //后台调用: 存储当前访问结点(动作树根结点)
            $rootScope.node = "current";
            
            //不刷新跳转
            $rootScope.posterMainPath = "/poster/"+ $rootScope.poster._id +"/node/" + $rootScope.node;
            $location.path($rootScope.posterMainPath);
        })
        .error(function(data, status, headers, config) {
            console.log("error:  post /api/v1/poster");
        });
    }
    
    //events
    
    $scope.$on('mobile-angular-ui.state.changed.activeSeagmentForAmount', function(e, newVal, oldVal) {
        $scope.poster.tip.tip_amount = newVal;
    });
    
});


