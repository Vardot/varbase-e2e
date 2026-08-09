# Selector registry steps

24 steps, defined in `tests/step-definitions/selectors.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I add "mobile logo" selector for "header img#logo" css selector` |
| 2 | `When I add "page title" selector for "//h1[contains(@class,'page-header')]" xpath selector` |
| 3 | `When I add selectors from "selectors.json" file` |
| 4 | `Then I print css selectors` |
| 5 | `Then I print xpath selectors` |
| 6 | `/^(I \|we )*define css selectors:$/` |
| 7 | `/^(I \|we )*define xpath selectors:$/` |
| 8 | `Given I am viewing the site on a xl screen` |
| 9 | `Then I see header above footer` |
| 10 | `Then I see footer below header` |
| 11 | `Then I see logo to the left of nav` |
| 12 | `Then I see nav to the right of logo` |
| 13 | `Then I see logo inside of header` |
| 14 | `Then I see header outside of logo` |
| 15 | `Then I see modal over content` |
| 16 | `Then I see header not over content` |
| 17 | `Then I see visible header` |
| 18 | `Then I don't see modal` |
| 19 | `Then I see search has focus` |
| 20 | `When I move focus to "Title" field` |
| 21 | `When I select all text in "Title" field` |
| 22 | `When I select from 0 to 5 text in "Title" field` |
| 23 | `When I select "title name" text in "Title" field` |
| 24 | `When I click nav` |

---

## 1. When I add "mobile logo" selector for "header img#logo" css selector

Register a named CSS selector at runtime.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*add "([^"]*)" selector for "([^"]*)" css selector$/
```

**Examples**

```gherkin
When I add "mobile logo" selector for "header img#logo" css selector
When I add "breadcrumb" selector for ".breadcrumb" css selector
When I add "breadcrumb first link" selector for ".breadcrumb li:nth-child(1) a" css selector
When I add "cta button" selector for ".cta .btn-primary" css selector
When I add "page header" selector for "header.page-header" css selector
When I add "main nav" selector for "nav[role='navigation']" css selector
When I add "hero image" selector for ".hero img" css selector
When I add "footer links" selector for "footer a" css selector
When I add "search field" selector for "input[type='search']" css selector
When I add "submit button" selector for "button[type='submit']" css selector

Advanced:
Later override same name → latest wins:
  When I add "target" selector for "h1" css selector
  And   I add "target" selector for "ul" css selector
Component (CSS) takes precedence over CSS registry with same name:
  When I add "shared" selector for "ul" css selector
  And  I define css selectors:
    | shared | h1 |
Combine with XPath registration and use together:
  When I add "cta" selector for ".cta" css selector
  And  I add "cta link" selector for "//a[contains(@class,'cta')]" xpath selector
```

## 2. When I add "page title" selector for "//h1[contains(@class,'page-header')]" xpath selector

Register a named XPath selector at runtime.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*add "([^"]*)" selector for "([^"]*)" xpath selector$/
```

**Examples**

```gherkin
When I add "page title" selector for "//h1[contains(@class,'page-header')]" xpath selector
When I add "Dashboard" selector for "//*[@id='navbar-link-admin-dashboard']" xpath selector
When I add "Vertical orientation" selector for "//*[@id='navbar-item--2-tray']/div/div[2]/div/button" xpath selector
When I add "admin menu" selector for "//nav[contains(@class,'admin-menu')]" xpath selector
When I add "first table row" selector for "//table/tbody/tr[1]" xpath selector
When I add "active tab" selector for "//li[contains(@class,'active')]/a" xpath selector
When I add "error message" selector for "//*[contains(@class,'error')]" xpath selector
When I add "site name" selector for "//a[contains(@class,'site-name')]" xpath selector
When I add "user menu" selector for "//*[@id='user-menu']" xpath selector
When I add "language switcher" selector for "//ul[contains(@class,'language-switcher')]" xpath selector

Advanced:
Axis predicates — first match only (locator.first() is applied):
  When I add "first row" selector for "//table//tr[1]" xpath selector
Text contains — name by rendered label:
  When I add "login link" selector for "//a[contains(normalize-space(.),'Login')]" xpath selector
Attribute + position — last nav item:
  When I add "last nav item" selector for "//nav[@role='navigation']//a[last()]" xpath selector
```

## 3. When I add selectors from "selectors.json" file

Load CSS and XPath selectors from a JSON file.
File path is relative to worldParameters.selectors.filesPath.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*add selectors from "([^"]*)" file$/
```

**Examples**

```gherkin
When I add selectors from "selectors.json" file
When I add selectors from "admin-selectors.json" file
When I add selectors from "frontend.json" file
When I add selectors from "theme-selectors.json" file
When I add selectors from "components.json" file
When we add selectors from "shared.json" file
When add selectors from "backend.json" file
When I add selectors from "page-selectors.json" file
When I add selectors from "module-selectors.json" file
When we add selectors from "mobile.json" file

