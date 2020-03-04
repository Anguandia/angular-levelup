import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';
const ngMockE2E = require('ng-mock-e2e');
const {$httpBackend} = ngMockE2E;

describe('Stock monitor App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    // ngMockE2E.addMockModule();
    // ngMockE2E.addAsDependencyForModule('example');
    // ngMockE2E.embedScript('bower_components/angular-mocks/angular-mocks.js');
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('All stock');
  });
  it('should display allStock tab', () => {
    page.navigateTo();
    const all = element(by.css('app-root .content .card-container .card span'));
    expect(all.getText()).toEqual('All stock');;
  });
  it('should navigate to allstock page', () => {
    page.navigateTo();
    const all = element(by.css('app-root .content .card-container .card span')).click();
    expect(page.getAll()).toEqual('John');;
  });
  it('should open specific item details page', () => {
    // $httpBackend.when('GET', 'http://localhost:4200/1').respond({name: 'eggs'});
    page.navigateTo();
    const all = element(by.css('app-root .content .card-container .card span')).click();
    expect(page.getAll()).toEqual('John');;
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
