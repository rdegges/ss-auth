const bcrypt = require("bcryptjs");
const express = require("express");

const auth = require("../auth");
const models = require("../models");
const settings = require("../settings");

let router = express.Router();

/**
 * Render the registration page.
 */
router.get("/register", (req, res) => {
  res.render("register", { csrfToken: req.csrfToken() });
});

/**
 * Create a new user account.
 *
 * Once a user is logged in, they will be sent to the dashboard page.
 */
router.post("/register", (req, res) => {
  let hash = bcrypt.hashSync(req.body.password, settings.BCRYPT_WORK_FACTOR);
  req.body.password = hash;
  let user = new models.User(req.body);

  user.save((err) => {
    if (err) {
      let error = "Something bad happened! Please try agian.";

      if (err.code === 11000) {
        error = "That email is already taken. Please try another.";
      }

      return res.render("register", {
        error: error,
        csrfToken: req.csrfToken()
      });
    }

    auth.createUserSession(req, res, user);
    res.redirect("/dashboard");
  });
});

/**
 * Render the login page.
 */
router.get("/login", (req, res) => {
  res.render("login", { csrfToken: req.csrfToken() });
});

/**
 * Log a user into their account.
 *
 * Once a user is logged in, they will be sent to the dashboard page.
 */
router.post("/login", (req, res) => {
  models.User.findOne({ email: req.body.email }, "firstName lastName email password", (err, user) => {
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.render("login", {
        error: "Incorrect email / password.",
        csrfToken: req.csrfToken()
      });
    }

    auth.createUserSession(req, res, user);
    res.redirect("/dashboard");
  });
});

/**
 * Log a user out of their account, then redirect them to the home page.
 */
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.reset();
  }

  res.redirect("/");
});

module.exports = router;
