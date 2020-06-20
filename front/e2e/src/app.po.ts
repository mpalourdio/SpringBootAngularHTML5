import { browser, element, by } from 'protractor';

export class FrontPage {
  // tslint:disable-next-line:typedef
  public navigateTo() {
    return browser.get('/my-context/path/');
  }

  // tslint:disable-next-line:typedef
  public getParagraphText() {
    return element(by.css('#clickme')).getText();
  }
}
