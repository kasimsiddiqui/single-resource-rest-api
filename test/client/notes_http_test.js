require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('notes controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('notesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = new $ControllerConstructor('NotesController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.notes)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('NotesController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request when getAll() is called', function() {
      $httpBackend.expectGET('/api/notes').respond(200, [{noteBody: 'test note'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.notes[0].noteBody).toBe('test note');
    });

    it('should be able to create a note', function() {
      $httpBackend.expectPOST('/api/notes', {noteBody: 'send test note'}).respond(200, {_id: 1, noteBody: 'test note'});
      $scope.newNote = {noteBody: 'hello'};
      $scope.createNote({noteBody: 'send test note'});
      $httpBackend.flush();
      expect($scope.notes[0].noteBody).toBe('test note');
      expect($scope.newNote).toEqual({});
    });

    it('should be able to update a note', function() {
      var note = {noteBody: 'test note', _id: 1, editing: true};
      $httpBackend.expectPUT('/api/notes/1', note).respond(200);
      $scope.updateNote(note);
      $httpBackend.flush();
      expect(note.editing).toBe(false);
    });

    it('should be able to delete a note', function() {
      var note = {noteBody: 'test note', _id: 1};
      $scope.notes = [note];
      $httpBackend.expectDELETE('/api/notes/1').respond(200);
      $scope.removeNote(note);
      $httpBackend.flush();
      expect($scope.notes.length).toBe(0);
      expect($scope.notes.indexOf(note)).toBe(-1);
    });
  });
});
