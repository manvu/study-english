var express = require("express");
const database = new (require("../database"))();
const STRINGS = require("../strings");
var appRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const { getUserIdFromToken } = require("../helper");
const { AUTHENTICATION_FAILED } = require("../strings");
const dotenv = require("dotenv").config();
const helper = require("../helper")

var corsOptions = {
  credentials: true,
  origin: true,
};

appRouter.use(cors(corsOptions));

appRouter.use(bodyParser.json());

appRouter.use(bodyParser.urlencoded({ extended: true }));

appRouter.get("/home", async (req, res) => {
  const userId = getUserIdFromToken(req.headers.authorization);

  if (userId) {
  }

  let quizzesInfoResponse = await database.getQuizInfo();

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

  let questionsByQuizIdResponse = await database.getQuestionsByQuizId(quizId);
  let questionsContentByQuizIdResponse = await database.getQuestionsContentByQuizId(
    quizId
  );

  if (
    !questionsByQuizIdResponse.error &&
    !questionsContentByQuizIdResponse.error
  ) {
    let response = questionsByQuizIdResponse.response;

    let questionsContentByQuizIdObject = {};

    for (let i = 0; i < questionsContentByQuizIdResponse.response.length; i++) {
      let currentItem = questionsContentByQuizIdResponse.response[i];
      if (questionsContentByQuizIdObject[currentItem.question_id]) {
        questionsContentByQuizIdObject[currentItem.question_id].push(
          currentItem
        );
      } else {
        questionsContentByQuizIdObject[currentItem.question_id] = [currentItem];
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
  let getAllSkillsResponse = await database.getAllSkills()
  let getAllQuestionTypesResponse = await database.getAllQuestionTypes()

  if (!getQuizInfoResponse.error && !getAllSkillsResponse.error && !getAllQuestionTypesResponse.error) {
    res.status(200).json({
      error: null,
      quizzes: getQuizInfoResponse.response,
      allSkills: getAllSkillsResponse.response,
      allQuestionTypes: getAllQuestionTypesResponse.response
    });
  }
});

module.exports = appRouter;
