var express = require("express");
const database = new (require("../database"))();
const STRINGS = require("../strings");
var quizRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");

var corsOptions = {
  origin: "*",
};

quizRouter.use(cors(corsOptions));

quizRouter.use(bodyParser.json());

quizRouter.use(bodyParser.urlencoded({ extended: true }));

quizRouter.get("/:id", async (req, res) => {
    let quizId = req.params.quizId;
  
  

    console.log(quizId);
  
    res.json({
      error: null,
    });
});

module.exports = quizRouter;