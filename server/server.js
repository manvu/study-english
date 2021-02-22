const express = require("express");
const app = express();
const database = new (require("./database"))();
const { checkPassword, hashPasswordAsync } = require("./helper");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const STRINGS = require("./strings");
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");
const client = redis.createClient();

const RedisStore = connectRedis(session)

//Configure redis client
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
//Configure session middleware
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'secret$%^134',
  resave: true,
  saveUninitialized: true,
  cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie 
      maxAge: 1000 * 60 * 10 // session max age in miliseconds
  }
}))

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

// CORS middleware
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}

app.use(allowCrossDomain)

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/logout", (req, res) => {
  debugger;
  req.session.destroy();
  res.send("OK");
});

// set port, listen for requests
const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
