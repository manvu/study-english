var express = require("express");
const database = new (require("../database"))();
var appRouter = express.Router();
const PERMISSIONS = require("../permissions");
const STRINGS = require("../strings");

appRouter.get("/", (req, res) => {
  res.json({ message: "Welcome to the server application." });
});

module.exports = appRouter;
