import { Context } from 'app-types';
import { getUserId } from './helper/authentication';

const hello = () => 'Hello World!';

const authorize = async (_p: any, _args: any, context: Context) => {
  const userId = getUserId(context);
  const user = await context.prisma.user.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error('No user found');
  }

  return user;
};

const project = async (_p: any, args: any, context: Context) => {
  return await context.prisma.project.findOne({ where: { id: args.id } });
};

const feed = async (_p: any, args: any, context: Context) => {
  return await context.prisma.project.findMany({
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
};

const comments = async (_p: any, args: any, context: Context) => {
  return await context.prisma.comment.findMany({
    where: { projectId: args.projectId },
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
};

const user = async (_p: any, args: any, context: Context, _info: any) => {
  return await context.prisma.user.findOne({ where: { id: args.id } });
};

const userLikes = async (_p: any, args: any, context: Context, _info: any) => {
  return await context.prisma.like.findMany({
    where: { userId: args.id },
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
};
const userProjects = async (
  _p: any,
  args: any,
  context: Context,
  _info: any
) => {
  return await context.prisma.project.findMany({
    where: { userId: args.id },
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
};
const userComments = async (
  _p: any,
  args: any,
  context: Context,
  _info: any
) => {
  return await context.prisma.comment.findMany({
    where: { userId: args.id },
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
};

export {
  hello,
  project,
  feed,
  authorize,
  comments,
  user,
  userLikes,
  userProjects,
  userComments,
};
