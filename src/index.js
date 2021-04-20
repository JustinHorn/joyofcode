const { GraphQLServer } = require('graphql-yoga');

const express = require('express');
const path = require('path');

const { resolvers } = require('./resolvers');

const { PrismaClient } = require('@prisma/client');
const { exception } = require('console');

require('dotenv').config();

const { middlewares } = require('./server/middleware');

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: './src/server/schema.graphql',
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
  middlewares,
});

const options = {
  port: process.env.PORT || 4000,
  endpoint: '/graphql',
  playground: '/graphql',
};

helmet = require('helmet');

server.express.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: false,
  })
);

if (process.env.IS_DEVELOPMENT) {
  // display build version only on /
  server.express.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  // display build version on all paths of server
  server.express.use(express.static(path.join(__dirname, 'client', 'build')));

  server.express.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

server.start(options, () => console.log('Server startet!'));

if (process.env.JUSTINDEV) {
  process.on('SIGINT', () => {
    console.log('Bye bye!');
    process.exit();
  });
}
