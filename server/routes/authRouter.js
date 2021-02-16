var express = require("express");
const database = new (require("../database"))();
const { checkPassword, hashPasswordAsync } = require("../helper");
const STRINGS = require("../strings");
var authRouter = express.Router();


authRouter.get("/register", async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  const gender = req.query.gender;
  const profilePictureId = req.query.profilePictureId;
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

authRouter.get("/login", async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  // Get user_id and password
  const response = await database.validateUserAsync(email);

  if (!response.error) {
    if (response.response.length === 0) {
      res.json({
        error: STRINGS.AUTHENTICATION_FAILED,
        message: STRINGS.PLEASE_CHECK_YOUR_EMAIL,
      });
    } else {
      const passwordHash = response.response[0].password_hash;
      const success = await checkPassword(password, passwordHash);

      if (success) {
        res.json({
          error: null,
          message: STRINGS.AUTHENTICATION_SUCCEEDED,
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
