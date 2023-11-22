
Feature: Validating login page with valid and invalid users

  Scenario Outline: Test that only a valid user is allowed to enter the website

    Given I navigate to Login page
    When I login with <username> and <password>
    Then I should see the following <message>

  Examples:
    | username        | password     | message                                                                   |
    | standard_user   | secret_sauce |                                                                           |
    | standard_uses   | secret_sauce | Epic sadface: Username and password do not match any user in this service |
    | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out.                       |
