var express = require("express");
const database = new (require("../../database"))();
const STRINGS = require("../../misc/strings");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const authTeacherMiddleware = require("../middlewares/authTeacher");
const quizzesController = require("../controllers/quizzes");
const helper = require("../../misc/helper");

router.get("/home", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  const homeSummary = await quizzesController.getHomeSummary(userId);

  res.json(homeSummary);
});

router.get("/statistics", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  let quizStats = await database.getQuizStatisticsByUserId(userId);
  let answerStats = await database.getAnswerStatisticsByUserId(userId);

  if (!quizStats.error) {
    res.status(200).json({
      error: null,
      response: {
        quizStatistics: quizStats.response[0],
        answerStatistics: answerStats.response[0],
      },
    });
  }
});

router.get("/teacher", authTeacherMiddleware, async (req, res) => {
  let homeSummary = await database.getHomeSummary();
  let allSkills = await database.getAllSkills();
  let questionTypes = await database.getAllQuestionTypes();

  if (!homeSummary.error && !allSkills.error && !questionTypes.error) {
    res.status(200).json({
      error: null,
      response: {
        quizzes: homeSummary.response,
        allSkills: allSkills.response,
        allQuestionTypes: questionTypes.response,
      },
    });
  }
});

router.get("/quiz/:id", authMiddleware, async (req, res) => {
  const quizId = req.params.id;
  const userId = req.user.id;

  let latestAttempt = await database.getLatestAttempt(quizId, userId);

  if (!latestAttempt.error) {
    let questions;
    let questionsContent;
    let response;
    let userAnswerQuestions;

    if (
      latestAttempt.response.length === 0 ||
      (latestAttempt.response.length === 1 &&
        latestAttempt.response[0].end_time !== null)
    ) {
      // User has never attempted this quiz or has completed the quiz
      questions = await database.getQuestionsByQuizId(quizId);
      questionsContent = await database.getQuestionsContentByQuizId(quizId);

      let numberOfQuestions = questions.response.length;

      if (numberOfQuestions > 0) {
        let newAttemptId =
          latestAttempt.response.length === 1 &&
          latestAttempt.response[0].end_time !== null
            ? latestAttempt.response[0].attemptId + 1
            : 1;

        let newAttempt = await database.createNewAttempt(
          quizId,
          userId,
          newAttemptId
        );

        userAnswerQuestions = await database.createPlaceholderAnswer(
          quizId,
          userId,
          newAttemptId,
          numberOfQuestions
        );
      } else {
        res.status(400).json({
          error: STRINGS.ERROR_OCCURRED,
        });
      }
    } else {
      // User has attempted this quiz but has not completed it
      const attemptId = latestAttempt.response[0].attempt_id;

      questions = await database.getQuestionsByQuizId(
        quizId,
        userId,
        attemptId
      );

      questionsContent = await database.getQuestionsContentByQuizId(quizId);
      userAnswerQuestions = await database.getUserAnswerQuestionByUserIdAndQuizIdAndAttemptId(
        quizId,
        userId,
        attemptId
      );
    }

    if (!questions.error && !questionsContent.error) {
      response = questions.response;

      let questionsContentByQuizIdObject = {};

      for (let i = 0; i < userAnswerQuestions.response.length; i++) {
        response[i].answer_text = userAnswerQuestions.response[i].answer_text;
      }

      for (let i = 0; i < questionsContent.response.length; i++) {
        let currentItem = questionsContent.response[i];
        if (questionsContentByQuizIdObject[currentItem.question_id]) {
          questionsContentByQuizIdObject[currentItem.question_id].push(
            currentItem
          );
        } else {
          questionsContentByQuizIdObject[currentItem.question_id] = [
            currentItem,
          ];
        }
      }

      for (let i = 0; i < response.length; i++) {
        let obj = helper.cleanObject(questionsContentByQuizIdObject[i + 1]);
        response[i].content = obj;
      }

      res.status(200).json({
        error: null,
        questions: response,
      });
    }
  }
});

module.exports = router;
