'use strict';

module.exports = function(app) {
  app.controller('notesController', ['$scope', '$http', function($scope, $http) {
    $scope.notes = [];

    $scope.getAll = function() {
      $http.get('/api/notes')
        .then(function(res){
          $scope.notes = res.data;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.createNewNote = function(note) {
      $http.post('/api/notes', note)
        .then(function(res){
          $scope.notes.push(res.data);
          $scope.note = {};
        }, function(res) {
          console.log(res);
        });
    };

    $scope.removeNote = function(note) {
      $http.delete('/api/notes/' + note._id)
        .then(function(res){
          $scope.notes.splice($scope.notes.indexOf(note), 1);
        }, function(res) {
          console.log(res);
        });
    };

    $scope.saveNote = function(note) {
      $http.put('/api/notes/' + note._id, note)
        .then(function(res){
          note.editing = false;
        }, function(res) {
          console.log(res);
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

  }]);
};
