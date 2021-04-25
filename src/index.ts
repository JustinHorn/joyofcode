import { GraphQLServer } from 'graphql-yoga';

import path from 'path';

import { resolvers } from './resolvers';

import { PrismaClient } from '@prisma/client';

require('dotenv').config();

import { middlewares } from './server/middleware';
import express from 'express';

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

const helmet = require('helmet');

server.express.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: false,
  })
);

if (process.env.IS_DEVELOPMENT) {
  // display build version only on /
  server.express.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
} else {
  // display build version on all paths of server
  server.express.use(
    express.static(path.join(__dirname, '..', 'client', 'build'))
  );

  server.express.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

server.start(options, () => console.log('Server startet!'));

if (process.env.JUSTINDEV) {
  process.on('SIGINT', () => {
    console.log('Bye bye!');
    process.exit();
  });
}
