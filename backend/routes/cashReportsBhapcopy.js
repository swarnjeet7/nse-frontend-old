const express = require("express");
const router = express.Router();
const _ = require("lodash");
const fs = require("fs");
const { parse } = require("csv-parse");
const Cash = require("../models/Cash");
const PortfolioScript = require("../models/PortfolioScript");
const moment = require("moment");

function CashQuery(filter) {}

router.get("/bhavcopy", function (req, res) {
  try {
    const {
      from,
      to = moment(new Date(from)).add(1, "days").format("MM/DD/yyyy"),
      Portfolio,
    } = req.query;

    if (Portfolio) {
      PortfolioScript.find({ Portfolio }, (err, script) => {
        if (err) throw err;
        if (!_.isEmpty(script[0].Scripts)) {
          Cash.find(
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

router.post("/bhavcopy", function (req, res) {
  try {
    fs.createReadStream(req.files.file.tempFilePath)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        const last = Number(row[6]) === 0 ? row[5] : row[6];
        const cash = new Cash({
          Symbol: row[0],
          Series: row[1],
          Open: row[2],
          High: row[3],
          Low: row[4],
          Close: row[5],
          Last: row[6],
          PrevClose: row[7],
          TotalTradeQuantity: row[8],
          TotalTradeValue: row[9],
          Timestamp: row[10],
          TotalTrades: row[11],
          ISIN: row[12],
          Profit: ((last - row[7]) / row[7]) * 100,
        });
        cash.save();
      });

    res.status(200).send({
      status: 200,
      message: "The data has been updated successfully",
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/top", function (req, res) {
  const {
    type,
    date,
    endDate = moment(new Date(date)).add(1, "days").format("MM/DD/yyyy"),
    count = 5,
  } = req.query;
  const order = type === "Gainers" ? "desc" : "asc";

  Cash.find({
    $gte: new Date(date),
    $lt: new Date(endDate),
  })
    .sort({ Profit: order })
    .limit(count)
    .exec((err, docs) => {
      res.json(docs);
    });
});

module.exports = router;
