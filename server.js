"use strict";

require("dotenv").config();

let http = require("http");
let express = require("express");
let app = require("./lib/my-router.js").Router();
let routes = require("./lib/routes.js");

// tsserver will tell you if an imported file doesn't exist
let doesntexist = require("./lib/doesntexist.js");
console.log(doesntexist);

if ("DEVELOPMENT" === process.env.ENV) {
  // set special options
}

// if I type cannot be inferred by its use,
// it must be explicitly declared, like this:
/** @type User */
var user = {
  // To see the linter in action,
  // try renaming `given_name` to `first_name`.
  given_name: "Jane",
  family_name: "Doe",
  favorite_book: "Harry Potter",
};
console.log(user);

/** @type {import('express').Handler} */
function allUsers(req, res) {
  // this isn't explicitly typed here, but it will still be type checked
  let user1 = {
    given_name: "Orange",
    family_name: "Fruit",
    favorite_book: "Oh, The Places You'll Go!",
  };

  // tsserver knows that 'first_name' can't possibly exist
  // Note: we never told tsserver that user1 was a user,
  // it implied it from how we use it down below
  console.log(user1.first_name);

  // tsserver knows that a match can be null
  console.log(user1.given_name.match(/foo/)[1]);

  // See the error message below to fix this
  let user2 = {
    given_name: "Banana",
    favorite_movie: "Jurassic Park",
  };

  /**@type {Array<User>}*/
  let result = [user1, user2];
  res.json(result);
}

// pretend this is our login function
// Note: we have to type this explicitly because app.use can accept multiple
// function signatures and so the type cannot be inferred
/** @type {import('express').Handler} */
function requireUser(req, res, next) {
  // ... verify req.headers["authorization"]

  let user = {
    given_name: "AJ",
    family_name: "O'Neal",
    favorite_movie: "Jurassic Park",
  };

  // To fix this error, make `favorite_book` optional,
  // just like `favorite_movie` is optional.
  // See ./types.js
  req.user = user;

  // To fix this error, go add req.admin as a boolean.
  // See ./typings/express/index.d.ts
  req.admin = true;

  next();
}

app.use("/", requireUser);
app.get("/hello", routes.hello);
app.get("/users", allUsers);

// tsserver knows this function's type implicitly (unlike those above).
// Because it's used directly, inline, it doesn't need type annotation.
app.get("/implicitly-typed", function (req, res, next) {
  // To fix this error, just check that the property exists
  //if (req.user) {
  console.log(req.user.given_name);
  //}
  // note:

  next();
});

// To fix this error, go create a route for `goodbye`.
// See ./lib/routes.js
app.get("/goodbye", routes.goodbye);

// Express error handlers sometimes need a type annotation - but that's okay. They're rare.
app.use(
  "/",
  /** @type import('express').ErrorRequestHandler */
  function (err, req, res, next) {
    if (err.code) {
      res.statusCode = err.status || 500;
      res.json({ status: err.status, code: err.code, message: err.message });
      return;
    }

    console.error("Unexpected Error:");
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
);

let server = express().use("/", app);
if (require.main === module) {
  let port = process.env.PORT || 3042;
  let httpServer = http.createServer(server);
  httpServer.listen(port, function () {
    /* jshint validthis:true */
    console.info("Listening on", httpServer.address());
  });
}

module.exports = app;
