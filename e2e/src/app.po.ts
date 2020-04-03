import { browser, by, element, $$, $ } from 'protractor';

export class AppPage {
  navigateTo(location=browser.baseUrl) {
    return browser.get(location) as Promise<any>;
  }

  getTitleText() {
    return $$('span').get(2).getText() as Promise<string>;
  }

  getItemDetails() {
    return $('h3').getText() as Promise<string>;
  }

  getListItem(index = 0) {
    return $$('.card').get(index).click();
  }

  getResponse() {
    return $('.message em').getText() as Promise<string>;
  }

  send() {
    return $('.save').click();
  }

  clickOn(elt) {
    return elt.click();
  }
}
