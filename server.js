var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/notes_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';

app.use(express.static(__dirname + '/build'));

var notesRouter = require(__dirname + '/routes/notes_routes');
var usersRouter = require(__dirname + '/routes/users_routes');
app.use('/api', notesRouter);
app.use('/api', usersRouter);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('server up on port: ' + port);
});
