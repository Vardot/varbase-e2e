# Field state steps

27 steps, defined in `tests/step-definitions/field.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then the field "username" should be empty` |
| 2 | `Then the field "username" should not be empty` |
| 3 | `Then the field "username" should exist` |
| 4 | `Then the field "missing-field" should not exist` |
| 5 | `Then the field "username" should have "enabled" state` |
| 6 | `Then the field "username" should be required` |
| 7 | `Then the field "bio" should not be required` |
| 8 | `When I fill in the multi-value field "tags" with the following values:` |
| 9 | `When I fill in the color field "favorite" with the value "#ff0000"` |
| 10 | `Then the color field "favorite" should have the value "#ff0000"` |
| 11 | `When I fill in the WYSIWYG field "body" with the "Hello world"` |
| 12 | `Then the option "Mercedes" should exist within the select element "#cars"` |
| 13 | `Then the option "Manager" should not exist within the select element "#role"` |
| 14 | `Then the option "Mercedes" should be selected within the select element "#cars"` |
| 15 | `Then the option "Admin" should not be selected within the select element "#role"` |
| 16 | `When I unselect "Red" from "#colors"` |
| 17 | `When I clear the select "#colors"` |
| 18 | `When I check the checkbox "#agree"` |
| 19 | `When I uncheck the checkbox "#newsletter"` |
| 20 | `When I choose the radio button "#gender-male"` |
| 21 | `When I fill in the field "#username" with "alice"` |
| 22 | `Given browser validation for the form "#signup" is disabled` |
| 23 | `When I fill in the datetime field "Start" with date "2026-05-08" and time "10:00"` |
| 24 | `When I fill in the date part of the datetime field "Start" with "2026-05-08"` |
| 25 | `When I fill in the time part of the datetime field "Start" with "10:00"` |
| 26 | `When I fill in the start datetime field "Event" with date "2026-05-08" and time "10:00"` |
| 27 | `When I fill in the end datetime field "Event" with date "2026-05-09" and time "18:00"` |

---

## 1. Then the field "username" should be empty

Assert a field's current value is the empty string.

**Keyword**: `Then`

**Pattern**

```js
'the field {string} should be empty'
```

**Examples**

```gherkin
Then the field "username" should be empty
Then the field "Email" should be empty
And the field "#search" should be empty
Then the field "[name=phone]" should be empty
When I fill in "" for "Username"
  Then the field "username" should be empty
```

## 2. Then the field "username" should not be empty

Assert a field has a non-empty value.

**Keyword**: `Then`

**Pattern**

```js
'the field {string} should not be empty'
```

**Examples**

```gherkin
Then the field "username" should not be empty
Then the field "Email" should not be empty
And the field "#search" should not be empty
When I fill in "alice" for "Username"
  Then the field "username" should not be empty
Then the field "[name=phone]" should not be empty
```

## 3. Then the field "username" should exist

Assert a field exists in the DOM (any state).

**Keyword**: `Then`

**Pattern**

```js
'the field {string} should exist'
```

**Examples**

```gherkin
Then the field "username" should exist
Then the field "Email" should exist
And the field "#search" should exist
Then the field "Password" should exist
Then the field "[name=phone]" should exist
```

## 4. Then the field "missing-field" should not exist

Assert a field does NOT exist in the DOM.

**Keyword**: `Then`

**Pattern**

```js
'the field {string} should not exist'
```

**Examples**

```gherkin
Then the field "missing-field" should not exist
Then the field "Legacy field" should not exist
And the field "#deprecated" should not exist
Then the field "Old name" should not exist
Then the field "[name=internal_only]" should not exist
```

## 5. Then the field "username" should have "enabled" state

Assert a field's enabled / disabled state.

**Keyword**: `Then`

**Pattern**

```js
'the field {string} should have {string} state'
```

**Examples**

```gherkin
Then the field "username" should have "enabled" state
Then the field "Email" should have "disabled" state
And the field "#search" should have "enabled" state
Then the field "Password" should have "disabled" state
Then the field "Country" should have "enabled" state
```

