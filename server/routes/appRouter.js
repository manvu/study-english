var express = require("express");
const database = new (require("../database"))();
const STRINGS = require("../strings");
var appRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const { getUserIdFromToken } = require("../helper");
const { AUTHENTICATION_FAILED, ERROR_OCCURRED } = require("../strings");
const dotenv = require("dotenv").config();
const helper = require("../helper");

var corsOptions = {
  credentials: true,
  origin: true,
};

appRouter.use(cors(corsOptions));

appRouter.use(bodyParser.json());

appRouter.use(bodyParser.urlencoded({ extended: true }));

appRouter.get("/home", async (req, res) => {
  const userId = getUserIdFromToken(req.headers.authorization);

  let quizzesInfoResponse = await database.getQuizInfo(userId);

  if (!quizzesInfoResponse.error) {
    let response = quizzesInfoResponse.response;

    res.json({
      error: null,
      quizzes: response,
    });
  }
});

appRouter.get("/quiz/:id", async (req, res) => {
  let quizId = req.params.id;
  const userId = getUserIdFromToken(req.headers.authorization);

  if (!userId) {
    res.status(403).json({
      error: AUTHENTICATION_FAILED
    })
  }

  let latestAttemptResponse = await database.getLatestAttemptByQuizIdAndUserId( quizId, userId );

  if (!latestAttemptResponse.error) {
    let questionsByQuizIdResponse;
    let questionsContentByQuizIdResponse;
    let response;
    let userAnswerQuestions;
    
    if ( latestAttemptResponse.response.length === 0 || (latestAttemptResponse.response.length === 1 && latestAttemptResponse.response[0].end_time !== null) ) {
      // User has never attempted this quiz or has completed the quiz
      questionsByQuizIdResponse = await database.getQuestionsByQuizId(quizId);
      questionsContentByQuizIdResponse = await database.getQuestionsContentByQuizId( quizId );

      let numberOfQuestions = questionsByQuizIdResponse.response.length

      if (numberOfQuestions > 0) {
        let newAttemptId = latestAttemptResponse.response.length === 1 && latestAttemptResponse.response[0].end_time !== null ? latestAttemptResponse.response[0].attemptId + 1 : 1

        let newAttempt = await database.createNewAttempByUserIdAndQuizId(quizId, userId, newAttemptId) 
  
         userAnswerQuestions = await database.createUserAnswerQuestionByUserIdAndQuizIdAndAttemptId(quizId, userId, newAttemptId, numberOfQuestions)
      } else {
        res.status(400).json({
          error: ERROR_OCCURRED
        })
      }
    } else {
      
      // User has attempted this quiz but has not completed it
      const attemptId = latestAttemptResponse.response[0].attempt_id;

      

      questionsByQuizIdResponse = await database.getQuestionsByQuizId(quizId, userId, attemptId);
      questionsContentByQuizIdResponse = await database.getQuestionsContentByQuizId( quizId );
      userAnswerQuestions = await database.getUserAnswerQuestionByUserIdAndQuizIdAndAttemptId(quizId, userId, attemptId)
    }

    if ( !questionsByQuizIdResponse.error && !questionsContentByQuizIdResponse.error ) {
      response = questionsByQuizIdResponse.response;

      let questionsContentByQuizIdObject = {};

      for (let i = 0; i < userAnswerQuestions.response.length; i++ ) {
        response[i].answer_text = userAnswerQuestions.response[i].answer_text
      }

      for ( let i = 0; i < questionsContentByQuizIdResponse.response.length; i++ ) {
        let currentItem = questionsContentByQuizIdResponse.response[i];
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

      res.json({
        error: null,
        questions: response,
      });
    }
  }
});

appRouter.get("/discussion", async (req, res) => {
  let discussionThreadsResponse = await database.getDiscussionThreadsAsync();

  if (!discussionThreadsResponse.error) {
    res.json({
      error: null,
      threads: discussionThreadsResponse.response,
    });
  }
});

appRouter.get("/statistics", async (req, res) => {
  const userId = getUserIdFromToken(req.headers.authorization);

  if (userId) {
    let getQuizStatisticsByUserIdResponse = await database.getQuizStatisticsByUserId(
      userId
    );
    let getAnswerStatisticsByUserIdResponse = await database.getAnswerStatisticsByUserId(
      userId
    );

    if (!getQuizStatisticsByUserIdResponse.error) {
      res.status(200).json({
        error: null,
        quizStatistics: getQuizStatisticsByUserIdResponse.response[0],
        answerStatistics: getAnswerStatisticsByUserIdResponse.response[0],
      });
    }
  } else {
    res.status(400).json({
      error: AUTHENTICATION_FAILED,
    });
  }
});

appRouter.get("/teacher", async (req, res) => {
  let getQuizInfoResponse = await database.getQuizInfo();
  let getAllSkillsResponse = await database.getAllSkills();
  let getAllQuestionTypesResponse = await database.getAllQuestionTypes();

  if (
    !getQuizInfoResponse.error &&
    !getAllSkillsResponse.error &&
    !getAllQuestionTypesResponse.error
  ) {
    res.status(200).json({
      error: null,
      quizzes: getQuizInfoResponse.response,
      allSkills: getAllSkillsResponse.response,
      allQuestionTypes: getAllQuestionTypesResponse.response,
    });
  }
});

module.exports = appRouter;
