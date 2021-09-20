import puppeteer from 'puppeteer';
import settings from './settings.json';

const [, , pageURL] = process.argv;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page
    .goto(`${pageURL}/?print-pdf`, { waitUntil: 'networkidle2' })
    .catch((error) => console.error('error:', error));
  // await page.emulateMedia('screen');
  await page.addStyleTag({
    content: `
    `,
  });
  await page.pdf({
    path: '../slides.pdf',
    // ...settings,
  });
  await browser.close();
})();

