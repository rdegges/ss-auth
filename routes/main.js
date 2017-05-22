const express = require('express');

const auth = require('../auth');

let router = express.Router();

/**
 * Render the home page.
 */
router.get("/", (req, res) => {
  res.render("index");
});

/**
 * Render the dashboard page.
 */
router.get("/dashboard", auth.loginRequired, (req, res) => {
  let userString = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email
  };

  res.render("dashboard", { userString: JSON.stringify(userString, null, 2) });
});

module.exports = router;
