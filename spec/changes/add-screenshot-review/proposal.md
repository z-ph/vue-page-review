# Proposal: Add Screenshot Capability to Page Review Packages

## Change ID

`add-screenshot-review`

## Why

Currently the page review packages (`vue-page-review` and `react-page-review`) only record metadata about the reviewed element or viewport region (selector, rect, window size, scroll position). When reviewers export feedback, developers still need to manually open the page and locate the exact spot to understand the issue. A picture is often clearer than a selector path.

Adding optional screenshot capture will:
- Make exported review reports self-contained and actionable
- Reduce back-and-forth between reviewers and developers
- Provide evidence of the visual state at the moment the review was created

## What Changes

1. Add screenshot options to the review form for both element and viewport reviews:
   - Capture the currently selected element
   - Capture the boxed viewport region
   - Capture the current viewport
   - Capture the full scrollable page
   All four options are **opt-in**, controlled by checkboxes in the review form.

2. Keep the selected element visually highlighted while the review form is open so the reviewer can confirm which element is being captured.

3. Convert captured image data (canvas/base64) into PNG files.

4. Extend export formats:
   - **JSON export**: embed `screenshots[]` with `type`, `filename`, and either inline `base64` or external `url`.
   - **Markdown export**: render screenshot image links.
   - **ZIP export (new)**: produce a `.zip` containing the review JSON/Markdown file plus an `images/` folder with each screenshot saved as a separate PNG.

5. Support optional image hosting configuration:
   - Accept an `imageUpload` callback prop/function.
   - When provided, upload each screenshot and store only the returned URL in the review record.
   - When not provided, keep base64 data locally and include it in ZIP export.

## Impact

- **API/Props**: New optional props `imageUpload`, `screenshotTypes`, `enableZipExport`.
- **Data model**: Review records gain a `screenshots` array.
- **Bundle size**: Adds canvas-to-blob / html-to-canvas logic; expected increase ~10-20 KB after gzip.
- **Backward compatibility**: Existing review records without `screenshots` continue to work.
- **Dependencies**: Adds `html-to-image` (or equivalent) for DOM/page capture; no backend required.

## Out of Scope

- Video recording
- Cloud storage integration beyond the user-provided `imageUpload` callback
- Editing screenshots after capture
