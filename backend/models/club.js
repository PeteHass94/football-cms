const mongoose = require('mongoose');

const clubSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clubName: { type: String, ref: "User", required: true},
  teams: [{
    type: String
  }],
  players: [{
    type: String
  }]


});

module.exports = mongoose.model('Club', clubSchema);
