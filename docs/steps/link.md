# Links steps

9 steps, defined in `tests/step-definitions/link.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then the link "About" with the href "/about" should exist` |
| 2 | `Then the link "Home" with the href "/" within the element "#main-nav" should exist` |
| 3 | `Then the link "Sign in" with the href "/login" should not exist` |
| 4 | `Then the link "Logout" with the href "/logout" within the element ".guest-nav" should not exist` |
| 5 | `Then the link with the title "Open menu" should exist` |
| 6 | `Then the link with the title "Delete user" should not exist` |
| 7 | `Then the link "Twitter" should be an absolute link` |
| 8 | `Then the link "Home" should not be an absolute link` |
| 9 | `When I click on the link with the title "Open menu"` |

---

## 1. Then the link "About" with the href "/about" should exist

Assert a link with the given visible text and an href containing a fragment exists.

**Keyword**: `Then`

**Pattern**

```js
'the link {string} with the href {string} should exist'
```

**Examples**

```gherkin
Then the link "About" with the href "/about" should exist
Then the link "Sign in" with the href "/login" should exist
And the link "Pricing" with the href "/pricing" should exist
Then the link "Docs" with the href "docs.example.com" should exist
Then the link "Contact" with the href "/contact-us" should exist
```

## 2. Then the link "Home" with the href "/" within the element "#main-nav" should exist

Assert a link exists inside a specific parent element.

**Keyword**: `Then`

**Pattern**

```js
'the link {string} with the href {string} within the element {string} should exist'
```

**Examples**

```gherkin
Then the link "Home" with the href "/" within the element "#main-nav" should exist
Then the link "Privacy" with the href "/privacy" within the element "footer" should exist
And the link "Sign in" with the href "/login" within the element ".header" should exist
Then the link "Docs" with the href "/docs" within the element "nav" should exist
Then the link "Pricing" with the href "/pricing" within the element ".cta-block" should exist
```

## 3. Then the link "Sign in" with the href "/login" should not exist

Assert NO link with the given visible text and href fragment exists.

**Keyword**: `Then`

**Pattern**

```js
'the link {string} with the href {string} should not exist'
```

**Examples**

```gherkin
Then the link "Sign in" with the href "/login" should not exist
Then the link "Admin" with the href "/admin" should not exist
And the link "Old docs" with the href "/v1/docs" should not exist
Then the link "Logout" with the href "/logout" should not exist
Then the link "Beta" with the href "/beta" should not exist
```

## 4. Then the link "Logout" with the href "/logout" within the element ".guest-nav" should not exist

Assert NO link with text+href exists inside a specific parent element.

**Keyword**: `Then`

**Pattern**

```js
'the link {string} with the href {string} within the element {string} should not exist'
```

**Examples**

```gherkin
Then the link "Logout" with the href "/logout" within the element ".guest-nav" should not exist
Then the link "Admin" with the href "/admin" within the element "footer" should not exist
And the link "Beta" with the href "/beta" within the element "#main-nav" should not exist
Then the link "Old" with the href "/v1" within the element ".breadcrumb" should not exist
Then the link "Internal" with the href "/internal" within the element ".public-nav" should not exist
```

## 5. Then the link with the title "Open menu" should exist

Assert at least one link has the exact `title` attribute.

**Keyword**: `Then`

**Pattern**

```js
'the link with the title {string} should exist'
```

**Examples**

```gherkin
Then the link with the title "Open menu" should exist
Then the link with the title "Edit profile" should exist
And the link with the title "Download PDF" should exist
Then the link with the title "Print page" should exist
Then the link with the title "Sign in" should exist
```

## 6. Then the link with the title "Delete user" should not exist

Assert NO link has the given exact `title` attribute.

**Keyword**: `Then`

**Pattern**

```js
'the link with the title {string} should not exist'
```

**Examples**

```gherkin
Then the link with the title "Delete user" should not exist
Then the link with the title "Open admin" should not exist
And the link with the title "Edit billing" should not exist
Then the link with the title "Sign out" should not exist
Then the link with the title "Reveal secret" should not exist
```

## 7. Then the link "Twitter" should be an absolute link

Assert a link's href is absolute (starts with `http://` or `https://`).

**Keyword**: `Then`

**Pattern**

```js
'the link {string} should be an absolute link'
```

**Examples**

```gherkin
Then the link "Twitter" should be an absolute link
Then the link "GitHub" should be an absolute link
And the link "Documentation" should be an absolute link
Then the link "Status page" should be an absolute link
Then the link "External docs" should be an absolute link
```

## 8. Then the link "Home" should not be an absolute link

Assert a link's href is relative (no `http://` / `https://` scheme).

**Keyword**: `Then`

**Pattern**

```js
'the link {string} should not be an absolute link'
```

**Examples**

```gherkin
Then the link "Home" should not be an absolute link
Then the link "About" should not be an absolute link
And the link "Privacy" should not be an absolute link
Then the link "Pricing" should not be an absolute link
Then the link "Docs" should not be an absolute link
```

## 9. When I click on the link with the title "Open menu"

Click a link addressed by its `title` attribute.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*click on the link with the title "([^"]*)"$/
```

**Examples**

```gherkin
When I click on the link with the title "Open menu"
When I click on the link with the title "Edit profile"
And we click on the link with the title "Download PDF"
When I click on the link with the title "Print page"
When I click on the link with the title "Sign in"
```
