const { getTags } = require("./helper/update");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUserId = (context) => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }
  throw new Error("Not authenticated");
};

const register = async (p, args, context, i) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return { user, token };
};

const login = async (p, args, context, i) => {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error("No such User found!");
  }

  const valid = bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Wrong password");
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user,
  };
};

const addResource = async (p, args, context, i) => {
  const userId = getUserId(context);

  const tags = args.tags.map((n) => ({
    create: { name: n },
    where: { name: n },
  }));

  const resource = await context.prisma.resource.create({
    data: {
      title: args.title,
      href: args.href,
      tags: {
        connectOrCreate: tags,
      },
      postedBy: {
        connect: { id: userId },
      },
    },
  });

  return resource;
};

const updateResource = async (p, args, context, i) => {
  const userId = getUserId(context);

  const { title } = args;

  const tags = await getTags(args, context);

  await context.prisma.user.update({
    where: { id: userId },
    data: {
      postedResources: {
        update: [
          {
            where: { id: args.id },
            data: {
              title,
              tags,
            },
          },
        ],
      },
    },
  });

  return context.prisma.resource.findOne({ where: { id: args.id } });
};

const deleteResource = async (p, args, context, i) => {
  const userId = getUserId(context);

  const resource = await context.prisma.resource.findOne({
    where: { id: args.id },
  });

  await context.prisma.user.update({
    where: { id: userId },
    data: {
      postedResources: {
        delete: [
          {
            id: args.id,
          },
        ],
      },
    },
  });

  return resource;
};

module.exports = {
  login,
  register,
  addResource,
  deleteResource,
  updateResource,
};
