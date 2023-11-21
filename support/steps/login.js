import { Given } from '@wdio/cucumber-framework';
import LoginPage from '../pageObjects/loginPage.js';
const loginPage = new LoginPage();

Given(/I login with (.*) and (.*)/, async (username, password) => {
  await loginPage.login(username, password);
});

Given(/I should see the following (.*)/, async (message) => {
  !message && expect(browser).toHaveUrlContaining('inventory.html');

  await loginPage.validateErrorMessage(message);
});
