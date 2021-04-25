const mongoose = require('mongoose');

const leagueSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  leagueName: { type: String, required: true},
  teams: [{
    team: {
      name: {type: String},
      points: {type: Number}
    }
  }]

});

module.exports = mongoose.model('League', leagueSchema);
