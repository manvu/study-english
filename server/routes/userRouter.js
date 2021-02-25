var express = require("express");
const database = new (require("../database"))();
var userRouter = express.Router();
const cors = require("cors");
const { getUserIdFromToken } = require("../helper");
const { AUTHENTICATION_FAILED, ERROR_OCCURRED } = require("../strings");
const { hashPasswordAsync } = require("../helper");

var corsOptions = {
  origin: "*",
};

userRouter.use(cors(corsOptions));

userRouter.get("/users", async (req, res) => {
  const response = await database.getAllUsersAsync();

  res.json(response.response);
});

userRouter.get("/info", async (req, res) => {
  debugger
  const userId = getUserIdFromToken(req.headers.authorization);

  if (userId) {
    let userInfo = await database.getUserInfo(userId);

    if (!userInfo.error) {
      if (userInfo.response.length === 0) {
        res.status(400).json({
          error: ERROR_OCCURRED
        })
      } else {
        res.status(200).json({
          error: null,
          user: userInfo.response[0]
        })
      }
    }
  } else {
    res.status(400).json({
      error: AUTHENTICATION_FAILED,
    });
  }
});

userRouter.post("/info", async (req, res) => {
  debugger
  const userId = getUserIdFromToken(req.headers.authorization);
  let email = req.body.email;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let password = req.body.password

  if (userId) {
    let userInfo
    if (password) {
      const { passwordHash, passwordSalt } = await hashPasswordAsync(password);
      userInfo = await database.saveUserInfo(userId, email, firstName, lastName, passwordHash, passwordSalt);
    } else {
      userInfo = await database.saveUserInfo(userId, email, firstName, lastName);
    }

    if (!userInfo.error) {
      if (userInfo.response.affectedRows === 1) {
        res.status(200).json({
          error: null,
        })
      }
    }
  } else {
    res.status(400).json({
      error: AUTHENTICATION_FAILED,
    });
  }
});

module.exports = userRouter;
