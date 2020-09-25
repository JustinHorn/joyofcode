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

  if (args.tags.length > 20) {
    throw new Error("No more tags than 20!");
  }

  const tags = args.tags
    ? args.tags.map((n) => ({
        create: { name: n },
        where: { name: n },
      }))
    : [];

  args.href && new Check(args.href).noLocalHost("as Link");

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

const likeResource = async (p, args, context, i) => {
  const userId = getUserId(context);
  const { id: resourceId } = args;

  const exists = await context.prisma.like.findOne({
    where: { userId_resourceId: { userId, resourceId } },
  });
  if (exists) {
    throw new Error("Resource has already been liked!");
  }

  const like = context.prisma.like.create({
    data: {
      user: { connect: { id: userId } },
      resource: { connect: { id: resourceId } },
    },
  });
  return like;
};

const unlikeResource = async (p, args, context, i) => {
  const userId = getUserId(context);
  const { id: resourceId } = args;

  const like = await context.prisma.like.delete({
    where: {
      userId_resourceId: { userId, resourceId },
    },
  });
  return like.id;
};

const updateResource = async (p, args, context, i) => {
  const userId = getUserId(context);

  const { href, title, github, imgUrl, description } = args;

  github && new Check(github).mustBeGithub();

  if (args.tags.length > 20) {
    throw new Error("No more tags than 20!");
  }

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
              href,
              tags,
            },
          },
        ],
      },
    },
  });

  return context.prisma.resource.findOne({ where: { id: args.id } });
};

const addComment = (p, args, context) => {
  const userId = getUserId(context);

  const comment = context.prisma.comment.create({
    data: {
      text: args.text,
      postedBy: {
        connect: { id: userId },
      },
      postedUnder: {
        connect: { id: args.resourceId },
      },
    },
  });
  return comment;
};

const removeComment = async (p, args, context) => {
  const userId = getUserId(context);

  const comment = await context.prisma.user.update({
    where: { id: userId },
    data: {
      comments: {
        delete: { id: args.commentId },
      },
    },
  });
  return comment.id;
};

const deleteResource = async (p, args, context, i) => {
  const userId = getUserId(context);

  const resource = await context.prisma.resource.findOne({
    where: { id: args.id },
  });

  if (resource.userId !== userId) {
    throw new Error("Resource not posted by user");
  }

  await context.prisma.like.deleteMany({ where: { resourceId: args.id } });

  await context.prisma.resource.delete({
    where: { id: args.id },
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
  likeResource,
  unlikeResource,
  deleteResource,
  updateResource,
  addComment,
  removeComment,
  makePictureOfWebsite,
};
