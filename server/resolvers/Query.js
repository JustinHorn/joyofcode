const { getUserId } = require("./helper/authentication");

const hello = () => "Hello World!";

const authorize = async (p, args, context) => {
  const userId = getUserId(context);
  const user = await context.prisma.user.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error("No user found");
  }

  return user;
};

const feed = async (p, args, context) => {
  return await context.prisma.resource.findMany({
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
};

const comments = async (p, args, context) => {
  return await context.prisma.comment.findMany({
    where: { resourceId: args.resourceId },
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
};

module.exports = { hello, feed, authorize, comments };
