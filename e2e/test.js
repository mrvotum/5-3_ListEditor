/* eslint-disable no-undef */
const puppeteer = require('puppeteer');
const { fork } = require('child_process');

jest.setTimeout(30000); // default puppeteer timeout
describe('Click to button', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => { // открыть браузер
    server = fork(`${__dirname}/test-server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppeteer.launch({
      // comment everything for appveyor
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  }); // открыть браузер
  afterAll(async () => { // закрыть браузер
    await browser.close();
    server.kill();
  }); // закрыть браузер
  test('should show form', async () => {
    await page.goto(baseUrl);

    const btn = await page.$('[data-item=itemAdd]');
    btn.click();
    await page.waitForSelector('[data-form=form]');
    // TODO:
  });

  // test('should add new object', async () => {
  //   await page.goto(baseUrl);

  //   const btn = await page.$('[data-item=itemAdd]');
  //   btn.click();
  //   const form = await page.waitForSelector('[data-form=form]');

  //   const itemName = await page.waitForSelector('[data-input=itemName]');
  //   const itemPrice = await page.waitForSelector('[data-input=itemPrice]');
  //   itemName.value = 'item name';
  //   itemPrice.value = '10000';

  // eslint-disable-next-line max-len
  //   const btnSubmit = form.querySelector('[data-id=submit]'); // .waitForSelector('[data-id=submit]');
  //   btnSubmit.click();

  //   await page.waitForSelector('[data-id=item_2]');
  //   // TODO:
  // });
});
