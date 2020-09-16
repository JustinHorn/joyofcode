const { getTags } = require("./helper/update");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { getUserId } = require("./helper/authentication");

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

const { Check } = require("./helper/checkUrl");

const addResource = async (p, args, context, i) => {
  const userId = getUserId(context);

  const tags = args.tags.map((n) => ({
    create: { name: n },
    where: { name: n },
  }));

  args.href && new Check(args.href).noLocalHost();

  args.github && new Check(args.github).mustBeGithub();

  const resource = await context.prisma.resource.create({
    data: {
      ...args,

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

  const { title, github, imgUrl, description } = args;

  github && new Check(github).mustBeGithub();

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
              github,
              imgUrl,
              description,

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

const { getImage } = require("./helper/shootPicture");

const makePictureOfWebsite = async (p, args, context) => {
  const userId = getUserId(context);
  return getImage(args.href);
};

module.exports = {
  login,
  register,
  addResource,
  deleteResource,
  updateResource,
  makePictureOfWebsite,
};
