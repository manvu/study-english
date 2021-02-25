var express = require("express");
const database = new (require("../database"))();
const STRINGS = require("../strings");
var questionRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const { getUserIdFromToken } = require("../helper");
const { AUTHENTICATION_FAILED, ERROR_OCCURRED } = require("../strings");

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
  let paragraphTitle = !!req.body.paragraphTitle
    ? null
    : req.body.paragraphTitle;
  let correctAnswers = req.body.correctAnswers;
  let shuffleAnswers = req.body.shuffleAnswers ? req.body.shuffleAnswers : 1;
  const userId = getUserIdFromToken(req.headers.authorization);

  if (userId) {
    // First, check if instruction already exists in the database
    let createInstructionIfNotExistsResponse = await database.createInstructionIfNotExists(
      instruction
    );

    if (!createInstructionIfNotExistsResponse.error) {
      let instructionId =
        createInstructionIfNotExistsResponse.response.insertId;

      if (instructionId === 0) {
        let findInstructionByInstructionResponse = await database.findInstructionByInstruction(
          instruction
        );

        instructionId =
          findInstructionByInstructionResponse.response[0].instruction_id;
      } else {
        res.status(400).json({
          error: ERROR_OCCURRED,
        });
      }

      if (instructionId > 0) {
        // Create Question
        let createQuestionResponse = await database.createQuestion(
          typeId,
          instructionId,
          isActive,
          paragraphTitle,
          question
        );
        if (!createQuestionResponse.error) {
          // Add items for different types of question
          const questionId = createQuestionResponse.response.insertId;
          if (typeId === 1) {
            let insertMultipleChoiceItemsResponse = await database.insertMultipleChoiceItems(
              items,
              questionId
            );

            if (!insertMultipleChoiceItemsResponse.error) {
              res.status(200).json({
                error: null,
                questionId: createQuestionResponse.response.insertId,
              });
            }
          } else if (typeId === 2) {
            let insertGapFillingItemsResponse = await database.insertGapFillingItems(
              items,
              questionId
            );

            if (!insertGapFillingItemsResponse.error) {
              res.status(200).json({
                error: null,
                questionId: createQuestionResponse.response.insertId,
              });
            }
          } else if (typeId === 3) {
            let createMatchingQuestionResponse = await database.createMatchingQuestion(
              correctAnswers,
              questionId,
              shuffleAnswers
            );

            if (!createMatchingQuestionResponse.error) {
              let insertMatchingItemsResponse = await database.insertMatchingItems(
                items.leftItems,
                items.rightItems,
                questionId
              );

              if (!insertMatchingItemsResponse.error) {
                res.status(200).json({
                  error: null,
                  questionId: createQuestionResponse.response.insertId,
                });
              }
            }
          }
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
    }
  } else {
    res.status(400).json({
      error: AUTHENTICATION_FAILED,
    });
  }
});

questionRouter.post("/answer/:id", async (req, res) => {
  let questionId = req.params.id;
  let quizId = req.body.quizId
  let attemptId = req.body.attemptId;
  let answerText = req.body.answerText;
  const userId = getUserIdFromToken(req.headers.authorization);

  

  if (userId) {
    let updateUserAnswerQuestion = await database.updateUserAnswerQuestion(quizId, userId, attemptId, questionId, answerText)

    if (!updateUserAnswerQuestion.error) {
      if (updateUserAnswerQuestion.response.affectedRows === 1) {
        res.status(200).json({
          error: null
        })
      }
    }
  } else {
    res.status(400).json({
      error: AUTHENTICATION_FAILED,
    });
  }
});

module.exports = questionRouter;
