@inventory
Feature: Validating inventory page functionality
  Background: Login with a valid user
    Given I navigate to Login page
    When I login with standard_user and secret_sauce

  Scenario Outline: Test sorting for Inventory page

    When I sort the data using <sortingOption>
    Then I validate data is sorted by <sortingOption>

  Examples:
    | sortingOption |
    | za            |
    | az            |
    | lohi          |
    | hilo          |

  Scenario: Test add/remove cart functionaity
    Given I add a product to cart
    Then I remove a product from cart
