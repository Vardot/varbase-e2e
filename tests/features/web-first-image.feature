Feature: Web-first image loading assertion
  A responsive image can carry every expected class and attribute while its
  bitmap never decodes — a placeholder that never swaps, or a derivative the
  server failed to generate. This suite proves the assertion sees the
  difference, on the image fixture in examples/.

  Background:
    Given I am an anonymous user
    When I go to "/image.html"

  Scenario: An image that decoded on load
    Then the image "#ready" should be loaded

  Scenario: An image whose placeholder swaps after the page settles
    Then the image "#deferred" should be loaded within 10 seconds

  Scenario: At least one match decoding is enough
    Then the image ".demo-image" should be loaded within 10 seconds
