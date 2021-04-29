import { PrismaClient } from '@prisma/client';
import { ContextParameters } from 'graphql-yoga/dist/types';

interface Context extends ContextParameters {
  prisma: PrismaClient;
}
