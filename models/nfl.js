var mongoose = require('mongoose');

var nflSchema = new mongoose.Schema({
  team: {type:String, required:true},
  playerName: {type:String, required:true},
  position: String,
  number: Number
});

module.exports = mongoose.model('nfl', nflSchema);
