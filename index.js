const { GraphQLServer } = require("graphql-yoga");
const stream = require("stream");

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

const puppeteer = require("puppeteer");

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

  res.write(await page.screenshot({ path: "example.png" }));
});

server.start(options, () => console.log("Server startet!"));

process.on("SIGINT", () => {
  console.log("Bye bye!");
  process.exit();
});
