import { Given } from '@wdio/cucumber-framework';
import { faker } from '@faker-js/faker';
import CartPage from '../pageObjects/cartPage.js';
import constants from '../constants/constants.js';

const cartPage = new CartPage();

Given(/I validate the cart/, async() => {
  await cartPage.validateCartItems();
});

Given(/I make a successful purchase/, async () => {
  await cartPage.checkoutButton.click();
  await cartPage.continueButton.click();
  await expect(await cartPage.errorMessage).toHaveText(constants.cartErrorMessages.noFirstName);

  await cartPage.firstNameInput.setValue(faker.person.firstName());
  await cartPage.continueButton.click();
  await expect(await cartPage.errorMessage).toHaveText(constants.cartErrorMessages.noLastName);

  await cartPage.lastNameInput.setValue(faker.person.lastName());
  await cartPage.continueButton.click();
  await expect(await cartPage.errorMessage).toHaveText(constants.cartErrorMessages.noPostalCodeName);

  await cartPage.zipCodeInput.setValue(faker.location.zipCode());
  await cartPage.continueButton.click();
  await cartPage.validateCartItems();
  await cartPage.validateTotalSums();
});
