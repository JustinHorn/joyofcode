const { GraphQLServer } = require("graphql-yoga");
const stream = require("stream");

const express = require("express");
const path = require("path");

const { resolvers } = require("./server/resolvers");

const { PrismaClient } = require("@prisma/client");

require("dotenv").config();
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

const helmet = require("helmet");

server.express.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [
          "https://justinhorn.github.io",
          "https://justinhorn.name/",
          "http://localhost:3000/",
        ],
      },
    },
  })
);
server.express.use(express.static(path.join(__dirname, "client", "build")));

server.express.get("/file", async (req, res, next) => {
  const page = await puppeteer
    .launch()
    .then(function (browser) {
      return browser.newPage();
    })
    .then(async function (page) {
      await page.goto("https://justinhorn.name/");
      return page;
    });

  res.write();
});

server.start(options, () => console.log("Server startet!"));

process.on("SIGINT", () => {
  console.log("Bye bye!");
  process.exit();
});
