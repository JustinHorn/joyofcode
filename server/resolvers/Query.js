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

const feed = async (p, arg, context) => {
  const resources = await context.prisma.resource.findMany();
  return resources;
};

module.exports = { hello, feed, authorize };
