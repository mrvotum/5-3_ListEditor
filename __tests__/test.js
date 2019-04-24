import puppetteer from 'puppeteer';
import EditForm from '../src/js/EditForm';

jest.setTimeout(30000); // default puppeteer timeout
describe('Click to button', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => { // открыть браузер
    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 100,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  }); // открыть браузер
  afterAll(async () => { // закрыть браузер
    await browser.close();
  }); // закрыть браузер
  test('should create table', async () => {
    await page.goto(baseUrl);

    const editForm = new EditForm();
    editForm.create('', '');

    // const btn = await page.$('[data-id=buttonWithPopover]');
    // const input = await form.$('[data-id=innogrn-input]');
    // await input.type('7715964180');
    // const submit = await form.$('[data-id=innogrn-submit]');
    // btn.click();
    await page.waitForSelector('[data-form=form]');
  });
});
