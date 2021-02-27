var express = require("express");
const database = new (require("../database"))();
const STRINGS = require("../strings");
var quizRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const { getUserIdFromToken, mark, userAnswersToObject, correctAnswerstoObject } = require("../helper");
const { AUTHENTICATION_FAILED, ERROR_OCCURRED } = require("../strings");

var corsOptions = {
  origin: "*",
};

quizRouter.use(cors(corsOptions));

quizRouter.use(bodyParser.json());

quizRouter.use(bodyParser.urlencoded({ extended: true }));

// quizRouter.get("/:id", async (req, res) => {
//   let quizId = req.params.id;

//   console.log(quizId);

//   res.json({
//     error: null,
//   });
// });

quizRouter.post("/create", async (req, res) => {
  let courseName = req.body.courseName;
  let description = req.body.description;
  let isActive = req.body.isActive;
  let timeAllowed = req.body.timeAllowed;
  let selectedSkillId = req.body.selectedSkillId;
  const userId = getUserIdFromToken(req.headers.authorization);

  if (userId) {
    let createQuizResponse = await database.createQuiz(
      courseName,
      description,
      isActive,
      timeAllowed,
      selectedSkillId,
      userId
    );

    ;

    if (
      !createQuizResponse.error &&
      createQuizResponse.response.affectedRows === 1
    ) {
      const newQuizId = createQuizResponse.response.insertId;

      let newQuizResponse = await database.getQuizInfoByQuizId(newQuizId);

      if (!newQuizResponse.error) {
        res.status(200).json({
          error: null,
          quiz: newQuizResponse.response[0],
        });
      } else {
        res.status(400).json({
          error: ERROR_OCCURRED,
        });
      }
    } else {
      res.status(400).json({
        error: ERROR_OCCURRED,
      });
    }
  } else {
    res.status(400).json({
      error: AUTHENTICATION_FAILED,
    });
  }
});

quizRouter.post("/edit/:id", async (req, res) => {
  let quizId = req.params.id;
  let courseName = req.body.courseName;
  let description = req.body.description;
  let isActive = req.body.isActive;
  let timeAllowed = req.body.timeAllowed;
  let selectedSkillId = req.body.selectedSkillId;
  const userId = getUserIdFromToken(req.headers.authorization);

  ;

  if (userId) {
    let createQuizResponse = await database.updateQuiz(
      quizId,
      courseName,
      description,
      isActive,
      timeAllowed,
      selectedSkillId,
      userId
    );

    ;

    if (
      !createQuizResponse.error &&
      createQuizResponse.response.affectedRows === 1
    ) {
      let updatedQuizResponse = await database.getQuizInfoByQuizId(quizId);

      if (!updatedQuizResponse.error) {
        res.status(200).json({
          error: null,
          quiz: updatedQuizResponse.response[0],
        });
      } else {
        res.status(400).json({
          error: ERROR_OCCURRED,
        });
      }
    } else {
      res.status(400).json({
        error: ERROR_OCCURRED,
      });
    }
  } else {
    res.status(400).json({
      error: AUTHENTICATION_FAILED,
    });
  }
});

quizRouter.post("/favorite/:id", async (req, res) => {
  let quizId = req.params.id;
  const userId = getUserIdFromToken(req.headers.authorization);

  if (userId) {
    let checkFavoriteByQuizIdAndUserIdResponse = await database.checkFavoriteByQuizIdAndUserId(
      quizId,
      userId
    );

    ;

    if (!checkFavoriteByQuizIdAndUserIdResponse.error) {
      if (checkFavoriteByQuizIdAndUserIdResponse.response[0].favorite == 1) {
        let toggleOffFavoriteResponse = await database.toggleOffFavorite(
          quizId,
          userId
        );

        res.status(200).json({
          error: null,
        });
      } else if (
        checkFavoriteByQuizIdAndUserIdResponse.response[0].favorite == 0
      ) {
        let toggleOnFavoriteResponse = await database.toggleOnFavorite(
          quizId,
          userId
        );

        res.status(200).json({
          error: null,
        });
      }

    } else {
      res.status(400).json({
        error: ERROR_OCCURRED,
      });
    }
  } else {
    res.status(400).json({
      error: AUTHENTICATION_FAILED,
    });
  }
});

