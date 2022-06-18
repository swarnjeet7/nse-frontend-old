const express = require("express");
const router = express.Router();
const _ = require("lodash");
const fs = require("fs");
const { parse } = require("csv-parse");
const Pivot = require("../models/Pivot");
const moment = require("moment");

router.get("/", function (req, res) {
  const {
    from,
    to = moment(new Date(from)).add(1, "days").format("MM/DD/yyyy"),
    Portfolio,
  } = req.query;
  try {
    if (Portfolio) {
      PortfolioScript.find({ Portfolio }, (err, script) => {
        if (err) throw err;
        if (!_.isEmpty(script[0].Scripts)) {
          Pivot.find(
            {
              $gte: new Date(from),
              $lt: new Date(to),
              Symbol: { $in: [...script[0].Scripts] },
            },
            (err, data) => {
              if (err) throw err;
              res.json(data);
            }
          );
        }
      });
    } else {
      Cash.find(
        {
          $gte: new Date(from),
          $lt: new Date(to),
        },
        (err, data) => {
          if (err) throw err;
          res.json(data);
        }
      );
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
