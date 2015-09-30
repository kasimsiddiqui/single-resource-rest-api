module.exports = function(app) {
  app.controller('NotesController', ['$scope', '$http', function($scope, $http) {
    $scope.notes = [];

    $scope.getAll = function() {
      $http.get('/api/notes')
        .then(function(res) {
          $scope.notes = res.data;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.createNote = function(note) {
      $http.post('/api/notes', note)
        .then(function(res) {
          $scope.notes.push(res.data);
          $scope.newNote = null;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.updateNote = function(note) {
      note.status = 'pending';
      $http.put('/api/notes/' + note._id, note)
        .then(function(res) {
          delete note.status;
          note.editing = false;  
        }, function(res) {
          console.log(res);
          note.status = 'failed';
          note.editing = false;
        });
    };

    $scope.removeNote = function(note) {
      note.status = 'pending';
      $http.delete('/api/notes/' + note._id)
        .then(function() {
          $scope.notes.splice($scope.notes.indexOf(note), 1);
        }, function(res) {
          note.status = 'failed';
          console.log(res);
        });
    };
  }]);
};
