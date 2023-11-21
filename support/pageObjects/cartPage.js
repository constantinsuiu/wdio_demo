import testData from '../helpers/TestData.js';
import constants from '../constants/constants.js';

class CartPage {
  get cartItems() { return $$('.cart_item'); }
  get checkoutButton() { return $('[data-test="checkout"]'); }
  get completeHeader() { return $('.complete-header'); }
  get continueButton() { return $('[data-test="continue"]'); }
  get errorMessage() { return $('[data-test="error"]'); }
  get finishButton() { return $('[data-test="finish"]'); }
  get firstNameInput() { return $('[data-test="firstName"]'); }
  get itemName() { return $('.inventory_item_name'); }
  get itemDescription() { return $('.inventory_item_desc'); }
  get itemPrice() { return $('.inventory_item_price'); }
  get lastNameInput() { return $('[data-test="lastName"]'); }
  get subTotalLabel() { return $('.summary_subtotal_label'); }
  get taxLabel() { return $('.summary_tax_label'); }
  get totalLabel() { return $('.summary_total_label'); }
  get zipCodeInput() { return $('[data-test="postalCode"]'); }

  async validateCartItems() {
    await expect(this.cartItems).toBeElementsArrayOfSize(testData.itemsUsed?.length || 0);

    for (const [index, cartItem] of await this.cartItems.entries()) {
      expect(cartItem.$(await this.itemName)).toHaveText(testData.itemsUsed[index].itemName);
      expect(cartItem.$(await this.itemDescription)).toHaveText(testData.itemsUsed[index].itemDescription);
      expect(cartItem.$(await this.itemPrice)).toHaveText(testData.itemsUsed[index].itemPrice);
    }
  }

  async validateTotalSums() {
    const totalProductPrice = testData.itemsUsed.reduce((previous, current) => previous + parseFloat(current.itemPrice.replace('$', '')), 0);
    const taxAmount = parseFloat(+(Math.round(totalProductPrice / constants.taxAmount + 'e+2')  + 'e-2')).toFixed(2);

    await expect(await this.subTotalLabel).toHaveTextContaining(`$${totalProductPrice}`);
    await expect(await this.taxLabel).toHaveTextContaining(`$${taxAmount}`);
    await expect(await this.totalLabel).toHaveTextContaining(`$${parseFloat(totalProductPrice) + parseFloat(taxAmount)}`);
    await this.finishButton.click();
    await expect(await this.completeHeader).toExist();
  }

}

export default CartPage;
