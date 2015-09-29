require('angular/angular');

var notesApp = angular.module('nflApp', []);

notesApp.controller('nflController', ['$scope', function($scope) {
  $scope.greeting = 'hello world';
}]);
