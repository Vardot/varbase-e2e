# Navigation steps

11 steps, defined in `tests/step-definitions/navigation.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Given I am an anonymous user` |
| 2 | `Given I am on homepage` |
| 3 | `Given I am on "/about-us.html"` |
| 4 | `When I go to homepage` |
| 5 | `When I go to "/contact-us.html"` |
| 6 | `When I move forward one page` |
| 7 | `When I move backward one page` |
| 8 | `When I reload` |
| 9 | `Then I should be on homepage` |
| 10 | `Then I should be on "/"` |
| 11 | `Then the url should match "/contact-us.html"` |

---

## 1. Given I am an anonymous user

Clear cookies and navigate to the launch URL as an anonymous visitor.

**Keyword**: `Given`

**Pattern**

```js
/^(I am |we are )?an anonymous user$/
```

**Examples**

```gherkin
Given I am an anonymous user
Given we are an anonymous user
Given an anonymous user
```

## 2. Given I am on homepage

Open the homepage.

**Keyword**: `Given`

**Pattern**

```js
/^(I am |we are )?on( the)* (homepage|frontpage)$/
```

**Examples**

```gherkin
Given I am on homepage
Given I am on the homepage
Given I am on frontpage
Given I am on the frontpage
Given we are on homepage
Given we are on the frontpage
Given on homepage
Given on the homepage
Given on frontpage
Given on the frontpage
```

## 3. Given I am on "/about-us.html"

Open a specific page under the launch URL.

**Keyword**: `Given`

**Pattern**

```js
/^(I am |we are )*on( the)* "([^"]*)?"( page)*$/
```

**Examples**

```gherkin
Given I am on "/about-us.html"
Given I am on the "/about-us.html" page
Given we are on "/user/login"
Given we are on the "/contact-us.html" page
Given on "/about-us.html"
Given on the "/about-us.html" page
Given I am on "https://un.org"
```

## 4. When I go to homepage

Navigate to the homepage.

**Keyword**: `When`

**Pattern**

```js
/^(I go |I navigate |we go |we navigate |navigating )?to( the)* (homepage|frontpage)$/
```

**Examples**

```gherkin
When I go to homepage
When I go to the homepage
When I navigate to the homepage
When navigating to the homepage
When navigating to homepage
When navigating to the frontpage
When we go to the homepage
When we navigate to the homepage
```

## 5. When I go to "/contact-us.html"

Navigate to a specific page.

**Keyword**: `When`

**Pattern**

```js
/^(I go |I navigate |we go |we navigate |navigating )?to "([^"]*)?"$/
```

**Examples**

```gherkin
When I go to "/contact-us.html"
When I go to "/user/login"
When I navigate to "/admin/dashboard"
When navigating to "/products"
When we go to "/products"
When we navigate to "/terms"
```

## 6. When I move forward one page

Moves forward one page in browser history.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*move forward one page$/
```

**Examples**

```gherkin
When I move forward one page
When we move forward one page
And move forward one page
```

## 7. When I move backward one page

Moves backward one page in browser history.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*move backward one page$/
```

**Examples**

```gherkin
When I move backward one page
When we move backward one page
And move backward one page
```

## 8. When I reload

Reloads the current page.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*reload( the)*( page)*$/
```

**Examples**

```gherkin
When I reload
And I reload the page
And we reload page
And we reload the page
```

## 9. Then I should be on homepage

Assert that the current page is or is not the homepage.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should( not)* be on( the)* (homepage|frontpage)$/
```

**Examples**

```gherkin
Then I should be on homepage
And I should be on the homepage
Then I should be on frontpage
And should be on the homepage
Then should be on homepage
And we should be on homepage
Then should be on frontpage
And we should be on the homepage
Then I should not be on homepage
And I should not be on the homepage
```

## 10. Then I should be on "/"

Assert that the current path is or is not equal to the specified path.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should( not)* be on( the)* "([^"]*)?"( page)*$/
```

**Examples**

```gherkin
Then I should be on "/"
And I should be on "/user/login"
And I should be on "https://un.org"
Then we should be on the "/" page
And we should be on "/user/login"
Then should be on the "/user/reset" page
Then I should not be on "/"
And I should not be on "/user/login"
And I should not be on "https://un.org"
And we should not be on the "https://un.org" page
```

## 11. Then the url should match "/contact-us.html"

Assert that the current URL matches or does not match a regex pattern.

**Keyword**: `Then`

**Pattern**

```js
/^(the )*url should( not)* match "([^"]*)?"$/
```

**Examples**

```gherkin
Then the url should match "/contact-us.html"
Then the url should not match "/contact-us.html"
And the url should match "^https://"
```
