var eat = require('eat');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/handle_error');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var user;

module.exports = exports = function(req, res, next) {
  var encryptedToken = req.headers.token || (req.body? req.body.token : undefined);
  if (!encryptedToken)
    return res.status(401).json({msg: 'could not authenticat'});
  ee.emit('decode', encryptedToken, req, res, next);
};

ee.on('decode', function(encryptedToken, req, res, next){
  eat.decode(encryptedToken, process.env.APP_SECRET, function(err, token) {
    if (err) return handleError(err, res);
    ee.emit('findOne', encryptedToken, req, res, next, token);
  });
});

ee.on('findOne', function(encryptedToken, req, res, next, token) {
  User.findOne({_id: token.id}, function(err, user) {
    if (err) return handleError(err, res);
    if (!user) return res.status(401).json({msg: 'could not authenticat'});
    req.user = user;
    next();
  });
});
