# CKEditor 5 steps

4 steps, defined in `tests/step-definitions/drupal-ckeditor.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I fill in the rich text editor field "Body" with "Test Body text"` |
| 2 | `When I append the rich text editor field "Body" with "More text"` |
| 3 | `When I click on "media" command button in the rich text editor field "Body"` |
| 4 | `When I fill in the link URL "Linking to"` |

---

## 1. When I fill in the rich text editor field "Body" with "Test Body text"

Set the value of a CKEditor 5 rich text editor field by the field label/name.

Ports VarbaseContext::iFillInTheRichTextEditorField. Resolves the form field
(label, name, or id), reads its CKEditor 5 instance id from the data
attribute, and calls setData(). No Varbase E2E equivalent (Varbase E2E's
"WYSIWYG field" step is CKEditor-version agnostic and may not target CK5).

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*fill in the rich text editor field "([^"]*)" with(?: the)? "([^"]*)"$/
```

**Examples**

```gherkin
When I fill in the rich text editor field "Body" with "Test Body text"
And I fill in the rich text editor field "Body" with "<p>Hello</p>"
When we fill in the rich text editor field "Description" with "Text"
And I fill in the rich text editor field "Summary" with "Intro"
Given I fill in the rich text editor field "Body" with "Content"
```

## 2. When I append the rich text editor field "Body" with "More text"

Append text to the end of a CKEditor 5 rich text editor field.

Ports VarbaseContext::appendTheRichTextEditorField.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*append(?: after)? the rich text editor field "([^"]*)" with "([^"]*)"$/
```

**Examples**

```gherkin
When I append the rich text editor field "Body" with "More text"
And I append after the rich text editor field "Body" with "End"
When we append the rich text editor field "Body" with "Tail"
And I append after the rich text editor field "Description" with "!"
Given I append the rich text editor field "Body" with "Extra"
```

## 3. When I click on "media" command button in the rich text editor field "Body"

Click a toolbar command button inside a CKEditor 5 field.

Ports VarbaseContext::iClickOnCommandButtonInTheRichTextEditorField and
iClickOnTheSaveButtonInTheEditor. Matches both:
  When I click on "bold" command button in the rich text editor field "Body"
  When I click on the insert button in "Body" rich text editor field

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*click on (?:"([^"]*)" command button in the rich text editor field "([^"]*)"|the (save|insert|action|apply) button in "([^"]*)" rich text editor field)$/
```

**Examples**

```gherkin
When I click on "media" command button in the rich text editor field "Body"
And I click on "bold" command button in the rich text editor field "Body"
When I click on the insert button in "Body" rich text editor field
And I click on the save button in "Body" rich text editor field
When we click on "link" command button in the rich text editor field "Body"
```

## 4. When I fill in the link URL "Linking to"

Type a query into the open CKEditor 5 Drupal-link balloon's "Link URL" field
so Linkit's autocomplete (ul.ui-autocomplete) searches for internal content.

The balloon holds several inputs (Displayed text, Title, ARIA label, CSS
classes … from editor_advanced_link), so target the one whose label is
"Link URL". CKEditor 5's input reacts only to real per-character typing (a
value assignment is ignored), so type with a small delay to let Linkit
debounce and query. This replaces the CKEditor-4-era "fill in … for
'Link URL'" + keypress steps.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*fill in the link URL "([^"]*)"$/
```

**Examples**

```gherkin
When I fill in the link URL "Linking to"
```
