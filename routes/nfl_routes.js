var Nfl = require(__dirname + '/../models/nfl');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');

var nflRoute = module.exports = exports = express.Router();

nflRoute.get('/nfl', function(req, res) {
  Nfl.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

nflRoute.post('/nfl', jsonParser, function(req, res) {
  var newPlayer = new Nfl(req.body);
  newPlayer.save(function(err, data) {
    if (err) handleError(err, res);
    res.json(data);
  });
});

nflRoute.put('/nfl/:id', jsonParser, function(req, res) {
  var newNflBody = req.body;
  delete newNflBody._id;
  Nfl.update({_id: req.params.id}, newNflBody, function(err, data) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});

nflRoute.delete('/nfl/:id', function(req, res) {
  Nfl.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});
