Feature: Drimage Improved dynamic responsive images
  Drimage Improved renders an image on an SVG placeholder and swaps it for a
  derivative sized to where it is rendered, deferring anything below the fold.
  Every attribute is already in place before the swap, so only the decoded
  derivative proves the image really loaded. These steps name no selectors:
  the pack knows the module's markup, and the budget defaults to 2 seconds
  because the module exists to make images fast. The fixture mirrors the
  markup the vartheme_bs5 dynamic-responsive-image component renders on
  demo.varbase.vardot.com.

  Background:
    Given I am an anonymous user
    When I go to "/drimage.html"

  Scenario: The formatter rendered Drimage output with its fallbacks
    Then the drimage images should be rendered
    And the drimage images should offer webp
    And the drimage images should have a noscript fallback

  Scenario: The image in the viewport loaded its derivative
    Then the drimage images should be loaded
    And the drimage image "Team collaborating in a modern glass-walled office" should be loaded
    And no drimage image should be broken

  Scenario: Lazy loading defers the image below the fold until it is scrolled into view
    Then the drimage images should use lazy loading
    And the drimage image "Team meeting around a table" should still be a placeholder
    When I scroll to the bottom of the page
    Then the drimage image "Team meeting around a table" should be loaded within 2 seconds

  Scenario: The derivative width follows the viewport
    Then the drimage images should be sized for the viewport
    When I set the viewport to the "xs" breakpoint
    Then the drimage images should be sized for the viewport within 2 seconds

  Scenario: One image can be named the way a person would, never by a selector
    Then the first drimage image should be loaded
    And the drimage image number 1 should be loaded
    And the drimage image captioned "Our team in the new office" should be loaded
    And the drimage image with the alt text "Team collaborating in a modern glass-walled office" should be loaded
    And the last drimage image should still be a placeholder
    And the drimage image titled "Vardot team" should not be loaded yet
    And the drimage image "Vardot team" should not be loaded yet

  Scenario: The figure, its caption, the alt text and the title reached the front end
    Then the first drimage image should be in a figure
    And the first drimage image should have a caption
    And the first drimage image should have the caption "Our team in the new office"
    And the drimage image captioned "Our team in the new office" should have the alt text "Team collaborating in a modern glass-walled office"
    And the second drimage image should have the title "Vardot team"
    And the drimage image "Team meeting around a table" should have the title "Vardot team"
    And the last drimage image should be in a figure

  Scenario: Every qualifier names the same images
    Then the drimage improved images should be loaded
    And the dynamic images should be loaded
    And the dynamic responsive images should be loaded
    And the responsive images should be loaded
    And the images should be loaded
