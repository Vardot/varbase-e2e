# Content moderation steps

3 steps, defined in `tests/step-definitions/drupal-moderation.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I open the moderation sidebar` |
| 2 | `Then the moderation sidebar should show "Draft"` |
| 3 | `Then the moderation sidebar should not show "Archived"` |

---

## 1. When I open the moderation sidebar

Open the moderation sidebar from the administration toolbar / tasks.

Ports VarbaseContext::iOpenTheModerationSidebar.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*(?:open (?:the )?moderation sidebar|click on tasks in the toolbar)$/
```

**Examples**

```gherkin
When I open the moderation sidebar
And I open moderation sidebar
When I click on tasks in the toolbar
And click on tasks in the toolbar
When we open the moderation sidebar
```

## 2. Then the moderation sidebar should show "Draft"

Assert the moderation sidebar shows the given text for the current revision.

**Keyword**: `Then`

**Pattern**

```js
/^(?:the )?moderation sidebar should show "([^"]*)"$/
```

**Examples**

```gherkin
Then the moderation sidebar should show "Draft"
And moderation sidebar should show "Published"
Then the moderation sidebar should show "Needs Review"
And the moderation sidebar should show "Archived"
Then moderation sidebar should show "Latest version"
```

## 3. Then the moderation sidebar should not show "Archived"

Assert the moderation sidebar does not show the given text for the current revision.

**Keyword**: `Then`

**Pattern**

```js
/^(?:the )?moderation sidebar should not show "([^"]*)"$/
```

**Examples**

```gherkin
Then the moderation sidebar should not show "Archived"
And moderation sidebar should not show "Delete"
Then the moderation sidebar should not show "Published"
And the moderation sidebar should not show "Unpublish"
Then moderation sidebar should not show "Needs Review"
```