Advanced:
Load a file then override a single entry inline:
  When I add selectors from "homepage-selectors.json" file
  And  I add "homepage heading" selector for "header h1" css selector
Load multiple files — later files override earlier keys:
  When I add selectors from "front-end-selectors.json" file
  And  I add selectors from "back-end-selectors.json" file
File + inline xpath + component — all three registries merged:
  When I add selectors from "homepage-selectors.json" file
  And  I add "extra link" selector for "//a[@rel='canonical']" xpath selector
  And  I define css selectors:
    | wrapper | #main |
```

## 4. Then I print css selectors

Print all registered CSS selectors to console (debug/inspection).

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*print css selectors$/
```

**Examples**

```gherkin
Then I print css selectors
When I print css selectors
Then we print css selectors
When we print css selectors
Then print css selectors
When print css selectors
And I print css selectors
And we print css selectors
Given I print css selectors
But I print css selectors
```

## 5. Then I print xpath selectors

Print all registered XPath selectors to console (debug/inspection).

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*print xpath selectors$/
```

**Examples**

```gherkin
Then I print xpath selectors
When I print xpath selectors
Then we print xpath selectors
When we print xpath selectors
Then print xpath selectors
When print xpath selectors
And I print xpath selectors
And we print xpath selectors
Given I print xpath selectors
But I print xpath selectors
```

## 6. /^(I |we )*define css selectors:$/

Define named CSS selectors in bulk for the current scenario.

**Keyword**: `Given`

**Pattern**

```js
/^(I |we )*define css selectors:$/
```

**Examples**

```gherkin
Given I define css selectors:
    | header  | #header        |
    | nav     | nav.primary    |
    | footer  | footer         |

Given I define css selectors:
    | logo    | .site-logo     |
    | search  | #search-input  |

Given I define css selectors:
    | hero    | .hero-banner   |
    | content | .main-content  |
    | sidebar | .sidebar       |

Given I define css selectors:
    | menu    | ul.menu        |
    | button  | .cta-button    |

Given I define css selectors:
    | top bar | .top-bar       |
    | page    | #page-wrapper  |
    | footer  | .site-footer   |

Given we define css selectors:
    | modal   | .modal-dialog  |
    | overlay | .modal-backdrop |

When I define css selectors:
    | input   | input[name=q]  |
    | button  | button[type=submit] |

And I define css selectors:
    | card    | .card          |
    | title   | .card-title    |

Given define css selectors:
    | heading | h1             |
    | list    | ul             |

Given I define css selectors:
    | left    | .col-left      |
    | center  | .col-center    |
    | right   | .col-right     |

Advanced:
Later entry with same name overrides earlier:
  When  I add "shared" selector for "ul" css selector
  Given I define css selectors:
    | shared | h1 |
  Then I see visible shared   # resolves to h1 (latest wins).

Define + use in position + visibility asserts:
  Given I define css selectors:
    | heading | h1 |
    | list    | ul |
  Then I see visible heading, list
  And  I see heading above list

Layered page-shell selectors:
  Given I define css selectors:
    | topbar  | .topbar         |
    | header  | header.site     |
    | nav     | nav[role=navigation] |
    | main    | main            |
    | footer  | footer          |
```

## 7. /^(I |we )*define xpath selectors:$/

Define named XPath selectors in bulk for the current scenario.

**Keyword**: `Given`

**Pattern**

```js
/^(I |we )*define xpath selectors:$/
```

**Examples**

```gherkin
Given I define xpath selectors:
    | first heading | //h1[1]              |
    | first subline | //h3[1]              |
