const express = require("express");
const app = express();
const { corsOptions } = require("./config/init");
const { server_port } = require("./config/index");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const scheduler = require("./services/scheduler/checkAttempts");

/* 
  Import all routes in the application
*/
const authRoutes = require("./api/routes/auth");
const discussionRoutes = require("./api/routes/discussion");
const homeRoutes = require("./api/routes/home");
const userRoutes = require("./api/routes/users");
const quizRoutes = require("./api/routes/quizzes");
const threadsRoutes = require("./api/routes/threads");
const teacherRoutes = require("./api/routes/teacher");
const statisticsRoutes = require("./api/routes/statistics");
const postsRoutes = require("./api/routes/posts");
const questionsRoutes = require("./api/routes/questions");

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dist")));
}

// Use these routes
app.use("/auth", authRoutes);
app.use("/discussion", discussionRoutes);
app.use("/home", homeRoutes);
app.use("/users", userRoutes);
app.use("/quizzes", quizRoutes);
app.use("/threads", threadsRoutes);
app.use("/teacher", teacherRoutes);
app.use("/statistics", statisticsRoutes);
app.use("/posts", postsRoutes);
app.use("/questions", questionsRoutes);

// set port, listen for requests
app.listen(server_port, () => {
  console.log(`Server is running on port ${server_port}.`);
});
