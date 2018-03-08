const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'createpin',
  api_key: '399643463545514',
  api_secret: 'PQnHsg6QXyccf9uY2Tb7EaOhxMs'
});

// const puppeteer = require('puppeteer');

// const DATA_URL = 'https://www.google.com/';

// async function shit(dataUrl) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(dataUrl);
//   const title = await page.title();
//   console.log(title);
//   await browser.close();
// }

// const test = shit(DATA_URL);

router.get('/', function(req, res) {
  const puppeteer = require('puppeteer');
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://google.com');
    await page.setViewport({ width: 800, height: 1200 });
    const screenshot = await page.screenshot({ path: 'google.png', fullPage: true });
    console.log(screenshot);

    // Type our query into the search bar
    const title = await page.title();
    console.log(title);

    await cloudinary.uploader
      .upload_stream(result => {
        console.log(`RESULT 🔥`);
        console.log(result);
        res.json({
          title: title,
          publicId: result.public_id
        });
      })
      .end(screenshot);

    browser.close();
  })();
});

module.exports = router;
