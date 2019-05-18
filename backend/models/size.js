const mongoose = require("mongoose");

const sizeSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  legsLength: { type: Number, required: true },
  hipLine: { type: Number, required: true },
  shirtLength: { type: Number, required: true },
  bust: { type: Number, required: true },
  shoulder: { type: Number, required: true },
  sleeves: { type: Number, required: true }
});

module.exports = mongoose.model("Size", sizeSchema);
///dskdjskdskmmsk
