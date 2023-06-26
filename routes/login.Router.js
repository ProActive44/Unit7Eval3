const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../models/user.model");

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).send({ msg: "Please Enter Right Credetials" });
    }
    const hash = user.password;
    const correct_Pass = bcrypt.compareSync(password, hash);
    if (correct_Pass) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(200).send({ msg: "Login Suceessfull", token });
    } else {
      res.status(400).send({ msg: "Login Failed" });
    }
  } catch {
    res.status(500).send({ msg: "Login Failed" });
  }
});


module.exports = loginRouter