import { PrismaClient } from '@prisma/client';
import { Context as innerContext } from 'graphql-yoga/dist/types';

interface Context extends innerContext {
  prisma: PrismaClient;
  [x: string]: any;
}
