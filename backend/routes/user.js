const express = require("express");
const router = express.Router();
const _ = require("lodash");
const fs = require("fs");
const { parse } = require("csv-parse");
const User = require("../models/User");
const moment = require("moment");

router.post("/login", function (req, res) {
  const { UserName, Password } = req.body;
  try {
    User.findOne({ UserName: UserName }, function (err, user) {
      if (err) throw err;

      // test a matching password
      user.comparePassword(Password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          res.json({
            login: true,
            status: 200,
            message: "You have logged in successfully",
            data: user,
          });
        }
      });
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/create", function (req, res) {
  const { UserName, UserType, FullName, Password, ConfirmPassword } = req.body;
  try {
    const user = new User({
      UserName,
      UserType,
      FullName,
      Password,
      ConfirmPassword,
    });
    user.save().then((user) => res.json(user));
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.patch("/create", function (req, res) {
  const { UserName, UserType, FullName, Password, ConfirmPassword } = req.body;
  try {
    User.findOne({ UserName: UserName }, function (err, user) {
      if (err) throw err;
      if (UserType) {
        user.UserType = UserType;
      }
      if (FullName) {
        user.FullName = FullName;
      }
      if (Password) {
        user.Password = Password;
      }
      if (ConfirmPassword) {
        user.ConfirmPassword = ConfirmPassword;
      }
      user.save().then((err, data) => {
        if (err) res.json(err);
        res.json(data);
      });
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
