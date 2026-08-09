# Drupal Canvas steps

12 steps, defined in `tests/step-definitions/drupal-canvas.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I add the "Contact Us" webform to the bottom of the "Contact" Canvas page` |
| 2 | `Then the Drupal Canvas component library should list the "Hero" component` |
| 3 | `When I create a Canvas page "Landing" at "/landing" with the "Hero" component:` |
| 4 | `When I add the "Hero" component to the "Landing" Canvas page using the editor` |
| 5 | `When I publish the Canvas page changes` |
| 6 | `Given there is a new Canvas page "Landing" at "/landing"` |
| 7 | `When I set the Canvas component option "Heading" to "Welcome"` |
| 8 | `When I open the "Landing" Canvas page in the editor` |
| 9 | `When I open the "Patterns" tab in the Canvas Library` |
| 10 | `When I insert the "Hero Slider" pattern from the Canvas Library` |
| 11 | `When I publish the Canvas page changes through the editor` |
| 12 | `Then the Canvas Library "Patterns" tab should list "Hero Slider"` |

---

## 1. When I add the "Contact Us" webform to the bottom of the "Contact" Canvas page

Add a Webform block component to the bottom of a Drupal Canvas page and
publish the page. Drupal Canvas builds pages from a React editor whose
drag-and-drop cannot be driven by a browser test (the drop target lives in a
cross-document iframe), so this step performs the same change the editor
makes by calling Canvas's own authoring API:
  1. resolve the canvas_page id by title,
  2. append a `block.webform_block` component to the page's main content,
  3. POST the updated layout (creates an auto-save),
  4. publish the pending auto-save.

Requires an authenticated user with "publish auto-saves" access (e.g. the
webmaster) — run a login step first. The webform value is the entity
autocomplete format "Label (machine_name)".

Example:
  Given I am a logged in user with the "webmaster" user
   When I add the "Newsletter Subscribe (newsletter_subscribe)" webform to the bottom of the "Home" Canvas page and publish it

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*add the "([^"]*)" webform to the bottom of the "([^"]*)" (?:Canvas )?page(?: and publish(?: it)?)?$/
```

**Examples**

```gherkin
When I add the "Contact Us" webform to the bottom of the "Contact" Canvas page
And I add the "Newsletter" webform to the bottom of the "Home" page and publish it
When we add the "Business Contact" webform to the bottom of the "About Us" Canvas page and publish
And I add the "Feedback" webform to the bottom of the "Support" page
When I add the "Careers" webform to the bottom of the "Jobs" Canvas page and publish it
```

## 2. Then the Drupal Canvas component library should list the "Hero" component

Assert that a component is (or is not) offered in the Drupal Canvas editor's
component library. The editor populates its library from the same
`/canvas/api/v0/config/component` endpoint queried here, so this verifies
what an editor sees when building a page - without driving the React editor.

Requires an authenticated user who can edit Canvas pages (run a login step
and navigate to an admin page first so the request is same-origin).

Example:
  Then the Drupal Canvas component library should list the "block.system_menu_block.main" component

**Keyword**: `Then`

**Pattern**

```js
/^the Drupal Canvas component library should( not)? list the "([^"]*)" component$/
```

**Examples**

```gherkin
Then the Drupal Canvas component library should list the "Hero" component
And the Drupal Canvas component library should list the "Card" component
Then the Drupal Canvas component library should not list the "Legacy Slider" component
And the Drupal Canvas component library should list the "Accordion" component
Then the Drupal Canvas component library should not list the "Deprecated Banner" component
```

## 3. When I create a Canvas page "Landing" at "/landing" with the "Hero" component:

Create (or replace) a published Drupal Canvas page that contains a single
component, configured from a Gherkin data table of input/value rows. The
Canvas editor's drag-and-drop cannot be driven by a browser test, so this
builds the page through Canvas's own content API:
  1. delete any existing page at the same path (idempotent re-runs),
  2. read the live component version (never hard-coded),
  3. POST a new published page whose component tree is that one component
     with the given inputs.

This step is generic: pass any Canvas component id (e.g.
"sdc.vartheme_bs5.card-hero", "block.webform_block"). Boolean-looking values
("true"/"false") are coerced so checkbox props work. Requires a logged-in
user who can create Canvas pages (run a login step first).

Example:
  When I create a Canvas page "Hero - primary" at "/test-hero-primary" with the "sdc.vartheme_bs5.card-hero" component:
    | title            | Primary hero |
    | background_color | bg-primary   |
    | card_border      | true         |

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*create a Canvas page "([^"]*)" at "([^"]*)" with the "([^"]*)" component:$/
```

