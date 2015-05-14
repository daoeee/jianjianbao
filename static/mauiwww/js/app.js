var app = angular.module('JApp', [
  'ngRoute',
  'mobile-angular-ui'
]);

app.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'/static/mauiwww/templates/welcome.html',  reloadOnSearch: false});
  
  $routeProvider.when('/poster/creation',
                      {templateUrl:'/static/mauiwww/templates/poster_create.html',
                       controller: 'PosterCreationCtrl',
                       reloadOnSearch: false});
  
  $routeProvider.when('/poster/:id/vnode/:vnode',
                      {templateUrl:'/static/mauiwww/templates/poster_main.html',
                       controller: 'PosterMainCtrl',
                       reloadOnSearch: false});
  
  
});