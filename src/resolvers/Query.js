const { getUserId } = require('./helper/authentication');

const hello = () => 'Hello World!';

const authorize = async (p, args, context) => {
  const userId = getUserId(context);
  const user = await context.prisma.user.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error('No user found');
  }

  return user;
};

const project = async (p, args, context) => {
  return await context.prisma.project.findOne({ where: { id: args.id } });
};

const feed = async (p, args, context) => {
  return await context.prisma.project.findMany({
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
};

const comments = async (p, args, context) => {
  return await context.prisma.comment.findMany({
    where: { projectId: args.projectId },
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
};

const user = async (p, args, context, info) => {
  return await context.prisma.user.findOne({ where: { id: args.id } });
};

const userLikes = async (p, args, context, info) => {
  return await context.prisma.like.findMany({
    where: { userId: args.id },
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
};
const userProjects = async (p, args, context, info) => {
  return await context.prisma.project.findMany({
    where: { userId: args.id },
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
};
const userComments = async (p, args, context, info) => {
  return await context.prisma.comment.findMany({
    where: { userId: args.id },
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
};

module.exports = {
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
