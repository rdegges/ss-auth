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

/**
 * Given a user object:
 *
 *  - Store the user object as a req.user
 *  - Make the user object available to templates as #{user}
 *  - Set a session cookie with the user ID
 *
 *  @param {Object} req - The http request object.
 *  @param {Object} res - The http response object.
 *  @param {Object} user - A user object.
 */
module.exports.createUserSession = (req, res, user) => {
  console.log("Creating User Session:", user._id);
  req.session.user = user._id;
};

/**
 * Load the user object into the request from the session data.
 *
 *  @param {Object} req  - The http request object.
 *  @param {Object} res  - The http response object.
 *  @param {Object} next - Continue processing the request.
 */
module.exports.loadUserFromSession = (req, res, next) => {
  if (!(req.session && req.session.user)) {
    return next();
  }

  models.User.findById(req.session.user, (err, user) => {
    if (err) {
      return next(err);
    }

    // Here is where we store the user object in the current request for
    // developer usage.  If the user wasn't found, these values will be set to a
    // non-truthy value, so it won't affect anything.
    req.user = user;
    res.locals.user = user;

    next();
  });
}
