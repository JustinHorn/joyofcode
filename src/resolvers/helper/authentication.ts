import { Context } from 'app-types';
import jwt from 'jsonwebtoken';

export const getUserId = (context: Context) => {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET!) as any;

    return userId;
  }
  throw new Error('Not authenticated');
};

export const getUserIdVerified = async (context: Context) => {
  const userId = getUserId(context);

  const user = await context.prisma.user.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error('Could not find user for with this auth token');
  }

  if (!user.verified) {
    throw new Error(
      'User not verified - check the link in your email to verify'
    );
  }

  return { userId, user };
};