## 6. Then the field "username" should be required

Assert a field has the `required` or `aria-required="true"` attribute.

**Keyword**: `Then`

**Pattern**

```js
'the field {string} should be required'
```

**Examples**

```gherkin
Then the field "username" should be required
Then the field "Email" should be required
And the field "Password" should be required
Then the field "Country" should be required
Then the field "Card number" should be required
```

## 7. Then the field "bio" should not be required

Assert a field is NOT required.

**Keyword**: `Then`

**Pattern**

```js
'the field {string} should not be required'
```

**Examples**

```gherkin
Then the field "bio" should not be required
Then the field "Nickname" should not be required
And the field "Phone" should not be required
Then the field "Comments" should not be required
Then the field "Twitter handle" should not be required
```

## 8. When I fill in the multi-value field "tags" with the following values:

Fill a multi-value form field (e.g. `name[]` array inputs) from a table.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in the multi-value field "([^"]*)" with the following values:$/
```

**Examples**

```gherkin
When I fill in the multi-value field "tags" with the following values:
  | bdd     |
  | testing |
When I fill in the multi-value field "skills" with the following values:
  | js  |
  | css |
  | sql |
And we fill in the multi-value field "phones" with the following values:
  | 0790000000 |
  | 0791111111 |
When I fill in the multi-value field "ids" with the following values:
  | 1 |
  | 2 |
When I fill in the multi-value field "categories" with the following values:
  | tech    |
  | devops  |
  | testing |
```

## 9. When I fill in the color field "favorite" with the value "#ff0000"

Fill an `<input type="color">` field with a hex value.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in the color field "([^"]*)" with the value "([^"]*)"$/
```

**Examples**

```gherkin
When I fill in the color field "favorite" with the value "#ff0000"
When I fill in the color field "primary" with the value "#0066cc"
And we fill in the color field "Accent" with the value "#00aa66"
When I fill in the color field "#bg-color" with the value "#000000"
When I fill in the color field "Theme" with the value "#ffaa00"
```

## 10. Then the color field "favorite" should have the value "#ff0000"

Assert an `<input type="color">` field's current value (case-insensitive).

**Keyword**: `Then`

**Pattern**

```js
'the color field {string} should have the value {string}'
```

**Examples**

```gherkin
Then the color field "favorite" should have the value "#ff0000"
Then the color field "primary" should have the value "#0066cc"
And the color field "Accent" should have the value "#00aa66"
Then the color field "#bg-color" should have the value "#000000"
Then the color field "Theme" should have the value "#ffaa00"
```

## 11. When I fill in the WYSIWYG field "body" with the "Hello world"

