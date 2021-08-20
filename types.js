// Rather than creating class files, you can define types here and annotate them
// elsewhere as needed
/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} box_root_folder_id
 */

// You can also "union" types together as a workaround when the linter is missing
// properties you know should be there
/**
 * @typedef {UserModel & import('objection').Model} UserModel
 */
