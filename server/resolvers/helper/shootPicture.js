const aws = require("aws-sdk");

const puppeteer = require("puppeteer");

var Url = require("url-parse");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.SECRET_AWS_KEY,
});

let page;
puppeteer.launch().then(async function (browser) {
  page = await browser.newPage();
});

const getImage = async (href) => {
  const url = new Url(href);
  const host = url.host;
  const path = url.pathname;

  if (host.includes("localhost")) {
    throw Error("No localhost urls");
  }

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
