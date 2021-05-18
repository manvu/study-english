const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const homeController = require("../controllers/home");

router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const homeSummary = await homeController.getHomeSummary(userId);
  res.json(homeSummary);
});

module.exports = router;