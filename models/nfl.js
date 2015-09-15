var mongoose = require('mongoose');

var nflSchema = new mongoose.Schema({
  team: String,
  playerName: String,
  position: String,
  number: Number
});

module.exports = mongoose.model('nfl', nflSchema);
