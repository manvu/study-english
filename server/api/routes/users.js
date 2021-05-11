const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");

router.get("/all", async (req, res) => {
  const allUsers = await usersController.getUsers();

  res.json(allUsers);
});

router.get("/", authMiddleware, async (req, res) => {
  const user = await usersController.getUser(req.user.id);

  res.json(user);
});

router.post("/", authMiddleware, async (req, res) => {
  const data = {
    id: req.user.id,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };

  const user = await usersController.updateUser(data);

  res.json(user)
});

module.exports = router;
