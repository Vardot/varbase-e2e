# Screenshots steps

6 steps, defined in `tests/step-definitions/screenshot.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then I save screenshot` |
| 2 | `Then I save fullscreen screenshot` |
| 3 | `Then I save 1440 x 900 screenshot` |
| 4 | `Then I save fullscreen 1440 x 900 screenshot` |
| 5 | `Then I save screenshot with name "homepage.png"` |
| 6 | `Then I save fullscreen screenshot with name "homepage-full.png"` |

---

## 1. Then I save screenshot

Save a screenshot at the current viewport size.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*save screenshot$/
```

**Examples**

```gherkin
Then I save screenshot
When I save screenshot
Then save screenshot
Given I am on "/about-us"
            Then I save screenshot
When I go to homepage
            Then I save screenshot
Given I am on "/news"
            When I scroll to "#latest"
            Then I save screenshot
Given I am on "/contact"
            When I fill in "email" with "info@vardot.com"
            Then I save screenshot
Given I am on "/search?q=UN"
            Then I save screenshot
Then I reload page
            Then I save screenshot
Given I am on "/partners/un.org"
  Then I save screenshot
```

## 2. Then I save fullscreen screenshot

Save a full-page screenshot (entire scrollable area).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*save fullscreen screenshot$/
```

**Examples**

```gherkin
Then I save fullscreen screenshot
When I save fullscreen screenshot
Then save fullscreen screenshot
Given I am on "/news"
            Then I save fullscreen screenshot
Given I am on "/about-us"
            Then I save fullscreen screenshot
Given I am on homepage
            Then I save fullscreen screenshot
Given I am on "/partners"
            When I wait 2 seconds
            Then I save fullscreen screenshot
Given I am on "/varbase-e2e"
            Then I save fullscreen screenshot
Given I am on "/un.org/reports"
            Then I save fullscreen screenshot
Given I am on "/long-article"
  Then I save fullscreen screenshot
```

## 3. Then I save 1440 x 900 screenshot

Resize the viewport to <width> x <height> then save a screenshot.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*save (\d+) x (\d+) screenshot$/
```

**Examples**

```gherkin
Then I save 1440 x 900 screenshot
Then I save 1200 x 800 screenshot
Then I save 375 x 667 screenshot
Then I save 768 x 1024 screenshot
Then I save 1920 x 1080 screenshot
Given I am on "/about-us"
            Then I save 1440 x 900 screenshot
Given I am on homepage
            Then I save 375 x 812 screenshot
Given I am on "/news"
            Then I save 1024 x 768 screenshot
Given I am on "/about"
            Then I save 1366 x 768 screenshot
Given I am on "/un.org"
  Then I save 414 x 896 screenshot
```

## 4. Then I save fullscreen 1440 x 900 screenshot

Resize the viewport to <width> x <height> then save a full-page screenshot.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*save fullscreen (\d+) x (\d+) screenshot$/
```

**Examples**

```gherkin
Then I save fullscreen 1440 x 900 screenshot
Then I save fullscreen 1200 x 800 screenshot
Then I save fullscreen 375 x 667 screenshot
Then I save fullscreen 768 x 1024 screenshot
Then I save fullscreen 1920 x 1080 screenshot
Given I am on "/about-us"
            Then I save fullscreen 1440 x 900 screenshot
Given I am on homepage
            Then I save fullscreen 375 x 812 screenshot
Given I am on "/about"
            Then I save fullscreen 1366 x 768 screenshot
Given I am on "/un.org"
            Then I save fullscreen 414 x 896 screenshot
Given I am on "/long-article"
  Then I save fullscreen 1440 x 900 screenshot
```

## 5. Then I save screenshot with name "homepage.png"

Save a screenshot using an explicit filename (tokens supported).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*save screenshot with name "([^"]*)"$/
```

**Examples**

```gherkin
Then I save screenshot with name "homepage.png"
Then I save screenshot with name "varbase-e2e-home"
Then I save screenshot with name "un-landing-{datetime}.png"
Then I save screenshot with name "about-us.png"
Then I save screenshot with name "{feature_file}_{step_line}"
Then I save screenshot with name "{url_path}.png"
Given I am on "/news"
            Then I save screenshot with name "news-latest.png"
Given I am on "/about"
            Then I save screenshot with name "varbase-e2e-index.png"
Given I am on "/un.org"
            Then I save screenshot with name "un-home.png"
Then I save screenshot with name "contact-form-before-submit.png"
```

## 6. Then I save fullscreen screenshot with name "homepage-full.png"

Save a full-page screenshot using an explicit filename (tokens supported).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*save fullscreen screenshot with name "([^"]*)"$/
```

**Examples**

```gherkin
Then I save fullscreen screenshot with name "homepage-full.png"
Then I save fullscreen screenshot with name "varbase-e2e-home-full"
Then I save fullscreen screenshot with name "news-{datetime}.png"
Then I save fullscreen screenshot with name "about-us-full.png"
Then I save fullscreen screenshot with name "{feature_file}_full.png"
Then I save fullscreen screenshot with name "{url_path}-full.png"
Given I am on "/news"
            Then I save fullscreen screenshot with name "news-full.png"
Given I am on "/about"
            Then I save fullscreen screenshot with name "varbase-e2e-full.png"
Given I am on "/un.org"
            Then I save fullscreen screenshot with name "un-home-full.png"
Then I save fullscreen screenshot with name "long-article-full.png"
```
