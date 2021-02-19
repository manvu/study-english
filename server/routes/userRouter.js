var express = require("express");
const database = new (require("../database"))();
var userRouter = express.Router();
const cors = require("cors");

var corsOptions = {
  origin: "*",
};

userRouter.use(cors(corsOptions));

userRouter.get("/users", async (req, res) => {
  const response = await database.getAllUsersAsync();

  res.json(response.response);
});

module.exports = userRouter;
