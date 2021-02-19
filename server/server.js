const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const STRINGS = require("./strings");

const authRouter = require("./routes/authRouter")
const appRouter = require("./routes/appRouter")
const userRouter = require("./routes/userRouter")
const securityRouter = require("./routes/securityRouter")

app.use('/auth', authRouter)
app.use('/', appRouter)
app.use('/user', userRouter)
app.use('/security', securityRouter)

var corsOptions = {
  origin: "*",
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
