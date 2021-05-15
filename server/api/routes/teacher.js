const express = require("express");
const router = express.Router();
const authTeacherMiddleware = require("../middlewares/authTeacher");
const teacherController = require("../controllers/teacher");

router.get("/", authTeacherMiddleware, async (req, res) => {
  const teacherHome = await teacherController.getTeacherHome()

  res.status(200).json(teacherHome)
});

module.exports = router;
