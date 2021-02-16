var express = require("express");
const database = new (require("../database"))();
var userRouter = express.Router();

userRouter.get("/users", async (req, res) => {
  const response = await database.getAllUsersAsync();

  res.json(response.response);
});

module.exports = userRouter;
