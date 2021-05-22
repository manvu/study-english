const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const authMiddleware = require("../middlewares/auth");
const authTeacherMiddleware = require("../middlewares/authTeacher");

router.post("/", authMiddleware, async (req, res) => {
  let threadId = req.body.threadId;
  let content = req.body.content;
  const userId = req.user.id;

  let post = await postsController.createPost({ threadId, content, userId });

  res.json(post);
});

router.get("/:id", async (req, res) => {
  let postId = req.params.id;

  let post = await postsController.getPost(postId);

  res.json(post);
});

router.delete("/:id", authTeacherMiddleware, async (req, res) => {
  let postId = req.params.id;

  let post = await postsController.deletePost(postId);

  res.json(post);
});

module.exports = router;
