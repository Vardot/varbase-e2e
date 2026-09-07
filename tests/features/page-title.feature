Feature: Page title assertions
  The <title> element is the browser tab text, the bookmark name, the
  search-result heading and the first thing a screen reader announces. On a
  Drupal site it is the head title pattern, so asserting it proves the pattern
  and the token that fills it both work.

  Background:
    Given I am an anonymous user

  Scenario: The exact title
    When I go to "/about-us.html"
    Then the page title should be "About Us"
    And the page title should not be "Contact Us"

  Scenario: Part of the title, which is what a real head title pattern allows
    When I go to "/about-us.html"
    Then the page title should contain "About"
    And the page title should not contain "Access denied"

  Scenario: The title follows the page
    When I go to "/element.html"
    Then the page title should be "Element Demo"
    When I go to "/about-us.html"
    Then the page title should be "About Us"
