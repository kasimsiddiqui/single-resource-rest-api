module.exports = function(app) {
  app.controller('NotesController', ['$scope', 'Resource', '$http', '$cookies', '$location', function($scope, Resource, $http, $cookies, $location) {

    var eat = $cookies.get('eat');
    if (!(eat && eat.length))
      $location.path('/signup');

    $http.defaults.headers.common.token = eat;
    $scope.notes = [];
    $scope.newNote = {};
    var noteResource = Resource('notes');
    $scope.description= 'this is our app, there are many like it but this one is ours';

    $scope.printDescription = function(description) {
      console.log('from the function: ' + description);
      console.log('from $scope: ' + $scope.description);
    };

    $scope.getAll = function() {
      noteResource.getAll(function(err, data) {
        if (err) return console.log(err);
        $scope.notes = data;
      });
    };

    $scope.createNote = function(note) {
      noteResource.create(note, function(err, data) {
        if(err) return console.log(err);
        $scope.newNote = {};
        $scope.notes.push(data);
      });
    };

    $scope.saveNote = function(note) {
      note.editing = false;
      Note.save(note, function(err, data) {
      });
    };

    $scope.editCancel = function(note) {
      if(note.editing) {
        note.noteBody = note.temp;
        note.temp = undefined;
        note.editing = false;
      } else {
        note.temp = note.noteBody;
        note.editing = true;
      }
    };

    $scope.removeNote = function(note) {
      noteResource.remove(note, function(err) {
        if (err) return console.log(err);
        $scope.notes.splice($scope.notes.indexOf(note), 1);
      });
    };
  }]);
};
