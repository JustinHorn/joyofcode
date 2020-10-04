const likeMutations = require("./like");

const commentMutations = require("./comment");

const projectMutations = require("./project");

module.exports = {
  ...likeMutations,
  ...commentMutations,
  ...projectMutations,
};
