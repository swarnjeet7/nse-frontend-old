const express = require("express");
const router = express.Router();
const PortfolioScript = require("../models/PortfolioScript");

router.post("/", function (req, res) {
  const { Name, Scripts } = req.body;

  try {
    PortfolioScript.findOne({ Name }, (err, script) => {
      if (err) throw err;
      if (script) {
        return res.status(400).send({
          message: `The PortfolioName with ${Name} has already been existed. Please choose another name`,
        });
      }

      const portfolioScript = new PortfolioScript({
        Name,
        Scripts,
      });

      portfolioScript.save().then((data) => {
        res.status(200).send({
          status: 200,
          message: "The PortfolioScript has been added successfully",
          data,
        });
      });
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.patch("/", function (req, res) {
  const { Name, Scripts } = req.body;

  try {
    PortfolioScript.findOne({ Name }).exec((err, script) => {
      if (err) throw err;
      if (!script) {
        return res.status(400).send({
          message: `The portfolio script not found`,
        });
      }
      if (Name) {
        script.Name = Name;
      }
      if (Scripts) {
        script.Scripts = Scripts;
      }

      script.save().then((portfolioScript) => {
        res.json({
          status: 200,
          message: "The portfolio script has been updated successfully",
          data: portfolioScript,
        });
      });
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.delete("/", function (req, res) {
  const { Name } = req.body;

  try {
    PortfolioScript.findOneAndDelete({ Name }).exec((err, data) => {
      if (err) throw err;
      res.json({
        status: 200,
        message: "The portfolio script has been deleted successfully",
        data,
      });
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
