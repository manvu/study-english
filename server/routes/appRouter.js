var express = require("express");
const database = new (require("../database"))();
const STRINGS = require("../strings");
var appRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const helper = require("../helper");

var corsOptions = {
  origin: "*",
};

appRouter.use(cors(corsOptions));

appRouter.use(bodyParser.json());

appRouter.use(bodyParser.urlencoded({ extended: true }));

appRouter.get("/home", async (req, res) => {
  let sess = req.session;

  let email = req.query.email;
  email = !email ? "" : email.trim();

  if (email === "") {
  }

  let allQuizzesResponse = await database.getQuizRatings();
  // let questionsPerQuizResponse = await database.getNumberOfQuestions();
  let quizzesInfoResponse = await database.getQuizInfo();

  if (
    !allQuizzesResponse.error &&
    !quizzesInfoResponse.error
  ) {
    let response = quizzesInfoResponse.response;

    for (let i = 0; i < allQuizzesResponse.response.length; i++) {
      let item = allQuizzesResponse.response[i];
      let quiz = response.find((q) => q.quiz_id === item.quiz_id);
      quiz.averageRating = item.average_rating;
      quiz.ratingCount = item.rating_count;
    }

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
      threads: discussionThreadsResponse.response
    })
  }
});

appRouter.post("/statistics", async (req, res) => {
  const userId = req.query.userId

  let getQuizStatisticsByUserIdResponse = await database.getQuizStatisticsByUserId(userId);
  let getAnswerStatisticsByUserIdResponse = await database.getAnswerStatisticsByUserId(userId)

  if (!getQuizStatisticsByUserIdResponse.error) {
    res.json({
      error: null,
      quizStatistics: getQuizStatisticsByUserIdResponse.response,
      answerStatistics: getAnswerStatisticsByUserIdResponse.response
    })
  }
});

appRouter.get("/teacher", async (req, res) => {
  let getQuizInfoResponse = await database.getQuizInfo();

  if (!getQuizInfoResponse.error) {
    res.json({
      error: null,
      quizzes: getQuizInfoResponse.response,
    })
  }
});

module.exports = appRouter;
