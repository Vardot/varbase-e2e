# Paragraphs steps

1 step, defined in `tests/step-definitions/drupal-paragraphs.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I select the "Text" paragraph component` |

---

## 1. When I select the "Text" paragraph component

Select a paragraph component in the "Add component" dialog.

Ports VarbaseContext::iSelectTheParagraphComponent: clicks the add button in
the paragraphs-add-dialog whose name matches the component.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*select the "([^"]*)" paragraph component$/
```

**Examples**

```gherkin
When I select the "Text" paragraph component
And I select the "Modal" paragraph component
When we select the "Drupal block" paragraph component
And I select the "Rich Text" paragraph component
Given I select the "Accordion" paragraph component
```
