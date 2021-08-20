"use strict";

var Router = require("@root/async-router").Router;

// Oops!
// Normally creating a wrapper - even a simple one like this -
// will make TypeScript forget its types.
// We've fixed for any file that requires this in ./lib/my-router.d.ts
// However, to not get errors in this file (since it's JavaScript),
// we must ALSO include the JSDOC annotation

/**
 * @param {import('express').RouterOptions} options
 * @returns {import('express').Router}
 */
module.exports.Router = function (options) {
  return Router(options);
};
