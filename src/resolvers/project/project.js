const { getTags } = require('../helper/update');

const { getImage } = require('../helper/shootPicture');

const makePictureOfWebsite = async (p, args, context) => {
  return getImage(args.href);
};

const check = require('../helper/check');

const checkArgs = (args) => {
  const { tags, href, github } = args;

  tags && check.tags(tags);

  href && check.noLocalHost(href, 'as Link');

  github && check.mustBeGithub(github);
  args.techTags = { set: args.techTags };
};

const addProject = async (p, args, context, i) => {
  const { userId } = args;
  const { href, title, github, imgUrl, description, techTags } = args;

  checkArgs(args);

  const tags = args.tags
    ? args.tags.map((n) => ({
        create: { name: n },
        where: { name: n },
      }))
    : [];

  const project = await context.prisma.project.create({
    data: {
      href,
      title,
      github,
      imgUrl,
      description,
      techTags: { set: techTags },
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
  const { userId } = args;

  const { href, title, github, imgUrl, description, techTags } = args;

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
              techTags: { set: techTags },
            },
          },
        ],
      },
    },
  });

  return context.prisma.project.findOne({ where: { id: args.id } });
};

const deleteProject = async (p, args, context, i) => {
  const { userId } = args;

  const project = await context.prisma.project.findOne({
    where: { id: args.id },
  });

  if (project.userId !== userId) {
    throw new Error('Project not posted by user');
  }

  await context.prisma.like.deleteMany({ where: { projectId: args.id } });
  await context.prisma.comment.deleteMany({ where: { projectId: args.id } });

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
