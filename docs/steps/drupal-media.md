# Media library steps

4 steps, defined in `tests/step-definitions/drupal-media.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I submit the media library dialog` |
| 2 | `And I open the "field_image" media library` |
| 3 | `And I select the media "Embed Flag Earth"` |
| 4 | `And I insert the selected media` |

---

## 1. When I submit the media library dialog

Submit the Media Library dialog (the "Insert selected" action).

Ports VarbaseContext::iSubmitMediaLibraryDialog.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*submit (?:the )?media library dialog$/
```

**Examples**

```gherkin
When I submit the media library dialog
And I submit the media library dialog
When we submit the media library dialog
Given I submit the media library dialog
And we submit media library dialog
```

## 2. And I open the "field_image" media library

Open the Media Library widget of a specific field by its machine name.

On Drupal 11.4 the media-library "Add media" open button renders with a
random "--XXXX" id suffix, and a single paragraph subform can contain several
"Add media" buttons (e.g. the text_and_image bundle has both field_image and
a bp_image field), so neither the old fixed id nor the "Add media" label is
unique. Match the visible open button whose id contains "<field>-open-button".

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*open the "([^"]*)" media library$/
```

**Examples**

```gherkin
And I open the "field_image" media library
And I open the "field_media_single" media library
```

## 3. And I select the media "Embed Flag Earth"

Select a Media Library grid item by its "Select <name>" checkbox, tolerating
duplicate items. A retried upload scenario (cucumber `retry: 1`) can leave two
media with the same name, so Varbase E2E's built-in "I check" would strict-fail on
two identically labelled checkboxes — pick the first.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*select the media "([^"]*)"$/
```

**Examples**

```gherkin
And I select the media "Embed Flag Earth"
And I select the media "Flag Earth"
```

## 4. And I insert the selected media

Insert the currently selected item(s) in the open Media Library dialog.
The dialog submit ("Insert selected") is cloned by jQuery UI into the dialog
button pane, so the original form button is hidden; target the visible one.
Replaces the old `press "dialog-submit" by its "id"` which no longer resolves
on Drupal 11.4 (the media dialog button has no "dialog-submit" id).

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*insert the selected media$/
```

**Examples**

```gherkin
And I insert the selected media
```
