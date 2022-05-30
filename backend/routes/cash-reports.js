const express = require("express");
const router = express.Router();
const fs = require("fs");
import _ from "lodash";

const json = require("../assets/cash_reports_bhavcopy.json");
const gainers = require("../assets/gainers.json");

router.get("/bhavcopy", function (req, res) {
  res.json(json);
});

router.post("/bhavcopy", function (req, res) {
  const nameParams = _.remove(req.files.file.name.split("."), _.identity);
  const fileName = _.takeWhile(nameParams, (name) => name !== "csv");
  console.log(fileName);
  // fs.readFile(req.files.file, function (err, data) {
  //   console.log(data);
  //   // Do something with the data (which holds the file information)
  // });
});

router.get("/top", function (req, res) {
  res.json(gainers);
});

module.exports = router;
