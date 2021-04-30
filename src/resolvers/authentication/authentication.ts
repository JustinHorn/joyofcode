import { Context } from 'app-types';
import jwt from 'jsonwebtoken';

import fetch from 'node-fetch';

export const authorizeWithGithub = async (
  parent: any,
  { code }: any,
  { prisma }: Context
) => {
  // 1. Obtain data from GitHub
  let githubUser = await requestGithubUser({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  });

  // create user and their token with jsonwebtoken in case they don't exist
  if (!githubUser.access_token) {
    throw new Error(githubUser.message);
  }

  let user: any[] | any = await prisma.user.findMany({
    where: { github_id: githubUser.id },
  });

  if (!user.length) {
    user = await prisma.user.create({
      data: {
        name: githubUser.name,
        github_id: githubUser.id,
        email: '' + githubUser.id,
        password: '',
        verificationCode: 0,
        verified: true,
      },
    });
  } else {
    user = user[0];
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET!);

  return {
    token,
    user,
  };
};

const requestGithubUser = async (credentials: {
  client_id: string;
  client_secret: string;
  code: string;
}) => {
  const res = await requestGithubToken(credentials);
  const { access_token } = res;
  const githubUser = await requestGithubUserAccount(access_token);
  return { ...githubUser, access_token };
};

const requestGithubToken = async (credentials: {
  client_id: string;
  client_secret: string;
  code: string;
}) =>
  await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error);
    });

const requestGithubUserAccount = async (token: string) =>
  await fetch(`https://api.github.com/user?access_token=${token}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => res.json());
