var express = require("express");
const database = new (require("../database"))();
const STRINGS = require("../strings");
var appRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");

var corsOptions = {
  origin: "*",
};

appRouter.use(cors(corsOptions));

appRouter.use(bodyParser.json());

appRouter.use(bodyParser.urlencoded({ extended: true }));

appRouter.get("/home", async (req, res) => {
  let sess = req.session;

  debugger

  let email = req.query.email;
  email = !email ?  "" : email.trim()

  if (email === "") {

  }

  let allQuizzesResponse = await database.getQuizRatings();
  let questionsPerQuizResponse = await database.getNumberOfQuestions();
  let quizzesInfoResponse = await database.getQuizInfo();


  if (
    !allQuizzesResponse.error &&
    !questionsPerQuizResponse.error &&
    !quizzesInfoResponse.error
  ) {
    let response = quizzesInfoResponse.response
    
    for (let i = 0; i < questionsPerQuizResponse.response.length; i++) {
      let item = questionsPerQuizResponse.response[i]
      let quiz = response.find(q => q.quiz_id === item.quiz_id)
      quiz.numberOfQuestions = item.number_of_questions
    }

    for (let i = 0; i < allQuizzesResponse.response.length; i++) {
      let item = allQuizzesResponse.response[i]
      let quiz = response.find(q => q.quiz_id === item.quiz_id)
      quiz.averageRating = item.average_rating
      quiz.ratingCount = item.rating_count
    }

    res.json({
      error: null,
      quizzes: response
    });
  }
});

appRouter.get("/quiz", async (req, res) => {

})

appRouter.get("/discussion", async (req, res) => {

})

module.exports = appRouter;
