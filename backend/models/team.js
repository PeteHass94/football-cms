const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
  clubName: { type: String, required: true},
  teamName: { type: String, required: true},
  managers: [{
    type: String
  }],
  coaches: [{
    type: String
  }],
  players: [{
    type: String
  }]


});

module.exports = mongoose.model('Team', teamSchema);
