import { FrontPage } from './app.po';

describe('front App', () => {
  let page: FrontPage;

  beforeEach(() => {
    page = new FrontPage();
  });

  it('should do things', async () => {
    await page.navigateTo();
    expect(await page.getParagraphText()).toEqual('I am a very long url - click me');
  });
});
