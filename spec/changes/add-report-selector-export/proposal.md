# Proposal: Add Selector and Accessibility Export to Reports

## Change ID

`add-report-selector-export`

## Why

Review reports are consumed by developers and automation tools. A plain-text selector like `div#app > section > main > div` is fragile. Including multiple locator strategies — CSS selector, ARIA role/name, and accessibility-aware selectors — makes reports more robust and easier to use with testing frameworks (Playwright, Cypress, Selenium) and screen-reader tooling.

## What Changes

1. When a review is created, compute and store the following locators for the target element:
   - `cssSelector`: a stable CSS selector
   - `xpath`: an absolute XPath expression
   - `aria.role`: the element's ARIA role
   - `aria.accessibleName`: the accessible name
   - `aria.labeledBy`: the id of the element referenced by `aria-labelledby`
   - `testId`: the value of `data-testid` if present

2. Extend JSON export so each review includes a `locators` object with the fields above.

3. Extend Markdown export to include a "定位信息" section listing:
   - CSS selector (as inline code)
   - XPath
   - ARIA role / accessible name
   - data-testid

4. Extend ZIP export so the JSON/Markdown file contains the same locator data.

5. Keep these locators optional: if an element has no ARIA role, `aria.role` is omitted; if there is no `data-testid`, `testId` is omitted.

## Impact

- **Data model**: Review records gain a `locators` object.
- **Export formats**: JSON, Markdown, and ZIP exports are extended.
- **Backward compatibility**: Existing records without `locators` continue to work; exports simply omit the section.
- **Bundle size**: Negligible increase (only DOM inspection helpers).

## Out of Scope

- User-facing ARIA/CSS selection modes
- Generating Playwright/Cypress code from reports
- Automatic locator repair when the DOM changes
