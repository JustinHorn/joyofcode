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

const addProject = async (p, args, context, i) => {
  const { userId } = await getUserIdVerified(context);

  checkArgs(args);

  const tags = args.tags
    ? args.tags.map((n) => ({
        create: { name: n },
        where: { name: n },
      }))
    : [];

  const project = await context.prisma.project.create({
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

  return project;
};

const updateProject = async (p, args, context, i) => {
  const { userId } = await getUserIdVerified(context);

  const { href, title, github, imgUrl, description } = args;

  checkArgs(args);

  const tags = await getTags(args, context);

  await context.prisma.user.update({
    where: { id: userId },
    data: {
      postedProjects: {
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

  return context.prisma.project.findOne({ where: { id: args.id } });
};

const deleteProject = async (p, args, context, i) => {
  const { userId } = await getUserIdVerified(context);

  const project = await context.prisma.project.findOne({
    where: { id: args.id },
  });

  if (project.userId !== userId) {
    throw new Error("Project not posted by user");
  }

  await context.prisma.like.deleteMany({ where: { projectId: args.id } });

  await context.prisma.project.delete({
    where: { id: args.id },
  });

  return project;
};

module.exports = {
  addProject,
  deleteProject,
  updateProject,
  makePictureOfWebsite,
};