Given we define xpath selectors:
    | active tab   | //li[contains(@class,'active')]/a |
Given define xpath selectors:
    | last nav item | //nav//a[last()] |
And I define xpath selectors:
    | login link    | //a[contains(normalize-space(.),'Login')] |
When I define xpath selectors:
    | error message | //*[contains(@class,'error')] |
Given I define xpath selectors:
    | first table row | //table/tbody/tr[1] |
    | first table cell| //table/tbody/tr[1]/td[1] |
Given I define xpath selectors:
    | page title | //h1[contains(@class,'page-header')] |
Given I define xpath selectors:
    | admin menu | //nav[contains(@class,'admin-menu')] |
Given I define xpath selectors:
    | language switcher | //ul[contains(@class,'language-switcher')] |
Given I define xpath selectors:
    | user menu | //*[@id='user-menu'] |
```

## 8. Given I am viewing the site on a xl screen

Resize viewport to a named breakpoint.
Built-in names: xs, sm, md, lg, xl, xxl, xxxl.

  xs   375 x 667    phone portrait
  sm   576 x 800    large phone / phablet
  md   768 x 1024   tablet portrait
  lg   992 x 768    small laptop / tablet landscape
  xl   1200 x 900   desktop (default)
  xxl  1400 x 900   wide desktop / HD
  xxxl 1920 x 1080  Full HD / large monitor

**Keyword**: `Given`

**Pattern**

```js
/^(I am |we are )?viewing the site on a (?:"([^"]+)"|([a-zA-Z0-9 _,]+)) (?:screen|device)$/
```

**Examples**

```gherkin
Given I am viewing the site on a xl screen
Given I am viewing the site on a xs screen
Given I am viewing the site on a md screen
Given I am viewing the site on a "xl" screen
Given I am viewing the site on a lg device
Given I am viewing the site on a "sm" device
Given I am viewing the site on a xxl screen
Given I am viewing the site on a "xxxl" screen
Given I am viewing the site on a xxxl device
Given I am viewing the site on a "xxl" device
Given we are viewing the site on a xs screen
Given viewing the site on a lg screen
```

## 9. Then I see header above footer

Assert a subject locator is above one or more others (absolute page coordinates).

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*see ([a-zA-Z0-9 ,\-]+) above ([a-zA-Z0-9 ,\-]+)$/
```

**Examples**

```gherkin
Then I see header above footer
Then I see logo above search
Then I see nav above content, footer
Then I see hero above sidebar and footer
Then I see top bar above nav, content and footer
Then I see heading above subline
Then I see nav above content
Then I see search above results
Then I see banner above body
Then I see menu above page

Advanced — multi-subject / multi-target dispatch:
Single subject, many targets (comma + "and"):
  Then I see heading above subline, list and footer
Many subjects, single target:
  Then I see heading, subline above list
Cartesian — many subjects × many targets:
  Then I see heading, subline above list, footer
Combined with inline xpath registration:
  When I add "first heading xp" selector for "//h1[1]" xpath selector
  Then I see first heading xp above list
```

## 10. Then I see footer below header

Assert a subject locator is below one or more others.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*see ([a-zA-Z0-9 ,\-]+) below ([a-zA-Z0-9 ,\-]+)$/
```

**Examples**

```gherkin
Then I see footer below header
Then I see content below nav
Then I see footer below header, nav and content
Then I see results below search
Then I see sidebar below hero
Then I see list below heading
Then I see nav below top bar
Then I see content below logo
Then I see page below menu
Then I see body below banner
```

## 11. Then I see logo to the left of nav

Assert a subject locator is to the left of one or more others.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*see ([a-zA-Z0-9 ,\-]+) to (?:the )?left of ([a-zA-Z0-9 ,\-]+)$/
```

**Examples**

```gherkin
Then I see logo to the left of nav
Then I see sidebar to left of content
Then I see search to the left of search button
Then I see menu to the left of cta
Then I see label to left of input
Then I see icon to the left of title
Then I see thumbnail to the left of description
Then I see avatar to left of username
Then I see back button to the left of forward button
Then I see flag to left of country name
```

## 12. Then I see nav to the right of logo

