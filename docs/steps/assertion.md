# Assertions steps

16 steps, defined in `tests/step-definitions/assertion.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then I should see "Welcome"` |
| 2 | `Then I should see text matching "^T\w+"` |
| 3 | `Then I should see "Active" in the "John Smith" row` |
| 4 | `Then I should see a "Username" element` |
| 5 | `Then I should see a "uname" element by its "id" attr` |
| 6 | `Then I should see "John Smith" in the "Username" element` |
| 7 | `Then I should see "John Smith" in the "uname" element by its "id" attr` |
| 8 | `Then I should see text matching "\d{4}" in the "#year" element` |
| 9 | `Then the "body" element should contain "color:white;"` |
| 10 | `Then I should see 3 "li" elements` |
| 11 | `Then the "Login" link should contain "/log-in"` |
| 12 | `Then the "#about-us-id" link should contain "about" by attr` |
| 13 | `Then the page title should be "About Us"` |
| 14 | `Then the page title should contain "About"` |
| 15 | `Then the response should contain "Welcome visitor"` |
| 16 | `Then the response status code should be 200` |

---

## 1. Then I should see "Welcome"

Assert that text is or is not present on the page.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should( not)* see "([^"]*)?"$/
```

**Examples**

```gherkin
Then I should see "Welcome"
Then we should see "Your accounts for the group is public"
Then I should not see "Access denied"
Then we should not see "Edit layout"
```

## 2. Then I should see text matching "^T\w+"

Assert that page contains or does not contain text matching a regex pattern.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should( not)* see text matching "([^"]*)?"$/
```

**Examples**

```gherkin
Then I should see text matching "^T\w+"
Then I should not see text matching "^O\w+"
And we should see text matching "\d{4}"
```

## 3. Then I should see "Active" in the "John Smith" row

