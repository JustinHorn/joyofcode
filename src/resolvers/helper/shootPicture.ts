import aws from 'aws-sdk';

import puppeteer from 'puppeteer';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.SECRET_AWS_KEY,
});

let page: puppeteer.Page;
puppeteer
  .launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  .then(async function (browser) {
    page = await browser.newPage();
  })
  .catch((error) => console.log(error));

const check = require('./check');

export const getImage = async (href: string) => {
  const { host, path } = check.noLocalHost(href, 'as img link');

  const fileName = host + path + '.png';

  await page.goto(href);

  const file = await page.screenshot();

  const params = {
    Bucket: 'justinhorntestbucket', // pass your bucket name
    Key: fileName, // file will be saved as testBucket/contacts.csv
    Body: file,
    ACL: 'public-read',
  };

  await s3
    .upload(params, (error: Error, data: aws.S3.ManagedUpload.SendData) => {
      if (error) throw error;
      return data;
    })
    .promise();
  return 'https://justinhorntestbucket.s3.amazonaws.com/' + params.Key;
};
