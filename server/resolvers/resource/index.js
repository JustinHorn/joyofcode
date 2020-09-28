const likeMutations = require("./like");

const commentMutations = require("./comment");

const resourceMutations = require("./resource");

module.exports = {
  ...likeMutations,
  ...commentMutations,
  ...resourceMutations,
};
