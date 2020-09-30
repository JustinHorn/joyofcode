const { getTags } = require("../helper/update");
const { getUserIdVerified } = require("../helper/authentication");

const { getImage } = require("../helper/shootPicture");

const makePictureOfWebsite = async (p, args, context) => {
  const { userId } = await getUserIdVerified(context);
  return getImage(args.href);
};

const check = require("../helper/check");

const checkArgs = ({ tags, href, github }) => {
  tags && check.tags(tags);

  href && check.noLocalHost(href, "as Link");

  github && check.mustBeGithub(github);
};

const addResource = async (p, args, context, i) => {
  const { userId } = await getUserIdVerified(context);

  checkArgs(args);

  const tags = args.tags
    ? args.tags.map((n) => ({
        create: { name: n },
        where: { name: n },
      }))
    : [];

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
  const { userId } = await getUserIdVerified(context);

  const { href, title, github, imgUrl, description } = args;

  checkArgs(args);

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

const deleteResource = async (p, args, context, i) => {
  const { userId } = await getUserIdVerified(context);

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

module.exports = {
  addResource,
  deleteResource,
  updateResource,
  makePictureOfWebsite,
};