Fill a CKEditor / contenteditable rich-text field with HTML.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in the WYSIWYG field "([^"]*)" with the "([^"]*)"$/
```

**Examples**

```gherkin
When I fill in the WYSIWYG field "body" with the "Hello world"
When I fill in the WYSIWYG field "Description" with the "<strong>Bold</strong>"
And we fill in the WYSIWYG field "content" with the "Plain paragraph"
When I fill in the WYSIWYG field "post" with the "Multi line\ntext"
When I fill in the WYSIWYG field "Notes" with the "Final notes here"
```

## 12. Then the option "Mercedes" should exist within the select element "#cars"

Assert a `<select>` contains an option with the given visible text.

**Keyword**: `Then`

**Pattern**

```js
'the option {string} should exist within the select element {string}'
```

**Examples**

```gherkin
Then the option "Mercedes" should exist within the select element "#cars"
Then the option "Editor" should exist within the select element "select[name=role]"
And the option "English" should exist within the select element "#language"
Then the option "Premium" should exist within the select element "#plan"
Then the option "Jordan" should exist within the select element "#country"
```

## 13. Then the option "Manager" should not exist within the select element "#role"

Assert a `<select>` does NOT contain an option with the given text.

**Keyword**: `Then`

**Pattern**

```js
'the option {string} should not exist within the select element {string}'
```

**Examples**

```gherkin
Then the option "Manager" should not exist within the select element "#role"
Then the option "Trial" should not exist within the select element "#plan"
And the option "Old country" should not exist within the select element "#country"
Then the option "Hidden" should not exist within the select element "#status"
Then the option "Legacy" should not exist within the select element "#mode"
```

## 14. Then the option "Mercedes" should be selected within the select element "#cars"

Assert an option is currently selected in a `<select>`.

**Keyword**: `Then`

**Pattern**

```js
'the option {string} should be selected within the select element {string}'
```

**Examples**

```gherkin
Then the option "Mercedes" should be selected within the select element "#cars"
Then the option "Editor" should be selected within the select element "#role"
And the option "English" should be selected within the select element "#language"
Then the option "Premium" should be selected within the select element "#plan"
Then the option "Jordan" should be selected within the select element "#country"
```

## 15. Then the option "Admin" should not be selected within the select element "#role"

Assert an option is NOT currently selected in a `<select>`.

**Keyword**: `Then`

**Pattern**

```js
'the option {string} should not be selected within the select element {string}'
```

**Examples**

```gherkin
Then the option "Admin" should not be selected within the select element "#role"
Then the option "Pro" should not be selected within the select element "#plan"
And the option "Other" should not be selected within the select element "#country"
Then the option "Inactive" should not be selected within the select element "#status"
Then the option "Trial" should not be selected within the select element "#mode"
```

## 16. When I unselect "Red" from "#colors"

Unselect a single option from a `<select multiple>`.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*unselect "([^"]*)" from "([^"]*)"$/
```

**Examples**

```gherkin
When I unselect "Red" from "#colors"
When I unselect "Editor" from "#role"
And we unselect "tag-a" from "select[name=tags]"
When I unselect "EN" from "#languages"
When I unselect "Beta" from "#features"
```

## 17. When I clear the select "#colors"

Clear all selections in a `<select multiple>`.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*clear the select "([^"]*)"$/
```

**Examples**

```gherkin
When I clear the select "#colors"
When I clear the select "#tags"
And I clear the select "select[name=roles]"
When I clear the select "#languages"
When I clear the select "#features"
```

## 18. When I check the checkbox "#agree"

Check a CSS-addressed checkbox.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*check the checkbox "([^"]*)"$/
```

**Examples**

```gherkin
When I check the checkbox "#agree"
When I check the checkbox "input[name=newsletter]"
And we check the checkbox ".terms"
When I check the checkbox "#remember-me"
When I check the checkbox "[data-testid=privacy-checkbox]"
```

## 19. When I uncheck the checkbox "#newsletter"

Uncheck a CSS-addressed checkbox.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*uncheck the checkbox "([^"]*)"$/
```

**Examples**

```gherkin
When I uncheck the checkbox "#newsletter"
When I uncheck the checkbox "input[name=marketing]"
And we uncheck the checkbox ".analytics-opt-in"
When I uncheck the checkbox "#remember-me"
When I uncheck the checkbox "[data-testid=privacy-checkbox]"
```

## 20. When I choose the radio button "#gender-male"

Select a CSS-addressed radio button.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*choose the radio button "([^"]*)"$/
```

**Examples**

```gherkin
When I choose the radio button "#gender-male"
When I choose the radio button "input[value=premium]"
And we choose the radio button ".plan-monthly"
When I choose the radio button "#yes"
When I choose the radio button "[data-testid=annual]"
```

## 21. When I fill in the field "#username" with "alice"

