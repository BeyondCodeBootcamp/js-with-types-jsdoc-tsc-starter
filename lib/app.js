"use strict";

/** @type {import('express').Handler} */
function hello(req, res) {
  res.json({ message: "Hello, World!" });
}

module.exports.hello = hello;
