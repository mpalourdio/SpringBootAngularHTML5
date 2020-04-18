import { browser, element, by } from 'protractor';

export class FrontPage {
  public navigateTo() {
    return browser.get('/my-context/path/');
  }

  public getParagraphText() {
    return element(by.css('#clickme')).getText();
  }
}
