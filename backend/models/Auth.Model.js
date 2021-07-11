const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  login_type: {
    type: String,
  },
});

module.exports = mongoose.model("user_login", AuthSchema);
