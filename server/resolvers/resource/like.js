const { getUserIdVerified } = require("../helper/authentication");

const likeResource = async (p, args, context, i) => {
  const { userId } = await getUserIdVerified(context);
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
  const { userId } = await getUserIdVerified(context);
  const { id: resourceId } = args;

  const like = await context.prisma.like.delete({
    where: {
      userId_resourceId: { userId, resourceId },
    },
  });
  return like.id;
};

module.exports = { likeResource, unlikeResource };
