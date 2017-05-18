const auth = require('./auth');
const models = require('./models');

/**
 * A simple authentication middleware for Express.
 *
 * This middleware will load users from session data, and handle all user
 * proxying for convenience.
 */
module.exports.loginRequired = (req, res, next) => {
  if (req.session && req.session.user) {
    models.User.findOne({ email: req.session.user }, 'firstName lastName email', (err, user) => {
      if (err) {
        return next(err);
      }

      if (user) {
        auth.createUserSession(req, res, user);
      }

      return next();
    });
  }

  next();
};
