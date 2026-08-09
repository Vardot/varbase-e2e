# Layout Builder steps

17 steps, defined in `tests/step-definitions/drupal-layout-builder.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I add a basic "4 Cols" section at the end of layout` |
| 2 | `When I save the section` |
| 3 | `When I add section gutters` |
| 4 | `When I select the "Edge to Edge" container type` |
| 5 | `When I select the "md" "33% 67%" section breakpoint` |
| 6 | `When I select the "Primary" section background color` |
| 7 | `When I select the "Dark" section text color` |
| 8 | `When I set the alignment to "End"` |
| 9 | `When I uncheck the Edge to Edge Background` |
| 10 | `And I select "Site branding" from the "Block" dropdown` |
| 11 | `When I check the box "Editor"` |
| 12 | `When I uncheck the box "Editor"` |
| 13 | `When I select the "Male" radio button` |
| 14 | `When I select the radio button "Published"` |
| 15 | `And I expand the field "edit-menu"` |
| 16 | `When I press the confirm button in modal` |
| 17 | `When I click the delete button` |

---

## 1. When I add a basic "4 Cols" section at the end of layout

Add a basic section (with an optional layout, default "1 Col") at the end of
the Layout Builder layout.

Ports VarbaseContext::iAddABasicSectionAtTheEndOfLayout.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*add a basic(?: "([^"]*)")? section at the end of layout$/
```

**Examples**

```gherkin
When I add a basic "4 Cols" section at the end of layout
And I add a basic section at the end of layout
When I add a basic "2 Cols" section at the end of layout
And we add a basic section at the end of layout
When I add a basic "3 Cols" section at the end of layout
```

## 2. When I save the section

Save (add) the currently configured Layout Builder section.

Ports VarbaseContext::iSaveTheSection (clicks the "Add section" submit).

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*save the section$/
```

**Examples**

```gherkin
When I save the section
And I save the section
When we save the section
Given I save the section
And we save the section
```

## 3. When I add section gutters

Add gutters to the section being configured (checks "With Gutters").

Ports VarbaseContext::iAddSectionGutters.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*add section gutters$/
```

**Examples**

```gherkin
When I add section gutters
And I add section gutters
When we add section gutters
Given I add section gutters
And we add section gutters
```

## 4. When I select the "Edge to Edge" container type

Select a section container type (and optional Boxed width).

Ports VarbaseContext::iSelectTheContainerType / iSelectTheContainerWidth.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*select the "([^"]*)" container type(?: with a "([^"]*)" width)?$/
```

**Examples**

```gherkin
When I select the "Edge to Edge" container type
And I select the "Boxed" container type with a "Tiny" width
When I select the "Full" container type
And I select the "Boxed" container type with a "Narrow" width
When we select the "Edge to Edge" container type
```

## 5. When I select the "md" "33% 67%" section breakpoint

Select a section breakpoint column ratio for a given screen size.

Ports VarbaseContext::iSelectTheSectionBreakpoint.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*select the "([^"]*)" "([^"]*)" section breakpoint$/
```

**Examples**

```gherkin
When I select the "md" "33% 67%" section breakpoint
And I select the "xs" "75% 25%" section breakpoint
When I select the "lg" "50% 50%" section breakpoint
And I select the "sm" "100%" section breakpoint
When we select the "md" "67% 33%" section breakpoint
```

## 6. When I select the "Primary" section background color

Select a section background color.

Ports VarbaseContext::iSelectTheSectionBackgroundColor (opens Background,
switches to the color tab, clicks the color label).

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*select the "([^"]*)" section background color$/
```

**Examples**

```gherkin
When I select the "Primary" section background color
And I select the "Light" section background color
When I select the "Dark" section background color
And we select the "Info" section background color
When I select the "White" section background color
```

## 7. When I select the "Dark" section text color

Select a section text color.

Ports VarbaseContext::iSelectTheSectionTextColor.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*select the "([^"]*)" section text color$/
```

**Examples**

```gherkin
When I select the "Dark" section text color
And I select the "White" section text color
When I select the "Primary" section text color
And we select the "Light" section text color
When I select the "Muted" section text color
```

## 8. When I set the alignment to "End"

Set the section text alignment.

Ports VarbaseContext::iSetTheAlignmentTo.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*set the alignment to "([^"]*)"$/
```

**Examples**

