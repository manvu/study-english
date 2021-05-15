const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const discussionController = require("../controllers/discussion");

router.get("/", async (req, res) => {
  const threads = await discussionController.getThreads()

  res.status(200).json(threads)
});

module.exports = router;