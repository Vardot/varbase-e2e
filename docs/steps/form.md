# Forms steps

13 steps, defined in `tests/step-definitions/form.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I fill in "Username" with "John Smith"` |
| 2 | `When I fill in "#uname" with "John Smith" by attr` |
| 3 | `When I fill in "Username" with:` |
| 4 | `When I fill in "#uname" with: by attr` |
| 5 | `When I fill in "jon-smith" for "Username"` |
| 6 | `When I fill in "John Smith" for "#uname" by attr` |
| 7 | `When I fill in the following:` |
| 8 | `When I fill in the following: by attr` |
| 9 | `When I select "Mercedes" from "Cars"` |
| 10 | `When I additionally select "Red" from "Colors"` |
| 11 | `When I check "Remember me"` |
| 12 | `When I uncheck "Remember me"` |
| 13 | `When I select radio button "Male"` |

---

## 1. When I fill in "Username" with "John Smith"

Fill an input field located by its label, placeholder, or name.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in "([^"]*)?" with "([^"]*)?"$/
```

**Examples**

```gherkin
When I fill in "Username" with "John Smith"
When I fill in "Email" with "jon@example.com"
And we fill in "Organization" with "Vardot"
And I fill in "Password" with "1234"
```

## 2. When I fill in "#uname" with "John Smith" by attr

Fill an input field located by its attribute.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in "([^"]*)?" with "([^"]*)?" by( its)*(?: "([^"]*)?")* (attribute|attr)$/
```

**Examples**

```gherkin
When I fill in "#uname" with "John Smith" by attr
When I fill in "uname" with "John Smith" by attr
And I fill in "pwordcss" with "1234" by "class" attr
And I fill in "Your full name" with "John Smith" by its "placeholder" attribute
```

## 3. When I fill in "Username" with:

Clear an input field located by its label.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in "([^"]*)?" with:$/
```

**Examples**

```gherkin
When I fill in "Username" with:
And we fill in "Email" with:
And I fill in "Password" with:
```

## 4. When I fill in "#uname" with: by attr

Clear an input field located by its attribute.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in "([^"]*)?" with: by( its)*(?: "([^"]*)?")* (attribute|attr)$/
```

**Examples**

```gherkin
When I fill in "#uname" with: by attr
When I fill in "uname" with: by attr
And I fill in "pwordcss" with: by "class" attr
And I fill in "Your full name" with: by its "placeholder" attribute
```

## 5. When I fill in "jon-smith" for "Username"

Fill an input field located by label (reverse syntax).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in "([^"]*)?" for "([^"]*)?"$/
```

**Examples**

```gherkin
When I fill in "jon-smith" for "Username"
When we fill in "Testing" for "Organization options"
And I fill in "1234" for "Password"
```

## 6. When I fill in "John Smith" for "#uname" by attr

Fill an input field located by attribute (reverse syntax).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in "([^"]*)?" for "([^"]*)?" by( its)*(?: "([^"]*)?")* (attribute|attr)$/
```

**Examples**

```gherkin
When I fill in "John Smith" for "#uname" by attr
When I fill in "John Smith" for "uname" by attr
And I fill in "1234" for "password" by "class" attr
And I fill in "John Smith" for "Your full name" by its "placeholder" attribute
```

## 7. When I fill in the following:

Fills multiple form fields from a data table, located by their labels.

Each row is `| label | value |`. Labels resolve via `<label for=...>`,
`placeholder`, or `[name]` — whichever matches first.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in( the)* following:$/
```

**Examples**

```gherkin
When I fill in the following:
  | Username | vardot       |
  | Password | s3cret          |
When we fill in the following:
  | Email        | jon@example.com  |
  | Organization | Vardot       |
And I fill in the following:
  | First name | Alice         |
  | Last name  | Smith         |
  | Country    | Jordan        |
When I fill in the following:
  | Subject  | Bug report                  |
  | Message  | The submit button is hidden |
When I fill in the following:
  | Card number | 4242 4242 4242 4242 |
  | Expiry      | 12/30               |
  | CVV         | 123                 |
```

## 8. When I fill in the following: by attr

Fills multiple form fields from a data table, located by attribute.

Without an explicit attribute, each key is matched against id / class /
name / data-testid / data-test-id / data-test / data-cy / aria-label /
value / placeholder / title.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in( the)* following: by( its)*(?: "([^"]*)?")* (attribute|attr)$/
```

**Examples**

```gherkin
When I fill in the following: by attr
  | #uname     | John Smith        |
  | password   | s3cret            |
When I fill in the following: by its "placeholder" attribute
  | Your full name | John Smith    |
  | Your Password  | s3cret        |
When I fill in the following: by attribute
  | [data-testid=email]    | a@b.c   |
  | [data-testid=username] | alice   |
When we fill in the following: by attr
  | first-name | Alice  |
  | last-name  | Smith  |
When I fill in the following: by its "name" attribute
  | card_number | 4242 4242 4242 4242 |
  | exp_date    | 12/30               |
```

## 9. When I select "Mercedes" from "Cars"

Select an option from a dropdown by label, id, class, or name.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*select "([^"]*)?" from "([^"]*)?"$/
```

**Examples**

```gherkin
When I select "Mercedes" from "Cars"
When I select "saab" from "#cars"
When I select "Mercedes" from "cars"
And we select "English" from "Language"
```

## 10. When I additionally select "Red" from "Colors"

Add an option to a <select multiple> without clearing the existing selection.
Resolves the select by label, then by [name]/#id fallback.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*additionally select "([^"]*)" from "([^"]*)"$/
```

**Examples**

```gherkin
When I additionally select "Red" from "Colors"
When I additionally select "Blue" from "Colors"
When we additionally select "Green" from "Colors"
And additionally select "Yellow" from "Colors"
When I additionally select "Admin" from "Roles"
When we additionally select "Editor" from "Roles"
When I additionally select "Viewer" from "Roles"
And I additionally select "EN" from "Languages"
When I additionally select "FR" from "Languages"
When we additionally select "ES" from "Languages"

Advanced:
Build a full multi-selection in sequence:
  When I select "Red" from "Colors"
  And  I additionally select "Blue" from "Colors"
  And  I additionally select "Green" from "Colors"
Works against a [name] select:
  When I additionally select "tag-a" from "tags"
  And  I additionally select "tag-b" from "tags"
Confirm the select stays multi-valued after adds:
  When I select "One" from "Items"
  And  I additionally select "Two" from "Items"
```

## 11. When I check "Remember me"

Checks the specified checkbox by label, id, class, or name.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*check "([^"]*)?"$/
```

**Examples**

```gherkin
When I check "Remember me"
When we check "Put site into maintenance mode"
And I check "#newsletter"
And we check ".terms-and-conditions"
```

## 12. When I uncheck "Remember me"

Unchecks the specified checkbox by label, id, class, or name.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*uncheck "([^"]*)?"$/
```

**Examples**

```gherkin
When I uncheck "Remember me"
When we uncheck "Put site into maintenance mode"
And I uncheck "#newsletter"
And we uncheck ".terms-and-conditions"
```

## 13. When I select radio button "Male"

Selects a radio button by label, value, id, or class.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*select radio button "([^"]*)?"$/
```

**Examples**

```gherkin
When I select radio button "Male"
When I select radio button "female"
When I select radio button "#gender-male"
When we select radio button "option1"
```
