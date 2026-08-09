# Element interactions steps

19 steps, defined in `tests/step-definitions/element.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then the element "#footer" should appear after the element "#main"` |
| 2 | `Then the text "Sign in" should appear after the text "Welcome"` |
| 3 | `Then the element "a" with the attribute "href" and the value "/about" should exist` |
| 4 | `Then the element "a" with the attribute "href" and the value containing "/about" should exist` |
| 5 | `Then the element "a" with the attribute "href" and the value "/admin" should not exist` |
| 6 | `Then the element "a" with the attribute "href" and the value containing "/old" should not exist` |
| 7 | `Then the element "#header" should be at the top of the viewport` |
| 8 | `Then the element ".hero" should be centered in the viewport` |
| 9 | `When I click on the element "#sign-in"` |
| 10 | `When I trigger the JS event "click" on the element "#cta"` |
| 11 | `When I scroll to the element "#footer"` |
| 12 | `When I hover over the element ".tooltip-trigger"` |
| 13 | `When I focus on the element "#email"` |
| 14 | `Then the element "#dashboard" should be displayed` |
| 15 | `Then the element "#loading-spinner" should not be displayed` |
| 16 | `Then the element "#hero" should be displayed within a viewport` |
| 17 | `Then the element "#hero" should be displayed within a viewport with a top offset of 60 pixels` |
| 18 | `Then the element "#footer" should not be displayed within a viewport with a top offset of 60 pixels` |
| 19 | `Then the element "#footer" should not be displayed within a viewport` |

---

## 1. Then the element "#footer" should appear after the element "#main"

Assert element A is positioned vertically below element B (greater Y).

**Keyword**: `Then`

**Pattern**

```js
'the element {string} should appear after the element {string}'
```

**Examples**

```gherkin
Then the element "#footer" should appear after the element "#main"
Then the element ".checkout" should appear after the element ".cart"
And the element "#summary" should appear after the element "#details"
Then the element "h2" should appear after the element "h1"
Then the element "[data-testid=cta]" should appear after the element ".hero"
```

## 2. Then the text "Sign in" should appear after the text "Welcome"

Assert text A appears after text B in the document body's text order.

**Keyword**: `Then`

**Pattern**

```js
'the text {string} should appear after the text {string}'
```

**Examples**

```gherkin
Then the text "Sign in" should appear after the text "Welcome"
Then the text "Total" should appear after the text "Subtotal"
And the text "Footer" should appear after the text "Header"
Then the text "Privacy" should appear after the text "Terms"
Then the text "Step 3" should appear after the text "Step 2"
```

## 3. Then the element "a" with the attribute "href" and the value "/about" should exist

Assert at least one element matching `<selector>[<attr>="<value>"]` exists.

**Keyword**: `Then`

**Pattern**

```js
'the element {string} with the attribute {string} and the value {string} should exist'
```

**Examples**

```gherkin
Then the element "a" with the attribute "href" and the value "/about" should exist
Then the element "input" with the attribute "name" and the value "email" should exist
And the element "button" with the attribute "type" and the value "submit" should exist
Then the element "div" with the attribute "data-testid" and the value "user-list" should exist
Then the element "img" with the attribute "alt" and the value "Logo" should exist
```

## 4. Then the element "a" with the attribute "href" and the value containing "/about" should exist

Assert at least one element with attribute value containing a substring exists.

**Keyword**: `Then`

**Pattern**

```js
'the element {string} with the attribute {string} and the value containing {string} should exist'
```

**Examples**

```gherkin
Then the element "a" with the attribute "href" and the value containing "/about" should exist
Then the element "input" with the attribute "class" and the value containing "is-valid" should exist
And the element "button" with the attribute "data-testid" and the value containing "cta" should exist
Then the element "img" with the attribute "src" and the value containing ".png" should exist
Then the element "div" with the attribute "aria-label" and the value containing "card" should exist
```

## 5. Then the element "a" with the attribute "href" and the value "/admin" should not exist

Assert NO element matches `<selector>[<attr>="<value>"]`.

