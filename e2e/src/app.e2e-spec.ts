import { AppPage } from './app.po';
import { browser, logging, element, by, $$, $ } from 'protractor';

describe('Stock monitor App', () => {
  let page: AppPage;
  let allStockTab;
  let createStockTab;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    allStockTab = $$('.card-container .card').first();
    createStockTab = $$('.card-container .card').last();
    browser.ignoreSynchronization = true;
  });

  describe('test home page', () => {
    it('should display welcome message', () => {
      expect(page.getTitleText()).toEqual('All stock');
    });
    it('should display allStock tab', () => {
      expect(allStockTab.getText()).toEqual('All stock');;
    });
  })

  describe('test all stock listing', () => {
    beforeEach(() => allStockTab.click());
    it('should navigate to allstock page', () => {
      expect(page.getItemDetails()).toEqual('John');;
    });
    it('should list all items', () => {
      const all = $$('.card-container .card')
      expect(all.count()).toEqual(4);
    });
  })

  describe('test single item operations', () => {
    beforeEach(() => {
      allStockTab.click();
      page.getListItem();
    })
    it('should open specific item details page', () => {
      expect(page.getItemDetails()).toEqual('JOHN Details');;
    });
    it('should update item', () => {
      page.clickOn($$('.buttons button').first());
      $$('.form input').first().sendKeys('new john');
      page.send();
      expect(page.getResponse()).toEqual('updated');;
    });
    it('should delete item', () => {
      page.clickOn($('.buttons .red'));
      page.clickOn($('.buttons .red'));
      expect(page.getResponse()).toEqual('Item John deleted');;
    });
  })

  describe('test create item', () => {
    beforeEach(() => createStockTab.click())
    it('should create item', () => {
      const newItem = ['mike', 10, 900000];
      $$('.form input')
        .then((inputs) => inputs.forEach((v, k) => v.sendKeys(newItem[k])));
      page.send();
      expect(page.getResponse()).toEqual('Item mike added');;
    });
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
