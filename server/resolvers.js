const { prismaVersion } = require("@prisma/client");

require("dotenv").config();
/*
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUserId = (context) => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }
  throw new Error("Not authenticated!");
};*/

const Query = require("./resolvers/Query");

const Types = require("./resolvers/Types");
const Mutation = require("./resolvers/Mutation");

const resolvers = {
  Query,
  Mutation,
  ...Types,
};

module.exports = { resolvers };
