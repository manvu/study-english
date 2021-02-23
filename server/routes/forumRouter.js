var express = require("express");
const database = new (require("../database"))();
const STRINGS = require("../strings");
var forumRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const { getUserIdFromToken } = require("../helper");
const { AUTHENTICATION_FAILED, ERROR_OCCURRED } = require("../strings");

var corsOptions = {
  origin: "*",
};

forumRouter.use(cors(corsOptions));

forumRouter.use(bodyParser.json());

forumRouter.use(bodyParser.urlencoded({ extended: true }));

forumRouter.get("/thread/:id", async (req, res) => {
  let threadId = req.params.id;

  let getDiscussionThreadsByIdAsyncResponse = await database.getDiscussionThreadsByIdAsync(
    threadId
  );
  let getDiscussionPostsByThreadIdAsyncResponse = await database.getDiscussionPostsByThreadIdAsync(
    threadId
  );

  console.log(threadId);

  res.json({
    error: null,
    thread: {
      ...getDiscussionThreadsByIdAsyncResponse.response[0],
      posts: getDiscussionPostsByThreadIdAsyncResponse.response,
    },
  });
});

forumRouter.post("/threads/create", async (req, res) => {
  let threadTitle = req.body.threadTitle;
  let selectedRelatedQuizId = req.body.selectedRelatedQuizId;
  let description = req.body.description;
  const userId = getUserIdFromToken(req.headers.authorization);

  if (userId) {
    let createNewThreadResponse = await database.createNewThread(
      threadTitle,
      description,
      userId,
      selectedRelatedQuizId
    );

    if (
      !createNewThreadResponse.error &&
      createNewThreadResponse.response.affectedRows === 1
    ) {
      const newThreadId = createNewThreadResponse.response.insertId;

      res.status(200).json({
        error: null,
        newThreadId,
      });
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

forumRouter.post("/posts/create", async (req, res) => {
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

module.exports = forumRouter;
