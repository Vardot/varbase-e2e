# Web-first Assertions

A "web-first" assertion is an auto-retrying matcher: it polls the page until the condition holds or a budget elapses, instead of taking a single snapshot. Varbase E2E exposes a thin BDD wrapper over Playwright's locator state-checks so feature files never need explicit waits between an action and its assertion.

## Default timeout

Every web-first step has a 5-second budget. Override per step with the trailing `within N seconds` clause:

```gherkin
Then "#dashboard" should be visible
Then "#dashboard" should be visible within 12 seconds
```

## State matchers

```gherkin
Then "<sel>" should be visible
Then "<sel>" should be hidden
Then "<sel>" should be attached
Then "<sel>" should be focused
Then "<sel>" should be enabled
Then "<sel>" should be disabled
Then "<sel>" should be editable
```

Negated form:

```gherkin
Then "<sel>" should not be visible
Then "<sel>" should not be focused
```

## Viewport

```gherkin
Then "<sel>" should be in the viewport
Then "<sel>" should not be in the viewport within 3 seconds
```

## Count

```gherkin
Then "<sel>" should have a count of 5
Then "<sel>" should have a count of 0 within 10 seconds
```

## Text / value

```gherkin
Then "<sel>" should have text "Total: $99.00"
Then "<sel>" should contain text "$99"
Then "<sel>" should have value "alice@example.com"
```

## Attributes / classes

```gherkin
Then "<sel>" should have attribute "data-state" with value "open"
Then "<sel>" should have class "is-active"
```

## Images that actually decoded

An `<img>` can carry every expected class and attribute while its bitmap never
decodes — a responsive-image placeholder that never swaps its `src`, or a
derivative the server failed to generate. Attribute assertions pass on both.
This one polls until at least one match reports `complete` with a non-zero
`naturalWidth`, so a broken image fails red:

```gherkin
Then the image "img.responsive-image" should be loaded
Then the image ".hero img" should be loaded within 20 seconds
Then the image ".field--name-field-media-image img" should be loaded within 15 seconds
```

"At least one" is deliberate: on a page whose carousel keeps some matches in an
inactive slide, lazy loading has not reached them and never will while the slide
is hidden. Scope the selector when you need a specific image.

## Role-based interactions

When you want accessibility-aligned tests, use the role family. These resolve via `page.getByRole(role, { name })` — the same rules screen readers use:

```gherkin
When I click the "Sign in" button
When I click the "Profile" link
When I click the "Notifications" tab
Then the "Save changes" button should be visible
Then the "Privacy" tab should be visible within 3 seconds
```

Supported roles: `button`, `link`, `tab`, `menuitem`, `checkbox`, `radio`, `option`.

## Why prefer web-first

A boolean check + sleep is brittle:

```gherkin
# BAD — sleep then check; fails if the server is 1ms slower than expected.
When I press "Save"
And I wait 2 seconds
Then "<sel>" should be visible

# GOOD — wait IS the assertion; passes the moment the element appears.
When I press "Save"
Then "<sel>" should be visible within 5 seconds
```

The web-first wrapper is also strictly faster on the happy path: it returns the instant the matcher passes, instead of always sleeping the full configured duration.
