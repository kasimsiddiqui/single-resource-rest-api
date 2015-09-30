var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var httpBasic = require(__dirname + '/../lib/http_basic');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

var usersRouter = module.exports = exports = express.Router();

usersRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.basic.username = req.body.username;
  newUser.username = req.body.username;
  ee.emit('generateHash', newUser, req, res);
});

ee.on('generateHash', function(newUser, req, res){
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) return handleError(err, res);
    ee.emit('save', newUser, req, res);
  });
});

ee.on('save', function(newUser, req, res){
  newUser.save(function(err, data) {
    if (err) return handleError(err, res);
    ee.emit('newUser', newUser, req, res)
  });
});

ee.on('newUser', function(newUser, req, res){
  newUser.generateToken(function(err, token) {
    if (err) return handleError(err, res);
    res.json({token: token});
  });
});

var user;

usersRouter.get('/signin', httpBasic, function(req, res) {
  ee.emit('findOne', req, res, user);
});

ee.on('findOne', function(req, res, user){
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if (err) return handleError(err, res);
    if (!user) {
      console.log('could not authenticat: ' + req.auth.username);
      return res.status(401).json({msg: 'could not authenticat'});
    }
    ee.emit('compareHashAgain', req, res, user)
  });
});

ee.on('compareHashAgain', function(req, res, user){
  user.compareHash(req.auth.password, function(err, hashRes) {
    if (err) return handleError(err, res);
    if (!hashRes) {
      console.log('could not authenticat: ' + req.auth.username);
      return res.status(401).json({msg: 'authenticat says no!'});
    }
    ee.emit('generateToken', req, res, user);
  });
});

ee.on('generateToken', function(req, res, user){
  user.generateToken(function(err, token) {
    if (err) return handleError(err, res);
    res.json({token: token});
  });
});

