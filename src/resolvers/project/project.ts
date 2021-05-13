import { getTags } from '../helper/update';

import { getImage } from '../helper/shootPicture';
import { Context } from 'app-types';
import * as check from '../helper/check';

export const makePictureOfWebsite = async (
  p: any,
  args: any,
  context: Context
) => {
  return getImage(args.href);
};

const checkArgs = (args: any) => {
  const { tags, href, github } = args;

  tags && check.tags(tags);

  href && check.noLocalHost(href, 'as Link');

  github && check.mustBeGithub(github);
  args.techTags = { set: args.techTags };
};

export const addProject = async (p: any, args: any, context: Context) => {
  const { userId } = args;
  const { href, title, github, imgUrl, description, techTags } = args;

  checkArgs(args);

  const tags = args.tags
    ? args.tags.map((n: string) => ({
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

export const updateProject = async (p: any, args: any, context: Context) => {
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

  return context.prisma.project.findFirst({ where: { id: args.id } });
};

export const deleteProject = async (p: any, args: any, context: Context) => {
  const { userId } = args;

  const project = await context.prisma.project.findFirst({
    where: { id: args.id },
  });

  if (!project) {
    throw new Error('Project does not exist');
  }

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
