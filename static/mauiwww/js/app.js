var app = angular.module('JApp', [
  'ngRoute',
  'mobile-angular-ui'
]);

app.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'/static/mauiwww/templates/poster_main.html',  reloadOnSearch: false});
  $routeProvider.when('/signin', {templateUrl:'/static/mauiwww/templates/poster_create.html',  reloadOnSearch: false});
  
  $routeProvider.when('/poster/:id/vnode/:vnode',
                      {templateUrl:'/static/mauiwww/templates/poster_main.html',
                       controller: 'PosterMainCtrl',
                       reloadOnSearch: false});
});