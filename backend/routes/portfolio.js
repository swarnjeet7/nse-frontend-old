const express = require("express");
const router = express.Router();
const _ = require("lodash");
const fs = require("fs");
const { parse } = require("csv-parse");
const Portfolio = require("../models/Portfolio");
const moment = require("moment");

router.get("/all", function (req, res) {
  try {
    Portfolio.find({}, function (err, data) {
      res.json(data);
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/create", function (req, res) {
  const { Name, PortfolioName, Address } = req.body;
  try {
    Portfolio.findOne({ Name }, (err, user) => {
      if (user) {
        return res.status(400).send({
          message: `The user with ${
            (Name, PortfolioName)
          } has already been existed. Please choose another name`,
        });
      }

      const portfolio = new Portfolio({
        Name,
        PortfolioName,
        Address,
      });

      portfolio.save().then((data) => {
        res.status(200).send({
          status: 200,
          message: "The user has been added successfully",
          data,
        });
      });
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.patch("/edit", function (req, res) {
  const { id, Name, PortfolioName, Address } = req.body;
  try {
    Portfolio.findOne({ _id: id }).exec((err, portfolio) => {
      if (!portfolio) {
        return res.status(400).send({
          message: `The user not found`,
        });
      }
      if (Name) {
        portfolio.Name = Name;
      }
      if (PortfolioName) {
        portfolio.PortfolioName = PortfolioName;
      }
      if (Address) {
        portfolio.Address = Address;
      }
      portfolio.save().then((user) => {
        res.json({
          status: 200,
          message: "The user has been updated successfully",
          data: user,
        });
      });
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
