const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const check = require("../helper/check");

var nodemailer = require("nodemailer");

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

function sendEmail(email) {
  var mailOptions = {
    from: "joyofcode8@gmail.com",
    to: email,
    subject: "Your verification email!",
    text: "Thanks for signing up!",
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

  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  sendEmail(args.email);

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

module.exports = { login, register };
