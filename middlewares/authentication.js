require("dotenv").config();
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    const token = req.headers.autherization?.split(" ")[1];

    if (!token) {
      return res.status(400).send({ msg: "Please Login again" });
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(500).send({ msg: "Please Login again" });
      }
      if (decoded) {
        req.body.userId = decoded.userId;
        next();
      }
    });
  } catch (error) {
    res.status(500).send({"msg":"Login Failed"})
  }
};

module.exports = authentication
