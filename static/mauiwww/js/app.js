angular.module('Jianjianbao', [
  'ngRoute',
  'mobile-angular-ui',
  'Jianjianbao.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'/static/mauiwww/templates/poster_main.html',  reloadOnSearch: false});
  $routeProvider.when('/signin', {templateUrl:'/static/mauiwww/templates/poster_create.html',  reloadOnSearch: false});
  
  $routeProvider.when('/id=:id&vnode=:vnode',
                      {templateUrl:'/static/mauiwww/templates/poster_main.html',
                       controller: 'PosterMainCtrl',
                       reloadOnSearch: false});
});