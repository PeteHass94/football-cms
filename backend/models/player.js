const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  playerName: { type: String, required: true},
  dob: { type: Date, required: true },
  clubName: { type: String },
  teams: [{ type: mongoose.Schema.Types.ObjectId}],
  stats: {
      appearances: {type:  Number},
      goals: { type: Number },
      assists: {type: Number}
  },
  trainings: [{ type: mongoose.Schema.Types.ObjectId }],
  matches: [{ type: mongoose.Schema.Types.ObjectId }]

});

module.exports = mongoose.model('Player', playerSchema);
