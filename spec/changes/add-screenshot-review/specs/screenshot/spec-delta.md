# Spec Delta: Screenshot Capability

## ADDED Requirements

### Requirement: Optional Screenshot Capture
WHEN a reviewer creates an element review,
系统 SHALL allow the reviewer to optionally capture one or more screenshots of:
- the selected element,
- the current viewport,
- the full scrollable page.

#### Scenario: Element review with element screenshot
GIVEN the reviewer has selected an element and the review form is open
WHEN the reviewer checks "Capture selected element"
THEN the system captures a PNG screenshot of the selected element
AND stores it in the review record.

#### Scenario: Element review with viewport screenshot
GIVEN the reviewer has selected an element and the review form is open
WHEN the reviewer checks "Capture viewport"
THEN the system captures a PNG screenshot of the current viewport
AND stores it in the review record.

#### Scenario: Element review with full-page screenshot
GIVEN the reviewer has selected an element and the review form is open
WHEN the reviewer checks "Capture full page"
THEN the system captures a PNG screenshot of the entire scrollable page
AND stores it in the review record.

### Requirement: Optional Screenshot Capture for Viewport Reviews
WHEN a reviewer creates a viewport (boxed-region) review,
系统 SHALL allow the reviewer to optionally capture one or more screenshots of:
- the boxed region,
- the current viewport,
- the full scrollable page.

#### Scenario: Viewport review with boxed-region screenshot
GIVEN the reviewer has dragged a boxed region and the review form is open
WHEN the reviewer checks "Capture boxed region"
THEN the system captures a PNG screenshot of the boxed region
AND stores it in the review record.

#### Scenario: Viewport review with viewport screenshot
GIVEN the reviewer has dragged a boxed region and the review form is open
WHEN the reviewer checks "Capture viewport"
THEN the system captures a PNG screenshot of the current viewport
AND stores it in the review record.

#### Scenario: Viewport review with full-page screenshot
GIVEN the reviewer has dragged a boxed region and the review form is open
WHEN the reviewer checks "Capture full page"
THEN the system captures a PNG screenshot of the entire scrollable page
AND stores it in the review record.

### Requirement: Maintain Selection Highlight During Form Editing
WHILE the review form is open,
系统 SHALL keep the selected element or boxed region visually highlighted
SO THAT the reviewer can confirm which content will be captured.

#### Scenario: Element highlight persists
GIVEN the reviewer clicked an element and the review form is visible
WHEN the form remains open
THEN the selected element retains its red highlight overlay.

#### Scenario: Boxed region highlight persists
GIVEN the reviewer dragged a boxed region and the review form is visible
WHEN the form remains open
THEN the boxed region retains its dashed green overlay.

### Requirement: Image Upload Callback
WHEN the package consumer provides an `imageUpload` callback,
系统 SHALL upload each captured screenshot through that callback
AND store only the returned URL in the review record.

#### Scenario: Upload succeeds
GIVEN an `imageUpload` callback is configured
WHEN a review with screenshots is saved
THEN each screenshot is passed to `imageUpload(blob, filename)`
AND the review record stores `{ type, filename, url }`.

#### Scenario: No upload callback
GIVEN no `imageUpload` callback is configured
WHEN a review with screenshots is saved
THEN the review record stores `{ type, filename, data: base64 }`.

### Requirement: ZIP Export
WHEN the reviewer exports reviews as ZIP,
系统 SHALL create an archive containing:
- the review data file (JSON or Markdown),
- an `images/` folder with each screenshot saved as a separate PNG file.

#### Scenario: ZIP export with local base64 images
GIVEN reviews contain screenshots stored as base64
WHEN the reviewer clicks "Export ZIP"
THEN a `.zip` file is downloaded
AND the archive contains `review.json` (or `review.md`)
AND the archive contains `images/screenshot-{type}-{id}.png` for each screenshot.

#### Scenario: ZIP export with URL-only images
GIVEN reviews contain screenshots stored as URLs
WHEN the reviewer clicks "Export ZIP"
THEN the review data file references the URL
AND no local PNG file is created for URL-only screenshots.

### Requirement: JSON Export Includes Screenshots
WHEN the reviewer exports reviews as JSON,
系统 SHALL include a `screenshots` array for each review.

#### Scenario: JSON export with base64 screenshot
GIVEN a review has one base64 screenshot
WHEN the reviewer exports JSON
THEN the exported object contains `reviews[0].screenshots[0].data` as a base64 string.

### Requirement: Markdown Export Includes Screenshots
WHEN the reviewer exports reviews as Markdown,
系统 SHALL render each screenshot as an image link below the review description.

#### Scenario: Markdown export with local image
GIVEN a review has a base64 screenshot
WHEN the reviewer exports Markdown
THEN the report contains `![screenshot](images/screenshot-{type}-{id}.png)`.

#### Scenario: Markdown export with URL image
GIVEN a review has a URL-only screenshot
WHEN the reviewer exports Markdown
THEN the report contains `![screenshot]({url})`.

## MODIFIED Requirements

None.

## REMOVED Requirements

None.