quizRouter.post("/rating/:id", async (req, res) => {
  let quizId = req.params.id;
  let ratingGiven = req.body.ratingGiven;
  
  const userId = getUserIdFromToken(req.headers.authorization);

  if (userId) {
    let getQuizRatingByQuizIdAndUserIdResponse = await database.getQuizRatingByQuizIdAndUserId(
      quizId,
      userId
    );

    if (!getQuizRatingByQuizIdAndUserIdResponse.error) {
      if (getQuizRatingByQuizIdAndUserIdResponse.response.length === 0) {
        let insertQuizRatingByQuizIdAndUserIdResponse = await database.insertQuizRatingByQuizIdAndUserId(
          quizId,
          userId,
          ratingGiven
        );

        res.status(200).json({
          error: null,
        });
      } else {
        let updateQuizRatingByQuizIdAndUserIdResponse = await database.updateQuizRatingByQuizIdAndUserId(
          quizId,
          userId,
          ratingGiven
        );

        res.status(200).json({
          error: null,
        });
      }
    } else {
      res.status(400).json({
        error: ERROR_OCCURRED,
      });
    }
  } else {
    res.status(400).json({
      error: AUTHENTICATION_FAILED,
    });
  }
});

quizRouter.post("/submit", async (req, res) => {
  
  let quizId = req.body.quizId;
  let attemptId = req.body.attemptId;
  const userId = getUserIdFromToken(req.headers.authorization);

  if (userId) {
    // compare result
    
    let getCorrectAnswers = await database.getCorrectAnswers(quizId);
    let userAnswerQuestions = await database.getUserAnswerQuestionByUserIdAndQuizIdAndAttemptId(quizId, userId, attemptId)

    let correctAnswers = correctAnswerstoObject(getCorrectAnswers.response)
    let userAnswers = userAnswersToObject(userAnswerQuestions.response)
    let typeArray = userAnswerQuestions.response.map(result => result.type_id)

    console.log(userAnswers)
    console.log(correctAnswers)

    // mark user response

    // 1 - correct, 2 - partially correct, 3 - incorrect, 4 - unanswered
    var userAnswersArray = Object.keys(userAnswers).map((key) => [Number(key), userAnswers[key]]);
    var correctAnswersArray = Object.keys(correctAnswers).map((key) => [Number(key), correctAnswers[key]]);

    

    let marked = mark(userAnswersArray, correctAnswersArray, typeArray)
    
    let markResponse = await database.markUserAnswerQuestion(marked, userId, quizId, attemptId)
    
    let markedArray = []

    

    let accuracy = {
      totalSubquestions: 0,
      correctSubquestions: 0,
      incorrectSubquestions: 0,
      percentage: 0
    }

    for (let i = 0; i < marked.length; i++) {
      let detailedAnswers = []
      for (let j = 0; j < marked[i][1].length; j++) {
        accuracy.totalSubquestions += 1
        if (marked[i][3][j].length !== 0) {
          accuracy.correctSubquestions += 1
        } else {
          accuracy.incorrectSubquestions += 1
        }

        detailedAnswers.push({
          subquestion_id: j + 1,
          answer: marked[i][1][j],
          correct: marked[i][3][j],
          incorrect: marked[i][4][j]
        })
      }

      

      console.log(accuracy)
       
      markedArray.push({
        question_id: marked[i][0],
        answers: detailedAnswers,
        marked: marked[i][2],
        type_id: typeArray[i],
      })
    }

    accuracy.percentage = ((accuracy.correctSubquestions * 100) / accuracy.totalSubquestions).toFixed(2)

    if (!markResponse.error) {
      res.status(200).json({
        error: null,
        marked: markedArray,
        attempt_id: attemptId,
        quiz_id: quizId,
        accuracy: accuracy
      });
    } else {

    }
  } else {
    res.status(400).json({
      error: AUTHENTICATION_FAILED,
    });
  }
})



module.exports = quizRouter;
