module.exports = {
  // the 'strength' of our bcrypt hashing algorithm
  // 14 is a good strength at the present time based on the strength of
  // commodity computers
  BCRYPT_WORK_FACTOR: 14,

  // the mongodb error code which means you are attempting to create a duplicate
  // object
  DUPLICATE_KEY_ERROR: 11000,

  // sessions will last for 1 full day
  SESSION_DURATION: 1000 * 60 * 60 * 24,

  // sessions will be extended by 10 minutes if the user is active
  SESSION_EXTENSION_DURATION: 1000 * 60 * 10,

  // our unique secret key -- this keeps sessions secure -- it should never be
  // checked into version control, but it should be the same among all servers
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY
};
