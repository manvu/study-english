var express = require("express");
const database = new (require("../database"))();
const STRINGS = require("../strings");
var quizRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const { getUserIdFromToken } = require("../helper");
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
  
})

module.exports = quizRouter;
