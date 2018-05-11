import { FrontPage } from './app.po';

describe('front App', () => {
  let page: FrontPage;

  beforeEach(() => {
    page = new FrontPage();
  });

  it('should do things', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Favorite fruit ?');
  });
});
