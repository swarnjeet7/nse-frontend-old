const mongoose = require("mongoose");

const PivotSchema = mongoose.Schema({
  Symbol: {
    type: String,
    required: true,
  },
  Series: {
    type: String,
    required: true,
  },
  R3: {
    type: Number,
    required: true,
  },
  R2: {
    type: Number,
    required: true,
  },
  R1: {
    type: Number,
    required: true,
  },
  PP: {
    type: Number,
    required: true,
  },
  S1: {
    type: Number,
    required: true,
  },
  S2: {
    type: Number,
    required: true,
  },
  S3: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Pivot", PivotSchema, "Pivot");
