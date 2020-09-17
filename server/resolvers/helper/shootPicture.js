const aws = require("aws-sdk");

const puppeteer = require("puppeteer");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.SECRET_AWS_KEY,
});

let page;
puppeteer
  .launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] })
  .then(async function (browser) {
    page = await browser.newPage();
  })
  .catch((error) => console.log(error));

const { Check } = require("./checkUrl");

const getImage = async (href) => {
  const { host, path } = new Check(href).noLocalHost();

  const fileName = host + path + ".png";

  await page.goto(href);

  const file = await page.screenshot();

  const params = {
    Bucket: "justinhorntestbucket", // pass your bucket name
    Key: fileName, // file will be saved as testBucket/contacts.csv
    Body: file,
    ACL: "public-read",
  };

  await s3.upload(params, (error, data) => {
    if (error) throw error;
    return data;
  });
  return "https://justinhorntestbucket.s3.amazonaws.com/" + params.Key;
};

module.exports = { getImage };
