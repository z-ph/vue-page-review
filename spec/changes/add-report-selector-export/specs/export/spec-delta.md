# Spec Delta: Report Selector and Accessibility Export

## ADDED Requirements

### Requirement: Store Multiple Locators per Review
WHEN a review is saved,
系统 SHALL compute and store a `locators` object for the target element containing:
- a stable CSS selector,
- an absolute XPath,
- ARIA role and accessible name,
- the value of any `data-testid` attribute.

#### Scenario: Element with data-testid
GIVEN the reviewed element has `data-testid="submit-button"`
WHEN the review is saved
THEN the review record contains `locators.testId = "submit-button"`.

#### Scenario: Element with ARIA role
GIVEN the reviewed element is `<button aria-label="Submit">`
WHEN the review is saved
THEN the review record contains `locators.aria.role = "button"`
AND `locators.aria.accessibleName = "Submit"`.

### Requirement: JSON Export Includes Locators
WHEN reviews are exported as JSON,
系统 SHALL include the `locators` object in each review record.

#### Scenario: JSON export with locators
GIVEN a review has locators computed
WHEN the reviewer exports JSON
THEN the exported JSON contains `reviews[0].locators.cssSelector`, `reviews[0].locators.xpath`, and `reviews[0].locators.aria`.

### Requirement: Markdown Export Includes Locators
WHEN reviews are exported as Markdown,
系统 SHALL include a "定位信息" section for each review listing the CSS selector, XPath, ARIA role, accessible name, and data-testid.

#### Scenario: Markdown export with CSS selector
GIVEN a review has `locators.cssSelector = "#app > button"`
WHEN the reviewer exports Markdown
THEN the report contains a "定位信息" section with `- **CSS Selector**: `#app > button``.

### Requirement: ZIP Export Includes Locators
WHEN reviews are exported as ZIP,
系统 SHALL include the same locator data in the bundled JSON/Markdown file.

#### Scenario: ZIP contains locator data
GIVEN a review has locators computed
WHEN the reviewer exports ZIP
THEN the extracted `review.json` contains `locators` for that review.

### Requirement: Omit Empty Locators
IF a locator value is unavailable,
系统 SHALL omit that field from the `locators` object rather than storing `null` or an empty string.

#### Scenario: No ARIA role
GIVEN the reviewed element has no ARIA role
WHEN the review is saved
THEN `locators.aria.role` is not present in the record.

## MODIFIED Requirements

None.

## REMOVED Requirements

None.
