require('dotenv').config();

const Query = require('./resolvers/Query');

const Types = require('./resolvers/Types');
const Mutation = require('./resolvers/Mutation');

const resolvers = {
  Query,
  Mutation,
  ...Types,
};

module.exports = { resolvers };
