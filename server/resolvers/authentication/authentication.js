const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const check = require("../helper/check");

var nodemailer = require("nodemailer");
const fetch = require("node-fetch");

const token = require("./token.json");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "joyofcode8@gmail.com",
    scope: "https://mail.google.com/",
    tokenType: "Bearer",
    type: "OAuth2",
    accessToken: process.env.accessToken,
    refreshToken: process.env.refreshToken,
    clientSecret: process.env.clientSecret,
    ...token,
  },
});

function sendEmail(email, id, code) {
  var mailOptions = {
    from: "joyofcode8@gmail.com",
    to: email,
    subject: "Your verification email!",
    text: `Thanks for signing up! This is your verification link: \n https://joyofcode.herokuapp.com/verifyuser?id=${id}&code=${code}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

const register = async (p, args, context, i) => {
  const email = args.email;

  if (!check.isEmailValid(email)) {
    throw new Error(`Email "${email}" is not valid!`);
  }
  const verificationCode = Math.floor(100000000 + Math.random() * 900000000);

  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password, verificationCode },
  });

  sendEmail(args.email, user.id, verificationCode);

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return { user, token };
};

const login = async (p, args, context, i) => {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error("No such User found!");
  }

  const valid = bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Wrong password");
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user,
  };
};

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

module.exports = { login, register, authorizeWithGithub };
