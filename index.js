const { GraphQLServer } = require("graphql-yoga");

const express = require("express");
const path = require("path");

const { resolvers } = require("./server/resolvers");

const { PrismaClient } = require("@prisma/client");
const { exception } = require("console");

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

helmet = require("helmet");

server.express.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: false,
  })
);

server.express.get("/verifyuser", async (req, res, next) => {
  try {
    let { id, code } = req.query;
    id = Number(id);
    code = Number(code);

    if (id === NaN || code === NaN) {
      throw new Exception("Id and code need to be numbers!");
    }

    const user = await prisma.user.findOne({ where: { id } });

    if ((user.verificationCode = code)) {
      const user = await prisma.user.update({
        where: { id },
        data: { verified: true },
      });
      console.log(`User ${id} verified ${user.verified}`);
    }
  } finally {
    next();
  }
});

if (process.env.JUSTINDEV) {
  server.express.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  server.express.use(express.static(path.join(__dirname, "client", "build")));

  server.express.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

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

if (process.env.JUSTINDEV) {
  process.on("SIGINT", () => {
    console.log("Bye bye!");
    process.exit();
  });
}
