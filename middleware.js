const auth = require('./auth');
const models = require('./models');

/**
 * A simple authentication middleware for Express.
 *
 * This middleware checks to see if a user is available in the request. If not,
 * it will redirect the visitor to the login page.
 */
module.exports.loginRequired = (req, res, next) => {
  if (req.user) {
    return next();
  }

  res.redirect("/login");
};
