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
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,

  // only set cookies over https. set this to true if you are running in
  // production, false otherwise
  SESSION_SECURE_COOKIES: false,

  // destroy sessions when the browser is closed. set this if you are building a
  // website where security is paramount (aka: banking, healthcare)
  SESSION_EPHEMERAL_COOKIES: false,

  // use stronger-than-normal security for signing our JWTs
  JWT_SIGNING_ALGORITHM: "HS512",

  // the 256-byte JWT signing key that we'll use to sign all user tokens.  this
  // should never be checked into version control, but should be the same among
  // all servers.  you can generate this using the secure-random library:
  //
  // const secureRandom = require("secure-random");
  // console.log(secureRandom(512, { type: "Buffer" }).toString("base64"));
  JWT_SIGNING_KEY: process.env.JWT_SIGNING_KEY
};
