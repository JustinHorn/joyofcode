const { getUserId } = require('./resolvers/helper/authentication');

const verifyUserId = async (resolve, root, args, context, info) => {
  const userId = await getUserId(context);

  const result = await resolve(root, { ...args, userId }, context, info);
  return result;
};

const middleware1 = {
  Mutation: {
    addProject: verifyUserId,
    likeProject: verifyUserId,
    unlikeProject: verifyUserId,
    updateProject: verifyUserId,
    deleteProject: verifyUserId,
    makePictureOfWebsite: verifyUserId,
    addComment: verifyUserId,
    removeComment: verifyUserId,
  },
};

const middlewares = [middleware1];

module.exports = { middlewares };
