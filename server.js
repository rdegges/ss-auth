const path = require("path");

const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const sessions = require("client-sessions");

const auth = require("./auth");
const authRoutes = require("./routes/auth");
const mainRoutes = require("./routes/main");
const models = require("./models");

let app = express();

// init
mongoose.connect("mongodb://localhost/ss-auth");

// settings
app.set("view engine", "pug");
app.set("staticDir", path.join(__dirname, "static"));

// middleware
app.use("/static", express.static(app.get("staticDir")));
app.use(sessions({
  cookieName: "session",
  secret: 'asdggdsagdsagdsgdsagdsa',

  // Make each login last for one day by default.
  duration: 1000 * 60 * 60 * 24,

  // Extend the session by ten minutes if the user is still active (instead of
  // forcing expiration).
  activeDuration: 1000 * 60 * 10,
  cookie: {
    ephemeral: false,
    httpOnly: true,
    secure: false
  }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth.loadUserFromSession);

// routes
app.use(authRoutes);

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
