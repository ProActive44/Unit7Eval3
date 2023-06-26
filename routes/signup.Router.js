const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const signupRouter = express.Router();

signupRouter.post("/", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashed_pass = bcrypt.hashSync(password, 8);
    const new_user = new userModel({
      email,
      password: hashed_pass,
      name,
    });
    await new_user.save();
    res.status(200).send({ msg: "Signup Suceessfull" });
  } catch (error) {
    res.status(501).send({msg: "Failed to Signup" })
  }
});

module.exports = signupRouter;