Assert text is or is not visible inside a table row identified by text.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should( not)* see "([^"]*)?" in( the)* "([^"]*)?" row$/
```

**Examples**

```gherkin
Then I should see "Active" in the "John Smith" row
Then I should see "In Stock" in the "Product A" row
Then we should see "Processing" in the "Order #12345" row
And I should see "Admin" in the "john.smith@example.com" row
Then I should not see "Admin" in the "Jane Doe" row
Then I should not see "Out of Stock" in the "Product A" row
And I should not see "Inactive" in the "john.smith@example.com" row
```

## 4. Then I should see a "Username" element

Assert that an element with a given label exists (or does not) on the page.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should( not)* see (a|an) "([^"]*)?" element$/
```

**Examples**

```gherkin
Then I should see a "Username" element
Then I should not see a "Username" element
And we should see an "Email" element
```

## 5. Then I should see a "uname" element by its "id" attr

Assert that an element, identified by attribute, exists (or does not) on the page.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should( not)* see (a|an) "([^"]*)?" element by( its)*(?: "([^"]*)?")* (attribute|attr)$/
```

**Examples**

```gherkin
Then I should see a "uname" element by its "id" attr
Then I should see a "pwordcss" element by attr
Then I should not see an "emailId" element by its "id" attr
And I should not see a "countryCss" element by attr
```

## 6. Then I should see "John Smith" in the "Username" element

Assert that an element (found by its label) contains or does not contain text.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should( not)* see "([^"]*)?" in( the)* "([^"]*)?" element$/
```

**Examples**

```gherkin
Then I should see "John Smith" in the "Username" element
Then I should not see "Joe Smith" in the "Username" element
And we should see "1234" in the "Password" element
```

## 7. Then I should see "John Smith" in the "uname" element by its "id" attr

Assert that an element (found by its attribute) contains or does not contain text.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should( not)* see "([^"]*)?" in( the)* "([^"]*)?" element by( its)*(?: "([^"]*)?")* (attribute|attr)$/
```

**Examples**

```gherkin
Then I should see "John Smith" in the "uname" element by its "id" attr
Then I should see "1234" in the "pwordcss" element by attr
Then I should not see "John Smith" in the "uname" element by its "id" attr
Then I should not see "1234" in the "pwordcss" element by attr
```

## 8. Then I should see text matching "\d{4}" in the "#year" element

Assert that an element's text content does or does not match a regex.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should( not)* see text matching "([^"]*)?" in( the)* "([^"]*)?" element$/
```

**Examples**

```gherkin
Then I should see text matching "\d{4}" in the "#year" element
Then I should see text matching "\$\d+\.\d{2}" in the "#price" element
Then I should not see text matching "Error" in the "#status" element
Then we should see text matching "^[A-Z][a-z]+ [A-Z][a-z]+$" in the "#full-name" element
Then I should see text matching "(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}" in the "#date" element
```

## 9. Then the "body" element should contain "color:white;"

Assert that an element has or does not have a specific CSS property.

**Keyword**: `Then`

**Pattern**

```js
/^(the )*"([^"]*)?" element should( not)* contain "([^"]*)?"$/
```

**Examples**

```gherkin
Then the "body" element should contain "color:white;"
Then the "body" element should not contain "color:white;"
Then the "#uname" element should not contain "border:solid 5px red;"
Then the "pword" element should not contain "font-size: 26px;"
```

## 10. Then I should see 3 "li" elements

Assert the exact number of elements matching a CSS selector.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should see (\d+) "([^"]*)" elements?$/
```

**Examples**

```gherkin
Then I should see 3 "li" elements
Then I should see 1 "h1" element
Then we should see 5 ".card" elements
Then I should see 0 ".error" elements
And I should see 10 "table tr" elements
Then I should see 2 "nav a" elements
Then we should see 4 "ul li" elements
Then I should see 1 "form" element
And should see 6 ".product" elements
Then I should see 8 "[data-testid='row']" elements
```

## 11. Then the "Login" link should contain "/log-in"

Assert that a link (located by its visible text) contains the given URL.

**Keyword**: `Then`

**Pattern**

```js
/^(the )*"([^"]*)?" link should contain "([^"]*)?"$/
```

**Examples**

```gherkin
Then the "Login" link should contain "/log-in"
And the "About Us" link should contain "/about"
Then "Home" link should contain "/"
```

## 12. Then the "#about-us-id" link should contain "about" by attr

Assert that a link located by its attribute contains the given URL.

**Keyword**: `Then`

**Pattern**

```js
/^(the )*"([^"]*)?" link should contain "([^"]*)?" by( its)*(?: "([^"]*)?")* (attribute|attr)$/
```

**Examples**

```gherkin
Then the "#about-us-id" link should contain "about" by attr
And the "aboutUs" link should contain "about" by its "class" attribute
And the ".contactUs" link should contain "/contact-" by attr
```

## 13. Then the page title should be "About Us"

Assert the page title is, or is not, exactly this text.

The title is `document.title` — the `<title>` element, which is the browser tab text, the bookmark name, the search-result heading and what a screen reader announces first on a new page. On a Drupal site it is the head title pattern, so this is how a test proves the pattern and the token that fills it both work. Compared after trimming, because a title built from a template often carries stray whitespace around the separator.

**Keyword**: `Then`

**Pattern**

```js
/^(the )*page title should( not)* be "([^"]*)?"$/
```

**Examples**

```gherkin
Then the page title should be "About Us"
Then the page title should not be "Access denied"
And the page title should be "Contact Us | Example"
When I go to "/blog"
  Then the page title should be "Blog | Example"
Then the page title should not be "Page not found | Example"
```

## 14. Then the page title should contain "About"

Assert the page title contains, or does not contain, this text.

The form to reach for on a real site: the head title carries the site name and a separator the test has no business hardcoding, so assert the part the page owns. Case-sensitive, compared after trimming.

**Keyword**: `Then`

**Pattern**

```js
/^(the )*page title should( not)* contain "([^"]*)?"$/
```

**Examples**

```gherkin
Then the page title should contain "About"
Then the page title should not contain "Access denied"
And the page title should contain "Getting Started"
When I go to "/contact-us"
  Then the page title should contain "Contact"
Then the page title should not contain "Untitled"
```

Related: `I wait until the page title is/contains "..."` in [`wait.md`](wait.md) waits for a title to become something; these two assert what it is now.

## 15. Then the response should contain "Welcome visitor"

Assert that the rendered HTML response contains or does not contain text.

Reads the entire `<html>` text — useful for checking text that lives in
`<head>` (meta descriptions, JSON-LD), `<noscript>`, or hidden regions.

**Keyword**: `Then`

**Pattern**

```js
/^(the )*response should( not)* contain "([^"]*)?"$/
```

**Examples**

```gherkin
Then the response should contain "Welcome visitor"
Then the response should not contain "Access denied"
And the response should contain "<title>Home</title>"
Then the response should contain "<html"
When I am on "/about"
  Then the response should contain "Our mission"
  And the response should not contain "TODO"
```

## 16. Then the response status code should be 200

Assert that the current page's response status is or is not a given code.

**Keyword**: `Then`

**Pattern**

```js
/^(the )*response status code should( not)* be (\d+)$/
```

**Examples**

```gherkin
Then the response status code should be 200
And the response status code should not be 404
Then the response status code should be 301
```
