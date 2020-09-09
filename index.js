const { GraphQLServer } = require("graphql-yoga");

const express = require("express");
const path = require("path");

const { resolvers } = require("./server/resolvers");

const { PrismaClient } = require("@prisma/client");

// 2
const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./server/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});

const options = {
  port: process.env.PORT || 4000,
  endpoint: "/graphql",
  playground: "/graphql",
};

server.express.use(express.static(path.join(__dirname, "client", "build")));

server.start(options, () => console.log("Server startet!"));
