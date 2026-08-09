# Layout Builder steps

10 steps, defined in `tests/step-definitions/drupal-layout-builder.steps.js`.

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
