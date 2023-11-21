import { Given } from '@wdio/cucumber-framework';
import InventoryPage from '../pageObjects/inventoryPage.js';
const inventoryPage = new InventoryPage;

Given(/I sort the data using (.*)/, async (sortingOption) => {
  await expect(inventoryPage.sortDropdown).toExist();
  await inventoryPage.sortDropdown.click();
  await inventoryPage.sortDrodownOption(sortingOption).click();
});

Given(/I validate data is sorted by (.*)/, async (sortingOption) => {
  await inventoryPage.validateSorting(sortingOption);
});

Given(/I (add|remove) a product (?:to|from) cart/, async (action) => {
  action === 'add' ? await inventoryPage.addItemToCart() : await inventoryPage.removeItemFromCart();
});
