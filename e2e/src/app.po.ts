import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(location=browser.baseUrl) {
    return browser.get(location) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  getAll() {
    return element(by.css('app-root .card-container .card h3')).getText() as Promise<string>;
  }
}
