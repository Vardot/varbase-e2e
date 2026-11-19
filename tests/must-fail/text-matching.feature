@must-fail
Feature: Page-text assertions that must fail
  `I should not see` reads the page the way `I should see` does, hidden text
  included, with its letter case. tests/check-must-fail.js runs these
  scenarios and checks that each one fails at its last step with the message
  its description announces, the address of the page and a hint.

  Scenario: A text that is on the page
    Fails with: The text "Next page" is on the page, but it should not be.
    Given I am on "/text-matching.html"
    Then I should not see "Next page"

  Scenario: A hidden text that is on the page
    Fails with: The text "Members save 10 percent" is on the page, but it should not be.
    Given I am on "/text-matching.html"
    Then I should not see "Members save 10 percent"
