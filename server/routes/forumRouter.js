var express = require("express");
const database = new (require("../database"))();
const STRINGS = require("../strings");
var forumRouter = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");

var corsOptions = {
  origin: "*",
};

forumRouter.use(cors(corsOptions));

forumRouter.use(bodyParser.json());

forumRouter.use(bodyParser.urlencoded({ extended: true }));

forumRouter.get("/thread/:id", async (req, res) => {
    debugger;
    let threadId = req.params.threadId;
  
    console.log(threadId);
  
    res.json({
      error: null,
    });
});

module.exports = forumRouter;