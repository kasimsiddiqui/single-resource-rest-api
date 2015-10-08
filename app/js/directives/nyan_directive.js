module.exports = function(app) {
  app.directive('nyan', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/directives/nyan_directive_template.html',
      transclude: true,
      scope: {
        title: '@'
      },
      controller: function($scope) {
        $scope.description= 'nyan';
      }
    }
  });
};
