import { Given } from '@wdio/cucumber-framework';

Given(/I navigate to (.*) page/, async (page) => {
  let url;

  switch (page) {
    case 'Login':
      url = '';
      break;
    case 'Cart':
      url = '/cart.html';
      break;
    case 'Inventory':
      url = '/inventory.html';
      break;
  }
  
  await browser.url(url);
});
