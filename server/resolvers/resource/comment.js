const { getUserId } = require("../helper/authentication");

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
