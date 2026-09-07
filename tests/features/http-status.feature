Feature: HTTP status assertions
  The status a page returns is not always what it renders: a Drupal site can
  answer 200 with an access-denied page, or 404 to keep a route unguessable.
  Both phrasings of this assertion re-request the current URL through the
  browser's own context, so the session cookies travel with it and redirects
  are not followed.

  Background:
    Given I am an anonymous user

  Scenario: A page that exists
    When I go to "/about-us.html"
    Then the page should return HTTP status 200
    And the page should not return HTTP status 404
    And the response status code should be 200

  @js-off
  Scenario: A page that does not exist
    When I go to "/no-such-page.html"
    Then the page should return HTTP status 404
    And the response status code should not be 200
