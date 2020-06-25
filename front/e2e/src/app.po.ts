import { browser, element, by } from 'protractor';

export class FrontPage {
  public navigateTo(): Promise<unknown> {
    return browser.get('/my-context/path/') as Promise<unknown>;
  }

  public getParagraphText(): Promise<unknown> {
    return element(by.css('#clickme')).getText() as Promise<unknown>;
  }
}
