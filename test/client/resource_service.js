require('../../app/js/client');

describe('resource service', function() {
  beforeEach(angular.mock.module('notesApp'));

  var ResourceService;
  var $httpBackend;
  var notesResource;
  beforeEach(angular.mock.inject(function(Resource, _$httpBackend_) {
    ResourceService = Resource;
    $httpBackend = _$httpBackend_;
    notesResource = ResourceService('notes');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a get requets', function() {
    $httpBackend.expectGET('/api/notes').respond(200, [{noteBody: 'test note', _id: 1}]);
    notesResource.getAll(function(err, data) {
      expect(err).toBe(null);
      expect(Array.isArray(data)).toBe(true);
    });
    $httpBackend.flush(); 
  });
});
