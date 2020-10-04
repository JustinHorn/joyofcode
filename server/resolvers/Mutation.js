const authenticationMutations = require("./authentication/authentication.js");

const projectMutations = require("./project");

module.exports = {
  ...authenticationMutations,
  ...projectMutations,
};
