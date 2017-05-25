# ss-auth

*Stupid-Simple Authentication*

This project contains code which shows how to implement your own user
authentication in a Node.js web app with MongoDB.

This project is meant to go along with the talk I gave at Twilio Signal 2017.
The talk walks you through how authentication works, from the ground up.

I'll update this README with a link to the finished talk recording and slides
once they are live.


## Installation

Installing this project is simple, run the following commands:

```console
$ git clone https://github.com/rdegges/ss-auth.git
$ cd ss-auth
$ npm install
```

Next, you need to set two environment variables:

- `SESSION_SECRET_KEY`
- `JWT_SIGNING_KEY`

The `SESSION_SECRET_KEY` value must be a long, randomly generated string.  This
value should be unique on your production servers, and never checked into
version control.

The `JWT_SIGNING_KEY` must be a randomly generated, 256-byte, base64 encoded
string.  You can generate this value using the [secure-random][] node library
like so:

```javascript
const secureRandom = require("secure-random");

console.log(secureRandom(256, { type: "Buffer" }).toString("base64"));
```

Like the `SESSION_SECRET_KEY`, `JWT_SIGNING_KEY` must also never be checked into
version control, and must be the same on all production servers.

Finally, you can run:

```console
$ npm start
```

To launch the web server.

**NOTE**: You must have MongoDB installed and working locally in order to run
this project.  It will work with all the default MongoDB options.

**TIP**: Read through the settings specified in `settings.js`.  There are
several options you will want to enable when running a production website.


## Purpose

This project shows how to implement basic user authentication in a Node web app.
The accompanying talk explains how HTTP authentication works in a ground up way,
explaining how each little piece works behind the scenes.

If you've ever wanted to know how authentication works, see the accompanying
talk.


## Questions

Got questions?  Hit me up!  I'm [r@rdegges.com](mailto:r@rdegges.com).


  [secure-random]: https://www.npmjs.com/package/secure-random "Secure Random on NPM"
