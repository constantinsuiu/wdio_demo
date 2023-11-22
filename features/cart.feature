@cart
Feature: Validating cart page functionality
  Background: Login with a valid user
    Given I navigate to Login page
    Then I login with standard_user and secret_sauce

  Scenario: Test product order successful flow
    Given I navigate to Cart page
      And I validate the cart
      And I navigate to Inventory page
    When I add a product to cart
      And I navigate to Cart page
    Then I validate the cart
      And I make a successful purchase
