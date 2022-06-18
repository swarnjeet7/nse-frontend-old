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
    set: function (v) {
      return v.toFixed(2);
    },
  },
  R2: {
    type: Number,
    required: true,
    set: function (v) {
      return v.toFixed(2);
    },
  },
  R1: {
    type: Number,
    required: true,
    set: function (v) {
      return v.toFixed(2);
    },
  },
  P: {
    type: Number,
    required: true,
    set: function (v) {
      return v.toFixed(2);
    },
  },
  S1: {
    type: Number,
    required: true,
    set: function (v) {
      return v.toFixed(2);
    },
  },
  S2: {
    type: Number,
    required: true,
    set: function (v) {
      return v.toFixed(2);
    },
  },
  S3: {
    type: Number,
    required: true,
    set: function (v) {
      return v.toFixed(2);
    },
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Pivot", PivotSchema, "Pivot");
