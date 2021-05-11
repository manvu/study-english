const express = require("express");
const app = express();
const database = new (require("./database"))();
const { corsOptions } = require("./config/init");
const { server_port } = require("./config/index");
const bodyParser = require("body-parser");
const cors = require("cors");

/* 
  Import all routes in the application
*/
const authRoutes = require("./api/routes/auth");
const appRoutes = require("./api/routes/app");
const securityRoutes = require("./api/routes/security");
const userRoutes = require("./api/routes/users");
const quizRoutes = require("./api/routes/quizzes");
const threadsRoutes = require("./api/routes/threads");
const postsRoutes = require("./api/routes/posts");
const questionsRoutes = require("./api/routes/questions");

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use these routes
app.use("/auth", authRoutes);
app.use("/", appRoutes);
app.use("/security", securityRoutes);
app.use("/users", userRoutes);
app.use("/quizzes", quizRoutes);
app.use("/threads", threadsRoutes);
app.use("/posts", postsRoutes);
app.use("/questions", questionsRoutes);

// set port, listen for requests
app.listen(server_port, () => {
  console.log(`Server is running on port ${server_port}.`);
});
