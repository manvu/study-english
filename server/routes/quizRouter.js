var express = require("express");
const database = new (require("../database"))();
const STRINGS = require("../strings");
var quizRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const {getUserIdFromToken} = require("../helper");

var corsOptions = {
  origin: "*",
};

quizRouter.use(cors(corsOptions));

quizRouter.use(bodyParser.json());

quizRouter.use(bodyParser.urlencoded({ extended: true }));

quizRouter.get("/:id", async (req, res) => {
    let quizId = req.params.id;
  
    console.log(quizId);
  
    res.json({
      error: null,
    });
});

quizRouter.post("/create", async (req, res) => {
  let threadId = req.body.threadId;
  let content = req.body.content;
  const userId = getUserIdFromToken(req.headers.authorization);

  if (userId) {
    let createNewPostResponse = await database.createNewPost(
      threadId,
      content,
      userId
    );

    if (
      !createNewPostResponse.error &&
      createNewPostResponse.response.affectedRows === 1
    ) {
      const newPostId = createNewPostResponse.response.insertId;

      let newPostResponse = await database.getDiscussionPostsByPostIdAsync(
        newPostId
      );

      if (!newPostResponse.error) {
        res.status(200).json({
          error: null,
          post: newPostResponse.response[0],
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

module.exports = quizRouter;