Assert a subject locator is to the right of one or more others.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*see ([a-zA-Z0-9 ,\-]+) to (?:the )?right of ([a-zA-Z0-9 ,\-]+)$/
```

**Examples**

```gherkin
Then I see nav to the right of logo
Then I see content to right of sidebar
Then I see search button to the right of search
Then I see cta to the right of menu
Then I see input to right of label
Then I see title to the right of icon
Then I see description to the right of thumbnail
Then I see username to right of avatar
Then I see forward button to the right of back button
Then I see country name to right of flag
```

## 13. Then I see logo inside of header

Assert a subject locator's bounding box is fully inside another's.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*see ([a-zA-Z0-9 ,\-]+) inside of ([a-zA-Z0-9 ,\-]+)$/
```

**Examples**

```gherkin
Then I see logo inside of header
Then I see nav inside of header
Then I see search inside of header
Then I see cta inside of hero
Then I see label inside of form
Then I see icon inside of button
Then I see title inside of banner
Then I see content inside of page
Then I see sidebar inside of page
Then I see footer inside of page
```

## 14. Then I see header outside of logo

Assert a subject locator's bounding box fully contains another's.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*see ([a-zA-Z0-9 ,\-]+) outside of ([a-zA-Z0-9 ,\-]+)$/
```

**Examples**

```gherkin
Then I see header outside of logo
Then I see header outside of nav
Then I see hero outside of cta
Then I see form outside of label
Then I see button outside of icon
Then I see banner outside of title
Then I see page outside of content
Then I see page outside of sidebar
Then I see page outside of footer
Then I see wrapper outside of inner
```

## 15. Then I see modal over content

Assert a subject locator overlaps another via intersection and z-index.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*see ((?:[a-zA-Z0-9 ,\-](?!not))+) over ([a-zA-Z0-9 ,\-]+)$/
```

**Examples**

```gherkin
Then I see modal over content
Then I see dropdown over nav
Then I see tooltip over label
Then I see overlay over page
Then I see popup over hero
Then I see sticky header over content
Then I see cookie banner over footer
Then I see dialog over sidebar
Then I see notification over header
Then I see lightbox over page
```

## 16. Then I see header not over content

Assert a subject locator does NOT overlap another element.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*see ([a-zA-Z0-9 ,\-]+) not over ([a-zA-Z0-9 ,\-]+)$/
```

**Examples**

```gherkin
Then I see header not over content
Then I see nav not over sidebar
Then I see footer not over content
Then I see logo not over search
Then I see sidebar not over footer
Then I see menu not over hero
Then I see label not over input
Then I see icon not over title
Then I see button not over form
Then I see nav not over page
```

## 17. Then I see visible header

Assert one or more named locators are visible.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*see visible ([a-zA-Z0-9 ,\-]+)$/
```

**Examples**

```gherkin
Then I see visible header
Then I see visible nav, footer
Then I see visible logo and search
Then I see visible cta
Then I see visible hero, content and sidebar
Then I see visible menu
Then I see visible search button
Then I see visible banner
Then I see visible footer
Then I see visible top bar, nav and content

Advanced:
Mix of components, inline CSS, inline XPath — all resolve:
  When I add "page heading" selector for "h1" css selector
  And  I add "first para" selector for "//p[1]" xpath selector
  Then I see visible page heading, first para
After breakpoint resize — assert still visible:
  Given I am viewing the site on a xs screen
  Then  I see visible heading, list
After loading a selector file — names from file are visible:
  When I add selectors from "homepage-selectors.json" file
  Then I see visible homepage heading, homepage first heading
```

## 18. Then I don't see modal