**Keyword**: `Then`

**Pattern**

```js
'the element {string} with the attribute {string} and the value {string} should not exist'
```

**Examples**

```gherkin
Then the element "a" with the attribute "href" and the value "/admin" should not exist
Then the element "input" with the attribute "type" and the value "hidden" should not exist
And the element "button" with the attribute "disabled" and the value "true" should not exist
Then the element "div" with the attribute "data-testid" and the value "error" should not exist
Then the element "img" with the attribute "alt" and the value "" should not exist
```

## 6. Then the element "a" with the attribute "href" and the value containing "/old" should not exist

Assert NO element has attribute value containing a substring.

**Keyword**: `Then`

**Pattern**

```js
'the element {string} with the attribute {string} and the value containing {string} should not exist'
```

**Examples**

```gherkin
Then the element "a" with the attribute "href" and the value containing "/old" should not exist
Then the element "div" with the attribute "class" and the value containing "is-error" should not exist
And the element "button" with the attribute "data-testid" and the value containing "deprecated" should not exist
Then the element "img" with the attribute "src" and the value containing "tracking" should not exist
Then the element "input" with the attribute "name" and the value containing "_legacy" should not exist
```

## 7. Then the element "#header" should be at the top of the viewport

Assert an element is positioned within the top 100 px of the viewport.

**Keyword**: `Then`

**Pattern**

```js
'the element {string} should be at the top of the viewport'
```

**Examples**

```gherkin
Then the element "#header" should be at the top of the viewport
Then the element "h1" should be at the top of the viewport
And the element ".sticky-nav" should be at the top of the viewport
When I scroll to the top
  Then the element "#hero" should be at the top of the viewport
Then the element "[role=banner]" should be at the top of the viewport
```

## 8. Then the element ".hero" should be centered in the viewport

Assert an element is horizontally centered in the viewport (±10% tolerance).

**Keyword**: `Then`

**Pattern**

```js
'the element {string} should be centered in the viewport'
```

**Examples**

```gherkin
Then the element ".hero" should be centered in the viewport
Then the element "#cta" should be centered in the viewport
And the element ".modal-dialog" should be centered in the viewport
Then the element "h1" should be centered in the viewport
Then the element ".loader" should be centered in the viewport
```

## 9. When I click on the element "#sign-in"

Click an element addressed by CSS selector.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*click on the element "([^"]*)"$/
```

**Examples**

```gherkin
When I click on the element "#sign-in"
When I click on the element ".btn-primary"
And we click on the element "[data-testid=cta]"
When I click on the element "li.nav-item:first-child a"
When I click on the element "button[aria-label='Close']"
```

## 10. When I trigger the JS event "click" on the element "#cta"

Dispatch a synthetic JavaScript event on a CSS-addressed element.

Useful for components that listen for non-bubbling events or for events
Playwright cannot synthesize through normal interactions.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*trigger the JS event "([^"]*)" on the element "([^"]*)"$/
```

**Examples**

```gherkin
When I trigger the JS event "click" on the element "#cta"
When I trigger the JS event "change" on the element "#country"
And I trigger the JS event "input" on the element "#search"
When I trigger the JS event "focus" on the element "#email"
When I trigger the JS event "blur" on the element "#name"
```

## 11. When I scroll to the element "#footer"

