const mongoose = require("mongoose");

const PortfolioSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  PortfolioName: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  UpdatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Portfolio", PortfolioSchema, "Portfolio");
