var express = require("express");
const database = new (require("../database"))();
const { checkPassword, hashPasswordAsync } = require("../helper");
const STRINGS = require("../strings");
var authRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");


var corsOptions = {
  credentials: true,
  origin: true,
};

authRouter.use(cors(corsOptions));


authRouter.use(bodyParser.json());

authRouter.use(bodyParser.urlencoded({ extended: true }));

authRouter.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender || 'U';
  const profilePictureId = req.body.profilePictureId || 1;
  const roleId = "2";

  // Generate hash and salt out of password
  const { passwordHash, passwordSalt } = await hashPasswordAsync(password);

  // Add a user
  const response = await database.addUserAsync(
    email,
    passwordHash,
    passwordSalt,
    gender,
    roleId,
    profilePictureId
  );
    debugger
  if (!response.error) {
    if (response.response.affectedRows === 1) {
      res.json({
        error: null,
        message: STRINGS.REGISTERING_USER_SUCCEEDED
      });
    } else {
      res.json({
        error: STRINGS.REGISTERING_USER_FAILED,
      });
    }
  } else {
    res.json({
      error: STRINGS.CANNOT_REGISTER_USER_WITH_EMAIL(email),
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  // Get user_id and password
  const response = await database.validateUserAsync(email);

  debugger

  if (!response.error) {
    if (response.response.length === 0) {
      res.json({
        error: STRINGS.AUTHENTICATION_FAILED,
        message: STRINGS.PLEASE_CHECK_YOUR_EMAIL,
      });
    } else {
      const passwordHash = response.response[0].password_hash;
      const firstName = response.response[0].first_name;
      const lastName = response.response[0].last_name;
      const isTeacher = response.response[0].role_id === 1 ? true : false
      const success = await checkPassword(password, passwordHash);
      
      if (success) {
        res.json({
          error: null,
          message: STRINGS.AUTHENTICATION_SUCCEEDED,
          userInfo: {
            firstName,
            lastName,
            isTeacher
          }
        });
      } else {
        res.json({
          error: STRINGS.AUTHENTICATION_FAILED,
          message: STRINGS.PLEASE_CHECK_YOUR_PASSWORD,
        });
      }
    }
  } else {
    res.json({
      error: STRINGS.AUTHENTICATION_FAILED,
    });
  }
});

module.exports = authRouter;
