// Workaround: `tsc` won't export typedefs unless `module.exports` is present
module.exports._typesOnly = true;

// Package-Scoped Types

// Rather than creating class files, you can define types here and annotate them
// elsewhere as needed (including "Declaration Merges" in @types/foo/index.d.ts).
//
// Note:
// - {...} surround types
// - [...] surround optional properties
// - {Record<string, any>} for a untyped object/map/dict
// - {Array<Thing>} for a typed array
// - {x | y | z} (pipe) for allowing multiple types
// - {Foo & Bar} (ampersand) for combining multiple types
// - Use `/** @type Thing */` above a declaration to "cast" it
//
/**
 * @typedef {Object} User
 * @property {string} given_name
 * @property {string} family_name
 * @property {string} [favorite_movie]
 * @property {string} favorite_book
 * @property {Array<User>} [friends]
 * @property {Record<string,any> | null} [stuff]
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
