const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
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


app.listen(3000);