```gherkin
When I set the alignment to "End"
And I set the alignment to "Start"
When I set the alignment to "Center"
And we set the alignment to "Justify"
When I set the alignment to "End"
```

## 9. When I uncheck the Edge to Edge Background

Uncheck the section "Edge to Edge Background" option.

Ports VarbaseContext::iUncheckTheEdgeToEdgeBackground.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*uncheck the Edge to Edge Background$/
```

**Examples**

```gherkin
When I uncheck the Edge to Edge Background
And I uncheck the Edge to Edge Background
When we uncheck the Edge to Edge Background
Given I uncheck the Edge to Edge Background
And we uncheck the Edge to Edge Background
```

## 10. And I select "Site branding" from the "Block" dropdown

Select an option (by its visible option text, falling back to value) from a
<select> resolved by its visible label, or a partial name / id when the label
is ambiguous. Needed for paragraph subform selects whose label is a single
word (e.g. "Block", "Webform") — the Varbase E2E core "select from" step treats a
single-word target as a name/id, never a label, and the subform select's DOM
id carries a random "--XXXX" suffix so it cannot be addressed by a fixed #id.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*select "([^"]*)" from the "([^"]*)" dropdown$/
```

**Examples**

```gherkin
And I select "Site branding" from the "Block" dropdown
And I select "Contact" from the "Webform" dropdown
```

## 11. When I check the box "Editor"

Check a checkbox by its visible label (or id / name / css selector).

Ports the Varbase suite's `I check the box "..."`. Varbase E2E core only
offers `I check "..."`; the profile features use "check the box", so this
matches that phrasing. Resolves the control by label text first (Drupal
renders role permission / field labels), then falls back to id / name / css.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*check the box "([^"]*)"$/
```

**Examples**

```gherkin
When I check the box "Editor"
And I check the box "Site Admin"
When we check the box "Content Admin"
And I check the box "Super Admin"
Given I check the box "SEO Admin"
```

## 12. When I uncheck the box "Editor"

Uncheck a checkbox by its visible label (or id / name / css selector).

Ports the Varbase suite's `I uncheck the box "..."`.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*uncheck the box "([^"]*)"$/
```

**Examples**

```gherkin
When I uncheck the box "Editor"
And I uncheck the box "Subscribe"
When we uncheck the box "Site Admin"
And I uncheck the box "Enable"
Given I uncheck the box "Published"
```

## 13. When I select the "Male" radio button

Select a radio button by its visible label text.

Ports VarbaseContext::iSelectTheRadioButton (`@When /^I select the "..."
radio button$/`): finds the <label> whose text matches, follows its `for`
attribute to the input, and selects it.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*select the "([^"]*)" radio button$/
```

**Examples**

```gherkin
When I select the "Male" radio button
And I select the "Female" radio button
When we select the "Yes" radio button
And I select the "Unpublished" radio button
Given I select the "Published" radio button
```

## 14. When I select the radio button "Published"

Select a radio button by its visible label text (alternate phrasing).

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*select the radio button "([^"]*)"$/
```

**Examples**

```gherkin
When I select the radio button "Published"
And I select the radio button "Draft"
When we select the radio button "Needs Review"
And I select the radio button "Archived"
Given I select the radio button "Yes"
```

## 15. And I expand the field "edit-menu"

Open a collapsed <details>/fieldset by its element id so its inner fields
become interactable (e.g. the node form "Menu settings", the entityqueue
form widget).

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*expand the field "([^"]*)"$/
```

**Examples**

```gherkin
And I expand the field "edit-menu"
And I expand the field "edit-entityqueue-form-widget"
```

## 16. When I press the confirm button in modal

Press the confirm (Restore / OK / primary) button in a jQuery UI modal.

Ports VarbaseContext::iPressTheConfirmButton (used by trash restore).

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*press the confirm button in modal$/
```

**Examples**

```gherkin
When I press the confirm button in modal
And I press the confirm button in modal
When we press the confirm button in modal
Given I press the confirm button in modal
And we press the confirm button in modal
```

## 17. When I click the delete button

Click the first "Delete" button on the page (action link or submit).

Ports VarbaseContext::iClickTheDeleteButton.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*click the delete button$/
```

**Examples**

```gherkin
When I click the delete button
And I click the delete button
When we click the delete button
Given I click the delete button
And we click the delete button
```
