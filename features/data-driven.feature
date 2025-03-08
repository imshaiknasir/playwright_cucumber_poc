Feature: Data-Driven End-to-End Test

  Scenario: Complete a purchase with credentials from JSON file
    Given I am on the login page
    When I log in with credentials from JSON file using "standard" user
    Then I should be on the products page
    When I add item "$29.99" to the cart
    And I add item "$9.99" to the cart
    When I go to the cart
    And I proceed to checkout
    When I fill checkout information with "Test", "User", "12345"
    And I continue the checkout process
    When I finish the checkout
    Then I should see the order completion message 