const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const myAuth = require("./auth/MyAuth.js");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

myAuth.setupPassport(app);

app.use(express.static(path.join(__dirname, "front/build")));

app.use("/", myAuth.authRouter());
app.use("/", indexRouter);

module.exports = app;
