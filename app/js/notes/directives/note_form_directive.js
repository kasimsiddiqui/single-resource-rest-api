module.exports = function(app) {
  app.directive('noteForm', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/notes/directives/note_form_template.html',
      scope: {
        labelText: '@',
        buttonText: '@',
        note: '=',
        save: '&'
      },
      controller: function($scope) {
        console.log($scope.save);
      }
    }
  });
};
