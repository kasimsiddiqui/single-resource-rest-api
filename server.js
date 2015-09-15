var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/nfl');


var nflRouter = require(__dirname + '/routes/nfl_routes');
app.use('/api', notesRouter);

app.listen(port, function() {
  console.log('Server running on port ' + port);
});
