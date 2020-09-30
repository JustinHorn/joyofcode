const authenticationMutations = require("./authentication/authentication.js");

const resourceMutations = require("./resource");

module.exports = {
  ...authenticationMutations,
  ...resourceMutations,
};
