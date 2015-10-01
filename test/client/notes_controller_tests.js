'use strict';

require('../../app/js/client');
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
    var notesController = $ControllerConstructor('notesController', {$scope: $scope});
    expect(typeof notesController).toBe('object');
    expect(Array.isArray($scope.notes)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      this.notesController = $ControllerConstructor('notesController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request on index', function() {
      $httpBackend.expectGET('/api/notes').respond(200, [{_id: '1', noteBody: 'test note'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.notes[0].noteBody).toBe('test note');
      expect($scope.notes[0]._id).toBe('1');
    });

    it('should save a new note', function() {
      $scope.newNote = {noteBody: 'test note'};
      $httpBackend.expectPOST('/api/notes').respond(200, {_id: '2', noteBody: 'test note'});
      $scope.createNewNote();
      $httpBackend.flush();
      expect($scope.notes[0].noteBody).toBe('test note');
      expect($scope.notes[0]._id).toBe('2');
    });

    it('should delete a note', function() {
      var note = {_id: '3', noteBody: 'test note'};
      $scope.notes.push(note);
      $httpBackend.expectDELETE('/api/notes/3').respond(200, {msg: 'success!'});
      expect($scope.notes.indexOf(note)).not.toBe(-1);
      $scope.removeNote(note);
      expect($scope.notes.indexOf(note)).toBe(0);
      $httpBackend.flush();
    });
  });
});




















