# vue-page-review Principle & Implementation

This document explains the architecture, core feature implementations, and security/performance considerations of `vue-page-review` from the source-code level.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Element Selection Mode](#element-selection-mode)
3. [Viewport Boxing Mode](#viewport-boxing-mode)
4. [Screenshot Implementation](#screenshot-implementation)
5. [localStorage Persistence](#localstorage-persistence)
6. [Component Tree Inspection](#component-tree-inspection)
7. [Export Report Generation](#export-report-generation)
8. [Drag and Resize Interactions](#drag-and-resize-interactions)
9. [Security and Performance](#security-and-performance)

---

## Architecture Overview

The source code is organized into three layers:

| Layer | File | Responsibility |
| --- | --- | --- |
| UI Layer | `src/ReviewTool.vue` | Toolbar, element highlights, boxes, form modal, drawers, review list |
| Core SDK | `src/useReview.js` | localStorage-based state management, CRUD, import/export |
| Utilities | `src/screenshot.js` | `html-to-image` wrappers for screenshots |
| Utilities | `src/inspector.js` | DOM/component tree inspection and locator generation |

The public entry `src/index.js` only exports `ReviewTool` and `usePageReview`. Screenshot and inspector modules are internal implementation details.

---

## Element Selection Mode

### Hover Detection

When review mode is active, the component listens to `mousemove` on `document`:

```js
function onMouseMove(e) {
  if (mode.value !== 'element' || formVisible.value || isDraggingBox.value) return
  const target = getSafeTarget(e)
  if (!target) {
    hoveredRect.value = null
    return
  }
  const rect = target.getBoundingClientRect()
  hoveredRect.value = { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
  hoveredTag.value = target.tagName.toLowerCase()
}
```

`getSafeTarget` filters out events whose target is inside `.review-overlay`, preventing the review UI itself from being selected.

### Click Selection

Selection is handled on the capture phase of `click`:

```js
document.addEventListener('click', onElementClick, true)
```

When a valid target is clicked, `e.preventDefault()` and `e.stopPropagation()` are called, and a selection item containing `el`, `selector`, `tag`, `text`, `rect`, and `docRect` is created.

### Multi-Select and Deselect

- **Single select**: a normal click clears `selectedBoxes` and sets `selectedElements` to the current element.
- **Multi-select**: holding `Ctrl` (Windows/Linux) or `Cmd` (macOS) toggles the element in `selectedElements`.
- **Deselect**: `Ctrl/Cmd`+click an already selected element, or click the `×` icon on the highlight box.
- **Clear all**: the toolbar's "Cancel selection" button calls `clearAllSelections`.

### Scroll Refresh

On page scroll the component updates `scrollPos` and calls `refreshElementRects`:

```js
function onScroll() {
  scrollPos.value = { x: window.scrollX, y: window.scrollY }
  refreshElementRects()
}
```

`refreshElementRects` re-queries each selected element and updates its `rect` so highlight boxes stay aligned.

---

## Viewport Boxing Mode

### Drag to Create a Box

When switched to "Box Viewport" mode, `mousedown` starts a new box:

```js
function onMouseDown(e) {
  if (mode.value !== 'viewport' || formVisible.value || resizingBoxId.value) return
  if (!getSafeTarget(e)) return
  e.preventDefault()
  isDraggingBox.value = true
  dragStart.value = { x: e.clientX, y: e.clientY }
  dragRect.value = { x: e.clientX, y: e.clientY, width: 0, height: 0 }
}
```

`mousemove` updates the preview `dragRect`, and `mouseup` promotes it to `selectedBoxes` if both width and height are greater than 10px.

### Coordinate Calculation and Scroll Handling

Boxes are stored in **document coordinates**:

```js
rect: {
  x: dragRect.value.x + window.scrollX,
  y: dragRect.value.y + window.scrollY,
  width: dragRect.value.width,
  height: dragRect.value.height
}
```

At render time, `toViewportRect` subtracts the current scroll offset to convert back to viewport coordinates:

```js
function toViewportRect(rect) {
  return {
    x: rect.x - scrollPos.value.x,
    y: rect.y - scrollPos.value.y,
    width: rect.width,
    height: rect.height
  }
}
```

This keeps boxes pinned to their original positions even when the page scrolls.

### Resize Handles

Each box has 8 handles: `nw`, `n`, `ne`, `w`, `e`, `sw`, `s`, `se`. Clicking a handle enters resize mode:

```js
function onResizeStart(box, position, e) {
  resizingBoxId.value = box.id
  resizeHandle.value = position
  resizeStart.value = {
    x: e.clientX + window.scrollX,
    y: e.clientY + window.scrollY,
    rect: { ...box.rect }
  }
}
```

`onResizeMove` adjusts width/height or position based on the handle direction, enforcing a 10px minimum:

```js
if (resizeHandle.value.includes('e')) width = Math.max(10, orig.width + dx)
if (resizeHandle.value.includes('s')) height = Math.max(10, orig.height + dy)
if (resizeHandle.value.includes('w')) {
  width = Math.max(10, orig.width - dx)
  x = orig.x + (orig.width - width)
}
if (resizeHandle.value.includes('n')) {
  height = Math.max(10, orig.height - dy)
  y = orig.y + (orig.height - height)
}
```

---

## Screenshot Implementation

The screenshot module wraps `html-to-image`'s `toPng` and exports 5 constants plus helper functions:

```js
export const SCREENSHOT_TYPES = {
  ELEMENT: 'element',
  VIEWPORT: 'viewport',
  FULL_PAGE: 'fullpage',
  BOX: 'box',
  TARGETS: 'targets'
}
```

### Element Screenshot `captureElement`

Calls `toPng` directly on the passed element, defaulting to `window.devicePixelRatio`:

```js
captureElement(el, { pixelRatio, ...options })
```

### Viewport Screenshot `captureViewport`

Captures `document.documentElement` and forces the dimensions to the current viewport while hiding scrollbars:

```js
{
  width: window.innerWidth,
  height: window.innerHeight,
  style: { width: '...', height: '...', overflow: 'hidden' }
}
```

### Full Page Screenshot `captureFullPage`

Temporarily sets `document.documentElement` `overflow` to `visible` and width/height to `auto` to expand all scrollable content, then restores the original styles after capturing.

### Box Screenshot `captureBox`

First captures the full page, then crops the desired region with a Canvas:

```js
function cropDataUrl(dataUrl, rect) {
  const scale = window.devicePixelRatio || 1
  canvas.width = Math.round(rect.width * scale)
  canvas.height = Math.round(rect.height * scale)
  ctx.drawImage(
    img,
    rect.x * scale,
    rect.y * scale,
    rect.width * scale,
    rect.height * scale,
    0, 0, canvas.width, canvas.height
  )
  return canvas.toDataURL('image/png')
}
```

### Upload

`uploadScreenshot` converts a base64 data URL to a `Blob` via `fetch` and passes it to the caller-provided `uploadFn`:

```js
export async function uploadScreenshot(dataUrl, filename, uploadFn) {
  const blob = await dataUrlToBlob(dataUrl)
  return await uploadFn(blob, filename)
}
```

The Vue build also includes `defaultUrlUploader`, which uploads files via `imageUploadUrl` as `multipart/form-data`.

---

## localStorage Persistence

### Key Structure

All review data is stored as a JSON array under a single localStorage key, defaulting to `page-reviews`.

```js
function loadFromStorage() {
  const raw = window.localStorage.getItem(storageKey)
  const list = raw ? JSON.parse(raw) : []
  return list.map(migrateRecord)
}
```

Each record is a complete review object with `id`, `pagePath`, `targets`, `screenshots`, etc. Pages are not stored separately; grouping happens at export/display time by filtering on `pagePath`.

### Data Migration

Older records used a flat structure (e.g. `selector`, `elementRect` directly on the record). `migrateRecord` automatically converts them to the `targets` array format:

```js
export function migrateRecord(record) {
  if (!record || record.targets) return record
  const target = record.type === 'element'
    ? { type: 'element', selector: record.selector, ... }
    : { type: 'viewport', viewportRect: record.viewportRect }
  return { ...record, targets: [target] }
}
```

### Write Strategy

Every mutation (`addReview`, `updateReview`, `deleteReview`, `clearPageReviews`) calls `saveToStorage`, which serializes the entire array and writes it to localStorage. Write failures are silently ignored so the UI is not blocked.

---

## Component Tree Inspection

`inspector.js` collects locator and hierarchy information for the selected element.

### DOM Tree

`getDomTree` walks from the target up to `document.body`, collecting info for each ancestor:

```js
{
  tag, id, classes, selector, xpath,
  rect: { x, y, width, height },
  aria, testId
}
```

### Framework Tree

`getFrameworkTree` tries both Vue and React internals:

- **Vue**: traverses elements and ancestors looking for keys starting with `__vue`, then reads the component name.
- **React**: uses the `__reactFiber$` key to walk the fiber tree and reads `type.displayName` or `type.name`.

If the page is a Vue or React app, the corresponding framework hierarchy is shown in the drawer.

### Locators

`getNodeInfo` produces `locators` containing:

- `cssSelector`: generated from ID, class, and hierarchy.
- `xpath`: sibling-index based XPath.
- `aria`: explicit or implicit ARIA role and accessible name.
- `testId`: the value of the `data-testid` attribute.

These locators are saved with the review record for later automated regression testing.

---

## Export Report Generation

### JSON

`buildReportData` returns:

```js
{
  exportTime: new Date().toISOString(),
  total: reviews.value.length,
  reviews: reviews.value
}
```

### Markdown

`buildMarkdown` groups records by `pagePath` using Chinese headings and fields, including:

- Page heading `## 页面：{pagePath}`
- Each review's title, severity, status, viewport, scroll position, target count, target coordinates, suggestion, and creation time
- Locator subsection
- Screenshot references

### ZIP

`exportToZIP` uses `jszip` to package:

1. `review.json`: replaces the base64 `data` of non-uploaded screenshots with `imagePath: 'images/{filename}'`.
2. `review.md`: Markdown consistent with the JSON structure.
3. `images/`: packs only screenshots without a `url`, stripping the `data:image/png;base64,` prefix.

---

## Drag and Resize Interactions

### Toolbar

- **Drag**: can only be initiated on `.toolbar-title` or `.review-toolbar`.
- **Resize**: the bottom-right `.toolbar-resize-handle` supports southeast resizing with a minimum width of 400px and minimum height of 48px.

### Form Modal

- **Drag**: can only be initiated on `.modal-header`.
- **Resize**: the bottom-right `.modal-resize-handle` with a minimum width of 360px and minimum height of 300px.

### Box Selections

- **Resize**: 8 directional handles.
- **Delete**: `Ctrl/Cmd`+click the box, or click the `×` on the label.
- During resizing the `is-resizing` class disables `pointer-events` on the box to avoid event conflicts.

---

## Security and Performance

### Security

1. **Cross-Origin Resources**: `html-to-image` reads the DOM, images, and fonts when capturing. Cross-origin images/fonts need `crossorigin` attributes or CORS headers; otherwise they may render as blank or fail.
2. **Upload Security**: custom `imageUpload` or `imageUploadUrl` sends screenshots to your server. Make sure the endpoint requires authentication and validates file types.
3. **localStorage Quota**: all data lives in client-side localStorage. Writes fail silently when quota is exceeded. Use an upload function to keep large images off localStorage.
4. **XSS Risk**: review text fields come from user input and are escaped automatically by the framework. Screenshot paths in Markdown reports come from controlled data and should not be rendered as raw untrusted HTML.

### Performance

1. **Event Listeners**: global events are only attached while `active` is true and removed when review mode closes, minimizing idle overhead.
2. **Screenshot Cost**: full-page capture temporarily modifies `document.documentElement` styles and restores them. Large pages may take noticeable time; consider showing a loading indicator.
3. **Base64 Size**: high-DPI screenshots can be very large. Enabling uploads significantly reduces localStorage usage and ZIP size.
4. **Memory Leaks**: `unbindEvents` removes all listeners on component unmount. Generated Blob URLs are cleaned up after a 1-second delay to give automation tools time to observe downloads.
