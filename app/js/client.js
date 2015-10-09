require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');
var angular = window.angular;

var notesApp = angular.module('notesApp', ['ngRoute', 'base64', 'ngCookies']);

require('./services/services')(notesApp);
require('./filters/filters')(notesApp);
require('./directives/directives')(notesApp);
require('./notes/notes')(notesApp);
require('./users/users')(notesApp);
require('./logout')(notesApp);
require('./router')(notesApp);
