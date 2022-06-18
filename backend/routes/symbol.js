const express = require("express");
const router = express.Router();
const Symbol = require("../models/Symbol");

router.get("/", function (req, res) {
  try {
    Symbol.find({}, (err, data) => {
      if (err) throw err;
      res.json({
        status: 200,
        message: "Success",
        data,
      });
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
