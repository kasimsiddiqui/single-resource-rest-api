var Note = require(__dirname + '/../models/note');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var notesRoute = module.exports = exports = express.Router();

notesRoute.get('/notes', function(req, res) {
  Note.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

notesRoute.post('/notes', jsonParser, eatAuth, function(req, res) {
  var newNote = new Note(req.body);
  newNote.author = req.user.username;
  newNote.save(function(err, data) {
    if (err) handleError(err, res);
    res.json(data);
  });
});

notesRoute.put('/notes/:id', jsonParser, eatAuth, function(req, res) {
  var newNoteBody = req.body;
  delete newNoteBody._id;
  Note.update({_id: req.params.id}, newNoteBody, function(err, data) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});

notesRoute.delete('/notes/:id', jsonParser, eatAuth, function(req, res) {
  Note.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});