Fill a CSS-addressed input/textarea with a value.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in the field "([^"]*)" with "([^"]*)"$/
```

**Examples**

```gherkin
When I fill in the field "#username" with "alice"
When I fill in the field "input[name=email]" with "alice@example.com"
And we fill in the field "#search" with "laptops"
When I fill in the field "[data-testid=phone]" with "0790000000"
When I fill in the field "textarea#message" with "Hello"
```

## 22. Given browser validation for the form "#signup" is disabled

Disable native browser validation on a form (sets `novalidate`).

Useful when a test needs to submit an intentionally invalid form to
exercise server-side error rendering.

**Keyword**: `Given`

**Pattern**

```js
'browser validation for the form {string} is disabled'
```

**Examples**

```gherkin
Given browser validation for the form "#signup" is disabled
Given browser validation for the form "form[name=login]" is disabled
And browser validation for the form ".checkout-form" is disabled
Given browser validation for the form "#contact" is disabled
Given browser validation for the form "[data-testid=newsletter]" is disabled
```

## 23. When I fill in the datetime field "Start" with date "2026-05-08" and time "10:00"

Fill paired `<input type=date>` + `<input type=time>` controls for a label.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in the datetime field "([^"]*)" with date "([^"]*)" and time "([^"]*)"$/
```

**Examples**

```gherkin
When I fill in the datetime field "Start" with date "2026-05-08" and time "10:00"
When I fill in the datetime field "Departure" with date "2026-12-31" and time "23:59"
And we fill in the datetime field "Pickup" with date "2026-07-04" and time "08:30"
When I fill in the datetime field "Booking" with date "2026-01-01" and time "00:00"
When I fill in the datetime field "Reminder" with date "2026-09-15" and time "14:00"
```

## 24. When I fill in the date part of the datetime field "Start" with "2026-05-08"

Fill only the date component of a paired datetime field.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in the date part of the datetime field "([^"]*)" with "([^"]*)"$/
```

**Examples**

```gherkin
When I fill in the date part of the datetime field "Start" with "2026-05-08"
When I fill in the date part of the datetime field "Birth date" with "1990-01-15"
And we fill in the date part of the datetime field "Booking" with "2026-12-31"
When I fill in the date part of the datetime field "Pickup" with "2026-07-04"
When I fill in the date part of the datetime field "Reminder" with "2026-09-15"
```

## 25. When I fill in the time part of the datetime field "Start" with "10:00"

Fill only the time component of a paired datetime field.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in the time part of the datetime field "([^"]*)" with "([^"]*)"$/
```

**Examples**

```gherkin
When I fill in the time part of the datetime field "Start" with "10:00"
When I fill in the time part of the datetime field "Pickup" with "08:30"
And we fill in the time part of the datetime field "Booking" with "23:59"
When I fill in the time part of the datetime field "Reminder" with "14:00"
When I fill in the time part of the datetime field "Departure" with "06:15"
```

## 26. When I fill in the start datetime field "Event" with date "2026-05-08" and time "10:00"

Fill the `start` half of a date-range pair.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in the start datetime field "([^"]*)" with date "([^"]*)" and time "([^"]*)"$/
```

**Examples**

```gherkin
When I fill in the start datetime field "Event" with date "2026-05-08" and time "10:00"
When I fill in the start datetime field "Trip" with date "2026-12-31" and time "08:00"
And we fill in the start datetime field "Window" with date "2026-07-04" and time "12:00"
When I fill in the start datetime field "Promo" with date "2026-01-01" and time "00:00"
When I fill in the start datetime field "Booking" with date "2026-09-15" and time "14:00"
```

## 27. When I fill in the end datetime field "Event" with date "2026-05-09" and time "18:00"

Fill the `end` half of a date-range pair.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in the end datetime field "([^"]*)" with date "([^"]*)" and time "([^"]*)"$/
```

**Examples**

```gherkin
When I fill in the end datetime field "Event" with date "2026-05-09" and time "18:00"
When I fill in the end datetime field "Trip" with date "2027-01-07" and time "20:00"
And we fill in the end datetime field "Window" with date "2026-07-04" and time "18:00"
When I fill in the end datetime field "Promo" with date "2026-01-31" and time "23:59"
When I fill in the end datetime field "Booking" with date "2026-09-15" and time "16:00"
```
