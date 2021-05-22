const express = require("express");
const router = express.Router();
const authTeacherMiddleware = require("../middlewares/authTeacher");
const teacherController = require("../controllers/teacher");

router.get("/", authTeacherMiddleware, async (req, res) => {
  const teacherHome = await teacherController.getTeacherHome()

  res.status(200).json(teacherHome)
});

router.get("/quizzes/:id", authTeacherMiddleware, async (req, res) => {
  const quizId = req.params.id
  const quiz = await teacherController.getQuizForEdit(quizId)
  res.status(200).json(quiz)
})

router.get("/questions/:id", authTeacherMiddleware, async (req, res) => {
  const questionId = req.params.id
  const question = await teacherController.getQuestionForEdit(questionId)
  res.status(200).json(quiz)
})

module.exports = router;
