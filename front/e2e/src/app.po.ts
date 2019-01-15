import { browser, element, by } from 'protractor';

export class FrontPage {
  public navigateTo() {
    return browser.get('/');
  }

  public getParagraphText() {
    return element(by.css('#testDataInputLabel')).getText();
  }
}
