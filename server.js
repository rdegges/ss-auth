const path = require("path");

const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const sessions = require("client-sessions");

const auth = require("./auth");
const authRoutes = require("./routes/auth");
const models = require("./models");

let app = express();

// init
mongoose.connect("mongodb://localhost/ss-auth");

// settings
app.set("view engine", "pug");
app.set("staticDir", path.join(__dirname, "static"));

// middleware
app.use("/static", express.static(app.get("staticDir")));
app.use(bodyParser.urlencoded({ extended: false }));

// home page
app.get("/", (req, res) => {
  res.render("index");
});

// registration page
app.get("/register", (req, res) => {
  res.render("register");
});

// login page
app.get("/login", (req, res) => {
  res.render("login");
});

// dashboard page
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// error handling
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send("Something broke :( Please try again.");
});

app.listen(3000);
