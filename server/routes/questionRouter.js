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
    let response = getQuestionByIdResponse.response[0]
    
    if (response.type_id === 1) {
      let contentResponse = await database.getContentForMultipleChoiceQuestionById(questionId)

      if (!contentResponse.error) {
        response.content = contentResponse.response
      }
    } else if (response.type_id === 2) {
      let contentResponse = await database.getContentForGapFillingQuestionById(questionId)


      if (!contentResponse.error) {
        response.content = contentResponse.response
      }
    } else {
      let contentResponse = await database.getContentForMatchingQuestionById(questionId)


      if (!contentResponse.error) {
        let leftItems = contentResponse.response.filter(item => item.column_assigned === 1)
        let rightItems = contentResponse.response.filter(item => item.column_assigned === 2)

        let splits = response.matching_question_correct_answers.split(' ').map(s => s.split('.'))
        
        splits.forEach(answer => {
          let item = leftItems.find(i => i.letter === answer[0])
          item.correct_answer = answer[1]
        })

        response.content = {
          leftItems,
          rightItems
        }
      }
    }

    res.json({
      error: null,
      question: response
    });
  }
});

module.exports = questionRouter;