**Examples**

```gherkin
When I create a Canvas page "Landing" at "/landing" with the "Hero" component:
And I create a Canvas page "Pricing" at "/pricing" with the "Card" component:
When we create a Canvas page "Team" at "/about/team" with the "Grid" component:
And I create a Canvas page "Events" at "/events" with the "Listing" component:
When I create a Canvas page "Support" at "/support" with the "Accordion" component:
```

## 4. When I add the "Hero" component to the "Landing" Canvas page using the editor

Add a component to a Drupal Canvas page the way a human site builder does:
open the page in the Canvas editor, open the Library, find the named
component, and drag it onto the (empty) canvas drop zone. The dropped
component is left selected with its Settings panel open, ready for option
steps. Drupal Canvas renders its drop zones in the top document during an
active drag, so the drag is performed with real pointer moves and only
released once a drop zone reports it is being hovered.

Run a login step first (e.g. the webmaster). Use the component's visible
Library name (e.g. "Hero Card").

Example:
  When I add the "Hero Card" component to the "Test Hero Editor" Canvas page using the editor

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*add the "([^"]*)" component to the "([^"]*)" Canvas page using the editor$/
```

**Examples**

```gherkin
When I add the "Hero" component to the "Landing" Canvas page using the editor
And I add the "Card" component to the "Pricing" Canvas page using the editor
When we add the "Accordion" component to the "Support" Canvas page using the editor
And I add the "Grid" component to the "Team" Canvas page using the editor
When I add the "Listing" component to the "Events" Canvas page using the editor
```

## 5. When I publish the Canvas page changes

Publish the pending changes for the Canvas page currently open in the editor.

The editor's React "Review changes" publish widget is not reliable to drive
headless on CI (it can hang), so this commits through Canvas's own authoring
API - the same endpoints the widget calls: re-POST the page's auto-saved
layout (which the editor's drag-and-drop and Settings-panel edits have
populated) to guarantee a pending auto-save, then POST it to the publish
endpoint. Deterministic and fast, with no editor-UI timing.

Example: When I publish the Canvas page changes

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*publish the Canvas page changes$/
```

**Examples**

```gherkin
When I publish the Canvas page changes
And I publish the Canvas page changes
When we publish the Canvas page changes
Given I publish the Canvas page changes
And we publish the Canvas page changes
```

## 6. Given there is a new Canvas page "Landing" at "/landing"

Create (or replace) an empty published Drupal Canvas page, so a later editor
step can add a component to it the human way. This only sets up the page
container; it does not add components. Idempotent by path.

Example: Given a new Canvas page "Test Hero Editor" at "/test-hero-editor"

**Keyword**: `When`

**Pattern**

```js
/^(?:there is |I have )?a new Canvas page "([^"]*)" at "([^"]*)"$/
```

**Examples**

```gherkin
Given there is a new Canvas page "Landing" at "/landing"
And I have a new Canvas page "Pricing" at "/pricing"
Given a new Canvas page "Team" at "/about/team"
And there is a new Canvas page "Events" at "/events"
Given I have a new Canvas page "Support" at "/support"
```

## 7. When I set the Canvas component option "Heading" to "Welcome"

Set an option on the component currently selected in the Drupal Canvas editor
Settings panel, by its visible field label. Scoped to the component props
form so it never clashes with same-named page fields (e.g. "Title").
Dispatches input/change so Canvas auto-saves the change. Works for text
inputs, textareas and select dropdowns (match the option by its visible text
or its value).

Example:
  When I set the Canvas component option "Background color" to "Primary"
  And  I set the Canvas component option "Title" to "Configured hero"

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*set the Canvas component option "([^"]*)" to "([^"]*)"$/
```

**Examples**

```gherkin
When I set the Canvas component option "Heading" to "Welcome"
And I set the Canvas component option "Style" to "Primary"
When we set the Canvas component option "Alignment" to "Center"
And I set the Canvas component option "Background" to "Light"
When I set the Canvas component option "Link text" to "Read more"
```

## 8. When I open the "Landing" Canvas page in the editor

Open a Canvas page in the real Drupal Canvas editor the way a site builder
does: navigate to /canvas/editor/canvas_page/<id> and wait until the editor
is ready to drive. Drupal Canvas is a heavy React SPA, so readiness is polled
off the left toolbar "Library" button (it can take several seconds to mount)
rather than a fixed sleep.

Resolves the page id by its title, so create the page first (e.g. with a
"a new Canvas page ..." step) and run a login step as a user who can edit
Canvas pages (e.g. the webmaster).

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*open the "([^"]*)" Canvas page in the editor$/
```

**Examples**

```gherkin
When I open the "Landing" Canvas page in the editor
And I open the "Test Pattern Counters" Canvas page in the editor
When we open the "Home" Canvas page in the editor
And we open the "Test Pattern Header Footer" Canvas page in the editor
Given I open the "Pattern Library Check" Canvas page in the editor
```

## 9. When I open the "Patterns" tab in the Canvas Library

Open a named tab in the Drupal Canvas editor Library panel, the way a site
builder browses ready-made sections. Opens the Library panel if it is closed
(idempotent - it never toggles an already-open panel shut), activates the
requested tab, and waits until the tab's list has actually populated (a known
item is visible) so a following assertion or insert reads real, on-screen
content - not an empty, still-loading panel.

Only "Patterns" and "Components" are valid tab names. Open a page in the
editor first.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*open the "(Patterns|Components)" tab in the Canvas Library$/
```

**Examples**

```gherkin
When I open the "Patterns" tab in the Canvas Library
And I open the "Components" tab in the Canvas Library
When we open the "Patterns" tab in the Canvas Library
And we open the "Components" tab in the Canvas Library
Given I open the "Patterns" tab in the Canvas Library
```

## 10. When I insert the "Hero Slider" pattern from the Canvas Library

Insert a default Canvas Pattern into the page open in the editor, exactly as a
site builder does: right-click the pattern's row in the Library > Patterns
list (a context-menu trigger) and choose "Insert". The whole section is added
and the just-inserted component becomes selected, so the editor URL gains a
fresh /component/<uuid>; the step waits for that uuid to change to confirm the
insert registered. Inserting the same pattern twice therefore lands two
independent copies (each gets its own uuid).

Open the page in the editor and open the "Patterns" Library tab first. Use the
pattern's visible human label (e.g. "Hero Slider", "Counters", "Site Header").

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*insert the "([^"]*)" pattern from the Canvas Library$/
```

**Examples**

```gherkin
When I insert the "Hero Slider" pattern from the Canvas Library
And I insert the "Counters" pattern from the Canvas Library
And I insert the "Counters" pattern from the Canvas Library
When we insert the "Site Header" pattern from the Canvas Library
And we insert the "Site Footer" pattern from the Canvas Library
```

## 11. When I publish the Canvas page changes through the editor

Publish the pending Canvas changes through the editor's own Review/Publish
widget, the way a site builder ships a page: click the topbar "Review N
change(s)" button, "Select All" in the review list, then "Publish N selected".
The step waits until the topbar widget resets to "No changes", confirming the
publish landed. Drupal Canvas's review list is site-wide, so "Select All"
publishes every pending change; drive this right after inserting on the page
under test so only that page's changes are pending.

Open a page in the editor and make at least one change (e.g. insert a pattern)
first.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*publish the Canvas page changes through the editor$/
```

**Examples**

```gherkin
When I publish the Canvas page changes through the editor
And I publish the Canvas page changes through the editor
When we publish the Canvas page changes through the editor
And we publish the Canvas page changes through the editor
Then I publish the Canvas page changes through the editor
```

## 12. Then the Canvas Library "Patterns" tab should list "Hero Slider"

Assert that a Drupal Canvas Library panel does (or does not) list an item by
its visible label. Scoped to the panel element by CSS selector (e.g. the
Patterns or Components tab content) and read straight from the panel's
on-screen text - the labels a site builder actually sees, not any API dump.

This is the fast, panel-scoped counterpart of the generic "I should see ... in
the ... element" assertion: it reads the panel's innerText once and checks the
label against the panel's line items, so a library with a dozen checks stays
quick and never trips a step timeout. Matches a whole line item exactly (so
"Share" does not match "Social media menu" and an absent admin label is never
a false positive from a longer entry).

The panel selector is resolved from the named-selector registry
(tests/selectors/<preset>.json): the "Patterns" tab maps to the
"canvas patterns library" selector and "Components" to
"canvas components library", so the feature reads by tab name and the CSS
lives in one place. Open the page in the editor and open that Library tab
first.

**Keyword**: `Then`

**Pattern**

```js
/^the Canvas Library "(Patterns|Components)" tab should( not)? list "([^"]*)"$/
```

**Examples**

```gherkin
Then the Canvas Library "Patterns" tab should list "Hero Slider"
And the Canvas Library "Patterns" tab should list "Counters"
Then the Canvas Library "Components" tab should list "Webform"
And the Canvas Library "Components" tab should not list "Events Feed"
And the Canvas Library "Components" tab should not list "Recent pages"
```
