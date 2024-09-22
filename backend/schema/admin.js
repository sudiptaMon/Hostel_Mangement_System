const mongoose = require("mongoose");

let adminSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  room: {
    type: String,
  },
  role: {
    type: String,
  },
});

const admin = mongoose.model("Admin", adminSchema);

module.exports = admin;