Scroll a CSS-addressed element into view (uses Playwright's auto-scroll).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*scroll to the element "([^"]*)"$/
```

**Examples**

```gherkin
When I scroll to the element "#footer"
When I scroll to the element ".pricing-table"
And we scroll to the element "[data-testid=signup-cta]"
When I scroll to the element "tbody tr:nth-child(20)"
When I scroll to the element ".testimonial:last-child"
```

## 12. When I hover over the element ".tooltip-trigger"

Hover the mouse pointer over a CSS-addressed element.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*hover over the element "([^"]*)"$/
```

**Examples**

```gherkin
When I hover over the element ".tooltip-trigger"
When I hover over the element "#user-menu"
And we hover over the element "[data-testid=avatar]"
When I hover over the element "img.preview"
When I hover over the element "li.menu-item"
```

## 13. When I focus on the element "#email"

Move keyboard focus to a CSS-addressed element.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*focus on the element "([^"]*)"$/
```

**Examples**

```gherkin
When I focus on the element "#email"
When I focus on the element "input[type=search]"
And we focus on the element "[data-testid=combobox]"
When I focus on the element "textarea#message"
When I focus on the element "button.primary"
```

## 14. Then the element "#dashboard" should be displayed

Wait for a CSS-addressed element to become visible (display !== none, etc.).

**Keyword**: `Then`

**Pattern**

```js
'the element {string} should be displayed'
```

**Examples**

```gherkin
Then the element "#dashboard" should be displayed
Then the element ".success-banner" should be displayed
And the element "[data-testid=user-list]" should be displayed
Then the element ".toast" should be displayed
When I press "Save"
  Then the element ".toast-success" should be displayed
```

## 15. Then the element "#loading-spinner" should not be displayed

Assert a CSS-addressed element is hidden or absent.

**Keyword**: `Then`

**Pattern**

```js
'the element {string} should not be displayed'
```

**Examples**

```gherkin
Then the element "#loading-spinner" should not be displayed
Then the element ".error-banner" should not be displayed
And the element "[data-testid=skeleton]" should not be displayed
Then the element ".modal" should not be displayed
When I press "Submit"
  Then the element ".pending-badge" should not be displayed
```

## 16. Then the element "#hero" should be displayed within a viewport

Assert an element is fully inside the current viewport rectangle.

**Keyword**: `Then`

**Pattern**

```js
'the element {string} should be displayed within a viewport'
```

**Examples**

```gherkin
Then the element "#hero" should be displayed within a viewport
Then the element ".cta" should be displayed within a viewport
And the element "[data-testid=summary]" should be displayed within a viewport
Then the element "h1" should be displayed within a viewport
When I scroll to the element "#footer"
  Then the element "#footer" should be displayed within a viewport
```

## 17. Then the element "#hero" should be displayed within a viewport with a top offset of 60 pixels

Assert an element is fully inside the viewport, allowing a top offset.
Useful for sticky headers — pass the header height as the offset.

**Keyword**: `Then`

**Pattern**

```js
'the element {string} should be displayed within a viewport with a top offset of {int} pixels'
```

**Examples**

```gherkin
Then the element "#hero" should be displayed within a viewport with a top offset of 60 pixels
Then the element ".main" should be displayed within a viewport with a top offset of 80 pixels
And the element ".cta" should be displayed within a viewport with a top offset of 50 pixels
Then the element "h1" should be displayed within a viewport with a top offset of 100 pixels
Then the element "#summary" should be displayed within a viewport with a top offset of 64 pixels
```

## 18. Then the element "#footer" should not be displayed within a viewport with a top offset of 60 pixels

Assert an element is NOT inside the viewport (top-offset variant).

**Keyword**: `Then`

**Pattern**

```js
'the element {string} should not be displayed within a viewport with a top offset of {int} pixels'
```

**Examples**

```gherkin
Then the element "#footer" should not be displayed within a viewport with a top offset of 60 pixels
Then the element ".off-screen" should not be displayed within a viewport with a top offset of 80 pixels
And the element ".pending" should not be displayed within a viewport with a top offset of 50 pixels
Then the element "#cookies-banner" should not be displayed within a viewport with a top offset of 100 pixels
Then the element ".low-priority" should not be displayed within a viewport with a top offset of 64 pixels
```

## 19. Then the element "#footer" should not be displayed within a viewport

Assert an element is NOT inside the viewport rectangle.

**Keyword**: `Then`

**Pattern**

```js
'the element {string} should not be displayed within a viewport'
```

**Examples**

```gherkin
Then the element "#footer" should not be displayed within a viewport
Then the element ".off-screen" should not be displayed within a viewport
And the element ".pending" should not be displayed within a viewport
Then the element "#cookies-banner" should not be displayed within a viewport
Then the element ".low-priority" should not be displayed within a viewport
```
