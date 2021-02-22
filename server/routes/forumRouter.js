var express = require("express");
const database = new (require("../database"))();
const STRINGS = require("../strings");
var forumRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const {getUserIdFromToken} = require("../helper");

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
    }
    
  });
});

module.exports = forumRouter;
