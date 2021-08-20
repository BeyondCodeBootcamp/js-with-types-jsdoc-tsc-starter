"use strict";

require("dotenv").config();

let http = require("http");
let express = require("express");
let app = require("./lib/my-router.js").Router();
let routes = require("./lib/app.js");

if ("DEVELOPMENT" === process.env.ENV) {
  // set special options
}

/** @type User */
var user = {
  // try turning one of these into a typo
  given_name: "x",
  family_name: "x",
  favorite_book: "x",
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
function requireUser(req, res, next) {
  // ... verify req.headers["authorization"]

  let user = {
    given_name: "AJ",
    family_name: "O'Neal",
    favorite_movie: "Jurassic Park",
  };

  // To fix this error, make favorite_book optional, like favorite_movie
  // see ./types.js
  req.user = user;
  req.admin = true;
}

app.use("/", requireUser);
app.get("/hello", routes.hello);
app.get("/users", allUsers);
// You should get a tsserver linter error here:
// goodbye is not defined in our routes file
// (go define it to fix this)
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
