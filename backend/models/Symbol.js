const mongoose = require("mongoose");

const SymbolSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Symbol", SymbolSchema, "Symbol");
