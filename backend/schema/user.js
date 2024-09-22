const client = require("mongoose");

let userSchema = new client.Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  room: {
    type: String,
  },
  batch: {
    type: String,
  },
  role: {
    type: String,
  },
});

const user = client.model("users", userSchema);

module.exports = user;
