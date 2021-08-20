// Rather than creating class files, you can define types here and annotate them
// elsewhere as needed
/**
 * @typedef {Object} User
 * @property {string} given_name
 * @property {string} family_name
 * @property [string] favorite_movie
 * @property {string} favorite_book
 */

// When correctly-defined JavaScript inheritance doesn't match up with
// TypeScript's super strict view of a class or whatever, you can hacky-do
// it by creating a type alias, or union of types or interfaces, etc.

// Example: a database model looks like user, but also has functions from
// a base Model class, and we have to merge them together because it would
// be too tedious and/or laborious to do it the "correct" way just to appease
// tsserver.

/**
 * @typedef {User & import('objection').Model} UserModel
 */
