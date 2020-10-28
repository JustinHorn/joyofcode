const jwt = require("jsonwebtoken");

const fetch = require("node-fetch");

const authorizeWithGithub = async (parent, { code }, { prisma }) => {
  // 1. Obtain data from GitHub
  let githubUser = await requestGithubUser({
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  });

  console.log("hi");

  // 2. Package the results in a single object, write the value to currentUser global variable
  currentUser = {
    name: githubUser.name,
    email: githubUser.email,
    id: githubUser.id,
    githubLogin: githubUser.login,
    githubToken: githubUser.access_token,
    avatar: githubUser.avatar_url,
  };

  // create user and their token with jsonwebtoken in case they don't exist
  if (!githubUser.access_token) {
    throw new Error(githubUser.message);
  }

  let user = await prisma.user.findMany({
    where: { github_id: githubUser.id },
  });

  if (!user.length) {
    user = await prisma.user.create({
      data: {
        name: githubUser.name,
        github_id: githubUser.id,
        email: "" + githubUser.id,
        password: "",
        verificationCode: 0,
        verified: true,
      },
    });
  } else {
    user = user[0];
  }

  console.log(user);

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user,
  };
};

const requestGithubUser = async (credentials) => {
  const res = await requestGithubToken(credentials);
  const { access_token } = res;
  const githubUser = await requestGithubUserAccount(access_token);
  return { ...githubUser, access_token };
};

const requestGithubToken = async (credentials) =>
  await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error);
    });

const requestGithubUserAccount = async (token) =>
  await fetch(`https://api.github.com/user?access_token=${token}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());

module.exports = { authorizeWithGithub };
