var express = require("express");
const database = new (require("../database"))();
var securityRouter = express.Router();
const PERMISSIONS = require("../permissions");
const STRINGS = require("../strings");
const cors = require("cors");
const {getUserIdFromToken} = require("../helper");

var corsOptions = {
  origin: "*",
};

securityRouter.use(cors(corsOptions));

securityRouter.get("/permission", async ({ res }, { req }) => {
  const email = req.query.email;
  const permission = req.query.permission_name;

  const response = await database.hasPrivilegeAsync(email, permission);

  if (response.response.length > 0) {
    if (response.response[0].enabled) {
      res.json({
        error: null,
        message: STRINGS.ACCESS_GRANTED,
      });
    } else {
      res.json({
        error: STRINGS.ACCESS_DENIED,
        message: STRINGS.ACCESS_DENIED_MESSAGE,
      });
    }
  } else {
    res.json({
      error: STRINGS.UNKNOWN_PERMISSION,
    });
  }
});

module.exports = securityRouter;
