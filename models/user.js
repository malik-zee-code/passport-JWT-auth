const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const UserSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("user", UserSchema);