Assert one or more named locators are hidden.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*(don't|do not) see ([a-zA-Z0-9 ,\-]+)$/
```

**Examples**

```gherkin
Then I don't see modal
Then I don't see dropdown, tooltip
Then I don't see overlay
Then I don't see cookie banner
Then I don't see popup
Then I don't see notification
Then I don't see lightbox
Then I don't see sticky header
Then I don't see dialog
Then I don't see sidebar, overlay and popup
```

## 19. Then I see search has focus

Assert a named locator has keyboard focus.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*see ([a-zA-Z0-9 ,\-]+) has focus$/
```

**Examples**

```gherkin
Then I see search has focus
Then I see email input has focus
Then we see submit button has focus
Then I see username has focus
Then I see password has focus
Then we see search button has focus
Then I see first link has focus
Then I see skip link has focus
Then I see close button has focus
Then I see modal heading has focus
```

## 20. When I move focus to "Title" field

Move keyboard focus to a field by label, name, or id.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*move focus to "([^"]*)" field$/
```

**Examples**

```gherkin
When I move focus to "Title" field
When I move focus to "Body" field
When I move focus to "Email" field
When I move focus to "Search" field
When I move focus to "Username" field
When I move focus to "Password" field
When I move focus to "First name" field
When I move focus to "Last name" field
When I move focus to "Description" field
When I move focus to "Phone" field
```

## 21. When I select all text in "Title" field

Select all text inside a field by label, name, or id.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*select all text in "([^"]*)" field$/
```

**Examples**

```gherkin
When I select all text in "Title" field
When I select all text in "Description" field
When I select all text in "Body" field
When I select all text in "Email" field
When I select all text in "Username" field
When I select all text in "Search" field
When I select all text in "Name" field
When I select all text in "Notes" field
When I select all text in "Address" field
When I select all text in "Message" field
```

## 22. When I select from 0 to 5 text in "Title" field

Select a character range (from..to) inside a field.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*select from (\d+) to (\d+) text in "([^"]*)" field$/
```

**Examples**

```gherkin
When I select from 0 to 5 text in "Title" field
When I select from 0 to 10 text in "Body" field
When I select from 3 to 8 text in "Description" field
When I select from 0 to 5 text in "Email" field
When I select from 2 to 6 text in "Username" field
When we select from 0 to 4 text in "Name" field
When select from 1 to 7 text in "Search" field
When I select from 0 to 20 text in "Notes" field
When I select from 5 to 15 text in "Address" field
When we select from 0 to 3 text in "Phone" field

Advanced:
Select first word after fill:
  And  I fill in "Title" with "Release 2.0 notes"
  When I select from 0 to 7 text in "Title" field
Select middle substring by index range:
  And  I fill in "Body" with "abcdefghij"
  When I select from 3 to 6 text in "Body" field
Chain — fill, focus, range-select, assert focus:
  And  I fill in "Notes" with "hello world"
  When I move focus to "Notes" field
  And  I select from 0 to 5 text in "Notes" field
  Then I see Notes has focus
```

## 23. When I select "title name" text in "Title" field

Select a specific substring of text inside a field.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*select "([^"]*)" text in "([^"]*)" field$/
```

**Examples**

```gherkin
When I select "title name" text in "Title" field
When I select "some content" text in "Description" field
When I select "hello" text in "Body" field
When I select "admin" text in "Username" field
When I select "example" text in "Email" field
When we select "varbase-e2e" text in "Search" field
When select "lorem" text in "Notes" field
When I select "street" text in "Address" field
When we select "555" text in "Phone" field
When I select "summary" text in "Message" field
```

## 24. When I click nav

Click one or more named components — uses locator.click() which auto-scrolls.

The negative lookahead keeps three phrasings out of this greedy pattern —
"the delete button", "on tasks in the toolbar" and "next button in tour" —
because drupal-core / drupal-moderation / varbase own those exact steps and
cucumber-js has no notion of a more-specific match winning.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*click (?!the delete button$|on tasks in the toolbar$|next button in tour$)(?:on |a )?([a-zA-Z0-9 ,\-]+)$/
```

**Examples**

```gherkin
When I click nav
When I click search button
When click cta
When I click on logo
When I click menu
When I click on submit button
When I click close button
When click back button
When I click on forward button
When I click hero, cta

Advanced:
Click via XPath-registered selector:
  When I add "login link xp" selector for "//a[contains(.,'Login')]" xpath selector
  And  I click login link xp
Click a sequence — comma-separated names:
  Given I define css selectors:
    | tab 1 | [data-tab='1'] |
    | tab 2 | [data-tab='2'] |
  When  I click tab 1, tab 2
Register with CSS then click — no components needed:
  When I add "cta primary" selector for ".cta .btn-primary" css selector
  And  I click cta primary
```
