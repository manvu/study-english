const express = require("express");
const quizzesController = require("../controllers/quizzes");
const authMiddleware = require("../middlewares/auth");
const authTeacherMiddleware = require("../middlewares/authTeacher");
const router = express.Router();

router.post("/start/:id", authMiddleware, async (req, res) => {
  const quizId = req.params.id;
  const userId = req.user.id;

  const quiz = await quizzesController.startQuiz(quizId, userId);
  res.status(200).json(quiz);
});

router.get("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const quiz = await quizzesController.getQuiz(id);
  res.status(200).json(quiz);
});

router.post("/", authTeacherMiddleware, async (req, res) => {
  const data = {
    courseName: req.body.courseName,
    description: req.body.description,
    isActive: req.body.isActive,
    timeAllowed: req.body.timeAllowed,
    selectedSkillId: req.body.selectedSkillId,
    id: req.user.id,
  };

  const quiz = quizzesController.createQuiz(data);

  res.json(quiz);
});

router.put("/:id", authTeacherMiddleware, async (req, res) => {
  const data = {
    quizId: req.params.id,
    courseName: req.body.courseName,
    description: req.body.description,
    isActive: req.body.isActive,
    timeAllowed: req.body.timeAllowed,
    selectedSkillId: req.body.selectedSkillId,
    userId: req.user.id,
  };

  const quiz = await quizzesController.submitAndMark(data);

  res.status(200).json(quiz);
});

router.put("/:id/favorite", authMiddleware, async (req, res) => {
  let quizId = req.params.id;
  const userId = req.user.id;

  const rating = await quizzesController.toggleFavorite({ quizId, userId });

  res.status(200).json(rating);
});

router.put("/:id/rating", authMiddleware, async (req, res) => {
  const quizId = req.params.id;
  const userId = req.user.id;
  const ratingGiven = req.body.ratingGiven;

  const rating = await quizzesController.setRating({
    quizId,
    userId,
    ratingGiven,
  });

  res.status(200).json(rating);
});

router.post("/submit", authMiddleware, async (req, res) => {
  const quizId = req.body.quizId;
  const attemptId = req.body.attemptId;
  const userId = req.user.id;

  const submit = await quizzesController.submitAndMark({
    quizId,
    attemptId,
    userId,
  });

  res.status(200).json(submit);
});

module.exports = router;
