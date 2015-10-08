'use strict';

require('angular/angular');

var notesApp = angular.module('notesApp', []);

require('./services/resources_services')(notesApp);
require('./directives/directives')(notesApp);
require('./notes/controllers/notes_controller')(notesApp);
