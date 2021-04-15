const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  //email: { type: String, required: true, unique: true},
  username: { type: String, required: true, unique: true },
  userType: {type: String, required: true },
  role: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date },
  club: { type: String },
  team: { type: String }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
