const addComment = async (p, args, context) => {
  const { userId } = args;
  const comment = context.prisma.comment.create({
    data: {
      text: args.text,
      postedBy: {
        connect: { id: userId },
      },
      postedUnder: {
        connect: { id: args.projectId },
      },
    },
  });
  return comment;
};

const removeComment = async (p, args, context) => {
  const { userId } = args;

  const user = await context.prisma.user.update({
    where: { id: userId },
    data: {
      comments: {
        delete: { id: args.commentId },
      },
    },
  });
  return args.commentId;
};

module.exports = { addComment, removeComment };
