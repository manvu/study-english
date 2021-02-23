var express = require("express");
const database = new (require("../database"))();
const STRINGS = require("../strings");
var questionRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const { getUserIdFromToken } = require("../helper");

var corsOptions = {
  origin: "*",
};

questionRouter.use(cors(corsOptions));

questionRouter.use(bodyParser.json());

questionRouter.use(bodyParser.urlencoded({ extended: true }));

questionRouter.get("/:id", async (req, res) => {
  let questionId = req.params.id;

  let getQuestionByIdResponse = await database.getQuestionById(questionId);

  if (!getQuestionByIdResponse.error) {
    let response = getQuestionByIdResponse.response[0];

    if (response.type_id === 1) {
      let contentResponse = await database.getContentForMultipleChoiceQuestionById(
        questionId
      );

      if (!contentResponse.error) {
        response.content = contentResponse.response;
      }
    } else if (response.type_id === 2) {
      let contentResponse = await database.getContentForGapFillingQuestionById(
        questionId
      );

      if (!contentResponse.error) {
        response.content = contentResponse.response;
      }
    } else {
      let contentResponse = await database.getContentForMatchingQuestionById(
        questionId
      );

      if (!contentResponse.error) {
        let leftItems = contentResponse.response.filter(
          (item) => item.column_assigned === 1
        );
        let rightItems = contentResponse.response.filter(
          (item) => item.column_assigned === 2
        );

        let splits = response.matching_question_correct_answers
          .split(" ")
          .map((s) => s.split("."));

        splits.forEach((answer) => {
          let item = leftItems.find((i) => i.letter === answer[0]);
          item.correct_answer = answer[1];
        });

        response.content = {
          leftItems,
          rightItems,
        };
      }
    }

    res.json({
      error: null,
      question: response,
    });
  }
});

questionRouter.post("/create", async (req, res) => {
  let typeId = req.body.typeId;
  let items = req.body.items;
  let question = req.body.question;
  let instruction = req.body.instruction;
  let isActive = req.body.isActive;
  const userId = getUserIdFromToken(req.headers.authorization);

  if (userId) {
    // First, check if instruction already exists in the database
    let createInstructionIfNotExistsResponse = await database.createInstructionIfNotExists(instruction)

    if (!createInstructionIfNotExistsResponse.error) {
      if (createInstructionIfNotExistsResponse.response.length === 0) {

      }
    }

    let createQuizResponse = await database.createQuestion(
      courseName,
      description,
      isActive,
      timeAllowed,
      selectedSkillId,
      userId
    );

    debugger;

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

module.exports = questionRouter;
