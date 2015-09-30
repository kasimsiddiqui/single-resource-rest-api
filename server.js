var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/notes_dev');

app.use(express.static(__dirname + '/build'));
var notesRouter = require(__dirname + '/routes/notes_routes');
app.use('/api', notesRouter);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('server up on port: ' + port);
});
