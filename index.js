const express = require("express");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const connection = require("./config/db");
const authentication = require("./middlewares/authentication");
const signupRouter = require("./routes/signup.Router");
const loginRouter = require("./routes/login.Router");
const todosRouter = require("./routes/todos.Routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/signup", signupRouter);
app.use("/login", loginRouter);

app.use(authentication);

app.get("/", (req, res) => {
  res.send("welcome to the server");
});

app.use("/todos", todosRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Server has started on ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  };
});
