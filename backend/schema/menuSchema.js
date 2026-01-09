const mongoose = require("mongoose");

let menuSchema = new mongoose.Schema({
  day: String,
  breakfast: String,
  lunch: String,
  tiffin: String,
  dinner: String,
});

let menu = mongoose.model("messmenu", menuSchema);

module.exports = menu;
