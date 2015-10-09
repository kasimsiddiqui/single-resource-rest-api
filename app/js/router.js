module.exports = function(notesApp) {
  notesApp.config(['$routeProvider', function($route) {
    $route
      .when('/notes', {
        templateUrl: '/templates/notes/views/notes_view.html'
      })
      .when('/signup', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: 'SignupController'
      })
      .when('/signin', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: 'SigninController'
      })
      .otherwise({
        redirectTo: '/signup'
      });
  }]);
};
