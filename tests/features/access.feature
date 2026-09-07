Feature: Access assertions
  A site picks its own way of saying no: HTTP 403, HTTP 404 to keep a route
  unguessable, HTTP 200 with an access-denied page, or a redirect to the log-in
  form. A permission scenario should assert "refused", not one of those four,
  and it needs the positive half too — a role that can reach nothing passes
  every refusal assertion on its own.

  Background:
    Given I am an anonymous user

  # A 404 is the point of this scenario, so the browser console will carry the
  # resource error. @js-off keeps that expected noise out of the run.
  @js-off
  Scenario: A path that does not answer at all is refused
    Then I am denied access to "/no-such-admin-page.html"
    And we should be refused "/admin/config"

  Scenario: A path that answers 200 with an access-denied page is refused
    Then I am denied access to "/access-denied.html"

  Scenario: A path that answers with a log-in form is refused
    Then I should be refused "/user-login.html"

  Scenario: A path the visitor may open is allowed
    Then I should be allowed "/about-us.html"
    And we am granted access to "/index.html"

  Scenario: The page already open can be asserted without navigating again
    When I go to "/access-denied.html"
    Then I should be denied access
    And the page should be access restricted
    When I go to "/user-login.html"
    Then the page should be access restricted
