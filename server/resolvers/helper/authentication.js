const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUserId = (context) => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET);

    return userId;
  }
  throw new Error("Not authenticated");
};

const getUserIdVerified = async (context) => {
  const userId = getUserId(context);

  const user = await context.prisma.user.findOne({ where: { id: userId } });

  if (!user.verified) {
    throw new Error(
      "User not verified - check the link in your email to verify"
    );
  }

  return { userId, user };
};

module.exports = { getUserId, getUserIdVerified };
