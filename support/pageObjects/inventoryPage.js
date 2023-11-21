import _ from 'lodash';
import chai from 'chai';
import testData from '../helpers/TestData.js';

const chaiExpect = chai.expect;

class InventoryPage {
  get addToCartButton() { return '[data-test^="add-to-cart"]'; }
  get inventoryItems() { return $$('.inventory_item'); }
  get itemDescriptions() { return $$('.inventory_item_desc'); }
  get itemNames() { return $$('.inventory_item_name'); }
  get itemPrices() { return $$('.inventory_item_price'); }
  get removeFromCard() { return '[data-test^="remove-"]'; }
  get shoppingCartBadge() { return $('.shopping_cart_badge'); }
  get sortDropdown() { return $('[data-test="product_sort_container"]'); }
  sortDrodownOption(option) { return this.sortDropdown.$(`option[value=${option}]`); }
  get title() { return $('.title'); }

  async addItemToCart() {
    this.itemsAddedToCartCount= 0;
    this.itemUsed = [];

    let item = await this.getRandomItem();
    await item.$(this.addToCartButton).click();
    this.itemsAddedToCartCount++;

    //validating 1 item exists in the cart
    await expect(this.shoppingCartBadge).toHaveText(this.itemsAddedToCartCount.toString());
    item = await this.getRandomItem();
    await item.$(this.addToCartButton).click();
    this.itemsAddedToCartCount++;

    //validate 2 items exists in the cart
    await expect(this.shoppingCartBadge).toHaveText(this.itemsAddedToCartCount.toString());
  }

  async getRandomItem() {
    const filteredItems = await this.inventoryItems.filter(item => !this.itemUsed.includes(item.elementId));
    const index = Math.floor(Math.random() * filteredItems.length);
    let itemName, itemDescription, itemPrice;

    this.itemUsed.push(filteredItems[index].elementId);
    itemName = await filteredItems[index].$(await this.itemNames.selector).getText();
    itemPrice = await filteredItems[index].$(await this.itemPrices.selector).getText();
    itemDescription = await filteredItems[index].$(await this.itemDescriptions.selector).getText();
    testData.itemsUsed = testData.itemsUsed ? [...testData.itemsUsed, {itemName, itemDescription, itemPrice} ] : [{itemName, itemDescription, itemPrice}];
    return filteredItems[index];
  }

  async removeItemFromCart() {
    const itemsInCart = await this.inventoryItems.filter(item => this.itemUsed.includes(item.elementId));

    for (const [index, item] of itemsInCart.entries()) {
      await item.$(this.removeFromCard).click();
      this.itemsAddedToCartCount--;

      index === itemsInCart.length - 1 
        ? await this.shoppingCartBadge.waitForExist({reverse: true}) 
        : await expect(this.shoppingCartBadge).toHaveText(this.itemsAddedToCartCount.toString());
    }
  }

  async validateSorting(sortingOption) {
    let expectedData, sortedData;
    const sortFn = (a, b) => parseFloat(b) - parseFloat(a);

    switch (sortingOption) {
      case 'az':
        sortedData = await this.itemNames.map(item => item.getText());
        expectedData = [...sortedData.sort()];
        break;
      case 'hilo':
        sortedData = await this.itemPrices.map(item => item.getText()).map(item => item.replace('$', ''));
        expectedData = [...sortedData.sort(sortFn).reverse()];
        break;
      case 'lohi':
        sortedData = await this.itemPrices.map(item => item.getText()).map(item => item.replace('$', ''));
        expectedData = [...sortedData.sort(sortFn)];
        break;
      case 'za':
        sortedData = await this.itemNames.map(item => item.getText());
        expectedData = [...sortedData.sort(sortFn)];
        break;
      default:
        throw new Error(`Undefined option specified: ${sortingOption}`);
    }

    await chaiExpect(_.isEqual(expectedData, sortedData)).to.be.true;
  }
}

export default InventoryPage;
