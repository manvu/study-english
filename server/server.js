const express = require("express");
const app = express();
const database = new (require("./database"))();
const { checkPassword, hashPasswordAsync } = require("./helper");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const STRINGS = require("./strings");

const authRouter = require("./routes/authRouter");
const appRouter = require("./routes/appRouter");
const userRouter = require("./routes/userRouter");
const securityRouter = require("./routes/securityRouter");
const quizRouter = require("./routes/quizRouter");
const forumRouter = require("./routes/forumRouter");
const questionRouter = require("./routes/questionRouter");

app.use("/auth", authRouter);
app.use("/", appRouter);
app.use("/user", userRouter);
app.use("/security", securityRouter);
app.use("/quiz", quizRouter);
app.use("/discussion", forumRouter);
app.use("/question", questionRouter);

var corsOptions = {
  credentials: true,
  origin: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set port, listen for requests
const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
