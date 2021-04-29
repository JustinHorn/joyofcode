import { Context } from 'app-types';

const likeProject = async (p: any, args: any, context: Context, i: any) => {
  const { userId } = args;
  const { id: projectId } = args;

  const exists = await context.prisma.like.findOne({
    where: { userId_projectId: { userId, projectId } },
  });

  if (exists) {
    throw new Error('Project has already been liked!');
  }

  const like = context.prisma.like.create({
    data: {
      user: { connect: { id: userId } },
      project: { connect: { id: projectId } },
    },
  });
  return like;
};

const unlikeProject = async (p: any, args: any, context: Context, i: any) => {
  const { userId } = args;
  const { id: projectId } = args;

  const like = await context.prisma.like.delete({
    where: {
      userId_projectId: { userId, projectId },
    },
  });
  return like.id;
};

module.exports = { likeProject, unlikeProject };
