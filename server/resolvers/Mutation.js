const authenticationMutations = require("./authentication.js");

const resourceMutations = require("./resource");

module.exports = {
  ...authenticationMutations,
  ...resourceMutations,
};
