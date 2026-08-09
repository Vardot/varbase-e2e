# Step definitions

A step definition is the bridge between a sentence in a `.feature` file and the
browser work that sentence stands for. The tester writes the sentence; the step
definition does the clicking, waiting and asserting.

Varbase E2E ships **495 of them across 44 categories** — the full catalogue,
one page per category, is in [`steps/`](steps/README.md).

## Start here

| I want to… | Go to |
| --- | --- |
| Browse every step by category | [Step catalogue](steps/README.md) |
| Test a Drupal or Varbase screen | [Drupal and Varbase steps](steps/README.md#drupal-and-varbase) |
| Look up one topic quickly | [Step reference](04-step-reference.md) |
| Write my first feature file | [Quick start](00-quick-start.md) |
| Add a step of my own | [Writing your own](steps/README.md#writing-your-own) |

## What a feature file looks like

```gherkin
Feature: Example test for "Then I should be on 'page'"
  As a tester
  I want to be sure I am on "page"

  Scenario: Check "Then I should be on the 'page'" step definition
    Given I am on the homepage
     When I follow "About Us"
     Then I should be on "about-us.html"
     When I move backward one page
     Then I should be on "/"
```

Nothing is imported and nothing is wired up: cucumber-js loads every
`*.steps.js` under `tests/step-definitions/` on its own, matches each sentence
against the shipped patterns, and runs the first one that fits.

## The rules every shipped step follows

- **Pronouns are optional.** `I click`, `we click` and bare `click` all match.
- **Plain English, never code.** `local storage`, not `localStorage`.
- **Technical identifiers stay verbatim.** A CSS selector, a JSON Pointer or a
  header name is domain language, so it is written exactly as it is.
- **At least five examples per step**, in the JSDoc above the definition and on
  the catalogue page generated from it.
- **Failures read as sentences.** A step that cannot do its job explains what it
  was trying to do and why it could not, rather than surfacing a raw stack
  trace.

## Per-step pages

Older per-step pages, kept for the links that point at them:

- [Given I am on homepage](step-definitions/given-i-am-homepage.md)
- [Given I am on "specific" page](step-definitions/given-i-am-specific-page.md)
- [Given I am an anonymous user](step-definitions/given-i-am-anonymous-user.md)
- [When I go to the homepage](step-definitions/when-i-go-homepage.md)
- [When I go to "specific page"](step-definitions/when-i-go-specific-page.md)
- [When I reload the page](step-definitions/when-i-reload-page.md)
- [When I move backward one page](step-definitions/when-i-move-backward-one-page.md)
- [When I move forward one page](step-definitions/when-i-move-forward-one-page.md)
- [When I fill in](step-definitions/when-i-fill.md)
- [When I press "button"](step-definitions/when-i-press-button.md)
- [When I click "link"](step-definitions/when-i-click-link.md)
- [When I check "checkbox"](step-definitions/when-i-check-checkbox.md)
- [When I uncheck "checkbox"](step-definitions/when-i-uncheck-checkbox.md)
- [When I select "option" from "select list"](step-definitions/when-i-select-option-select-list.md)
- [When I select radio button "value"](step-definitions/when-i-select-radio-button-value.md)
- [When I click "operation" in "text" row](step-definitions/when-i-click-operation-text-row.md)
- [When I attach the file "file name" to "element"](step-definitions/when-i-attach-file-file-name-element.md)
- [When I scroll](step-definitions/when-i-scroll.md)
- [When I wait](step-definitions/when-i-wait.md)
- [When I wait for AJAX to finish](step-definitions/when-i-wait-ajax-finish.md)
- [Then I should see](step-definitions/then-i-should-see.md)
- [Then I should be](step-definitions/then-i-should-be.md)
- [Then the "item" checkbox](step-definitions/then-item-checkbox.md)
- [Then the item should contain](step-definitions/then-item-should-contain.md)
- [Then the "item" link should contain "url"](step-definitions/then-item-link-should-contain-url.md)
- [Then the "value" radio button is selected](step-definitions/then-value-radio-button-selected.md)
- [Then the radio button "value" should be selected](step-definitions/then-radio-button-value-should-be-selected.md)
- [Then the response status code should be {number}](step-definitions/then-response-status-code-should-be-number.md)
