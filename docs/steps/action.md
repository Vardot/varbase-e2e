# Actions steps

7 steps, defined in `tests/step-definitions/action.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I press "Log In"` |
| 2 | `When I press "btn-pressid" by attr` |
| 3 | `When I click "Contact Us"` |
| 4 | `When I click "#about-us-id" by attr` |
| 5 | `When I click "Edit" in the "John Smith" row` |
| 6 | `When I follow "Contact Us"` |
| 7 | `When I attach the file "profile-icon.jpg" to "#profile-icon-upload"` |

---

## 1. When I press "Log In"

Press a button, submit input, or link by its visible text.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*press( the)* "([^"]*)?"( button)*$/
```

**Examples**

```gherkin
When I press "Log In"
And I press the "Log In" button
And I press the "Save as" button
When we press "Submit"
And press "Cancel"
```

## 2. When I press "btn-pressid" by attr

Press a button by its attribute (id, class, name, placeholder, data-*).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*press "([^"]*)?" by( its)*(?: "([^"]*)?")* (attribute|attr)$/
```

**Examples**

```gherkin
When I press "btn-pressid" by attr
When I press "btn-pressid" by attribute
And I press "Your full name" by "placeholder" attribute
And I press "Your full name" by its "placeholder" attribute
And I press "save-name" by "data-selector" attr
```

## 3. When I click "Contact Us"

Click a link or button by its visible text.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*click "([^"]*)?"$/
```

**Examples**

```gherkin
When I click "Contact Us"
And I click "aboutUs"
When we click "Read more"
And click "Home"
```

## 4. When I click "#about-us-id" by attr

Click a link or button by its attribute (id, class, name, data-*).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*click "([^"]*)?" by( its)*(?: "([^"]*)?")* (attribute|attr)$/
```

**Examples**

```gherkin
When I click "#about-us-id" by attr
When I click "data-selector-about" by attribute
And I click "about-us-css" by "class" attr
And I click "about-us-id" by its "id" attribute
```

## 5. When I click "Edit" in the "John Smith" row

Click a clickable element inside a table row identified by text.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*click "([^"]*)?" in( the)* "([^"]*)?" row$/
```

**Examples**

```gherkin
When I click "Edit" in the "John Smith" row
When I click "Delete" in the "Product A" row
When we click "View Details" in the "Order #12345" row
And I click "Download" in the "Report 2024" row
```

## 6. When I follow "Contact Us"

Follow a link by its visible text.
Uses Playwright's accessibility-first `getByRole('link', { name })` with a
text-match fallback.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*follow "([^"]*)"$/
```

**Examples**

```gherkin
When I follow "Contact Us"
When I follow "About"
When we follow "Home"
And follow "Read more"
When I follow "Documentation"
When we follow "Sign in"
When I follow "Log out"
When I follow "Download report"
And I follow "Previous"
When I follow "Next"
```

## 7. When I attach the file "profile-icon.jpg" to "#profile-icon-upload"

Attach a file from tests/assets/ to a file input.

The file path is resolved against `this.assetsFolder` (default
`tests/assets/`). The target selector must address an `<input type="file">`.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*attach( the)* file "([^"]*)?" to "([^"]*)?"$/
```

**Examples**

```gherkin
When I attach the file "profile-icon.jpg" to "#profile-icon-upload"
When we attach file "resume.pdf" to "#resume"
And I attach the file "logo.svg" to "input[name=logo]"
When I attach file "report-2026-q1.csv" to "[data-testid=csv-upload]"
Given I am on "/upload"
  When I attach the file "video.mp4" to "#video-input"
  And I press "Upload"
  Then I should see "Upload complete"
```
