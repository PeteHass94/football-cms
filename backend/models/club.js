const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const clubSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clubName: { type: String, ref: "User", required: true, unique: true },
  teams: [{
    type: mongoose.Schema.Types.ObjectId
  }],
  players: [{
    type: mongoose.Schema.Types.ObjectId
  }]

});

clubSchema.plugin(uniqueValidator);
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('Club', clubSchema);
