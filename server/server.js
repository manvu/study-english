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

// app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dist")));
}

// Use these routes
app.use("/api/auth", authRoutes);
app.use("/api/discussion", discussionRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/threads", threadsRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/questions", questionsRoutes);

// set port, listen for requests
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
