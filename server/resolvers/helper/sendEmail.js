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
