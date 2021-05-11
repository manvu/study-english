var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth");

router.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const gender = req.body.gender || "U";
  const profilePictureId = req.body.profilePictureId || 1;
  const roleId = "2";

  const registerEntity = await authController.register({
    email,
    password,
    gender,
    profilePictureId,
    roleId
  });

  res.json(registerEntity)
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const loginEntity = await authController.login({
    email,
    password,
  });

  res.json(loginEntity);
});

module.exports = router;
