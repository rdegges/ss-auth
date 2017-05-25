const nJwt = require("njwt");

const auth = require('./auth');
const models = require('./models');
const settings = require("./settings");

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
  let claims = {
    // you can embed a comma-delimited list of scopes here that will be used for
    // authorization
    scope: "active",
    sub: user._id
  };
  let jwt = nJwt.create(claims, settings.JWT_SIGNING_KEY, settings.JWT_SIGNING_ALGORITHM);

  jwt.setExpiration(new Date().getTime() + settings.SESSION_DURATION);
  req.session.userToken = jwt.compact();
};

/**
 * Load the user object into the request from the session data.
 *
 *  @param {Object} req  - The http request object.
 *  @param {Object} res  - The http response object.
 *  @param {Object} next - Continue processing the request.
 */
module.exports.loadUserFromSession = (req, res, next) => {
  if (!(req.session && req.session.userToken)) {
    return next();
  }

  nJwt.verify(req.session.userToken, settings.JWT_SIGNING_KEY, settings.JWT_SIGNING_ALGORITHM, (err, verifiedJwt) => {
    if (err) {
      return next();
    }

    models.User.findById(verifiedJwt.body.sub, (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next();
      }

      // Remove the password hash from the User object.  This way we don't
      // accidentally leak it.
      user.password = undefined;

      // Here is where we store the user object in the current request for
      // developer usage.  If the user wasn't found, these values will be set to a
      // non-truthy value, so it won't affect anything.
      req.user = user;
      res.locals.user = user;

      next();
    });
  });
}
