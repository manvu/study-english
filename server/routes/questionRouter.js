var express = require("express");
const database = new (require("../database"))();
const STRINGS = require("../strings");
var questionRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");

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
    res.json({
      error: null,
      question: getQuestionByIdResponse.response[0]
    });
  }
});

module.exports = questionRouter;
