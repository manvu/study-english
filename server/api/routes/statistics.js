const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const authTeacherMiddleware = require("../middlewares/authTeacher");
const statisticsController = require("../controllers/statistics");

router.get("/", authMiddleware, async (req, res) => {
    const userId = req.user.id;

    const statistics = await statisticsController.getStatistics(userId)

    res.status(200).json(statistics)
});

router.get("/board/quiz", authTeacherMiddleware, async (req, res) => {
    const dateFrom = req.body.dateFrom
    const dateTo = req.body.dateTo
    const quizId = req.body.quizId

    const statistics = await statisticsController.getBoardStatisticsByQuiz(quizId)

    res.status(200).json(statistics)
});

router.get("/board/student", authTeacherMiddleware, async (req, res) => {
    const dateFrom = req.body.dateFrom
    const dateTo = req.body.dateTo

    const statistics = await statisticsController.getStatistics(userId)

    res.status(200).json(statistics)
});

module.exports = router;
