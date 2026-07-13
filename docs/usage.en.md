# vue-page-review Usage & Integration Guide

`vue-page-review` is a Vue 3 library for collecting UI review feedback on a page. It ships with a ready-to-use `ReviewTool` component and a standalone core hook `usePageReview` for building custom review UIs.

---

## Table of Contents

1. [Installation and Peer Dependencies](#installation-and-peer-dependencies)
2. [Basic Integration with the ReviewTool Component](#basic-integration-with-the-reviewtool-component)
3. [Advanced Integration with usePageReview](#advanced-integration-with-usepagereview)
4. [Headless Interaction Composables](#headless-interaction-composables)
5. [Complete Props Reference](#complete-props-reference)
6. [Events / Callbacks](#events--callbacks)
7. [Screenshot Options](#screenshot-options)
8. [Export Formats](#export-formats)
9. [Image Upload Configuration](#image-upload-configuration)
10. [Customizing Styles](#customizing-styles)
11. [Vue 3 Notes](#vue-3-notes)
12. [Minimal Runnable Example](#minimal-runnable-example)

---

## Installation and Peer Dependencies

### Install

```bash
# pnpm
pnpm add vue-page-review

# npm
npm install vue-page-review

# yarn
yarn add vue-page-review
```

### Peer Dependencies

`vue-page-review` requires a Vue 3 environment:

```json
{
  "vue": "^3.3.0"
}
```

If you use the default `ReviewTool` UI, also install the **optional** peer dependencies (not needed if you only use the headless composables):

```bash
pnpm add element-plus @element-plus/icons-vue
```

The default UI imports Element Plus components by name (tree-shakable). You also need to import the Element Plus styles in your entry:

```js
import 'element-plus/dist/index.css'
```

### Import Styles

`vue-page-review`'s own styles are **injected automatically** when `ReviewTool` mounts (a `<style id="vpr-styles">` tag is appended to `document.head`, idempotently). The manual import below still works and is kept only for backward compatibility or for overriding styles:

```js
import 'vue-page-review/style.css'
```

### Runtime Dependencies

The library bundles `html-to-image` and `jszip` internally, so no extra installation is needed.

---

## Basic Integration with the ReviewTool Component

The simplest integration is to mount `ReviewTool` and control review mode with `v-model:active`.

```vue
<script setup>
import { ref } from 'vue'
import { ReviewTool } from 'vue-page-review'
import 'element-plus/dist/index.css' // required by the default UI

const active = ref(false)
</script>

<template>
  <div>
    <button @click="active = true">Enter Review Mode</button>
    <ReviewTool v-model:active="active" page-name="Home" />
  </div>
</template>
```

### Interaction Overview

1. Click "Enter Review Mode" to show the floating review toolbar.
2. Toggle between **Select Element** and **Box Viewport** modes.
3. After selecting targets, click **Review (N)** to open the form.
4. Fill in title, severity, and suggestion, then save.
5. Saved reviews are grouped by page path and can be viewed, exported, or deleted from the review list drawer.

---

## Advanced Integration with usePageReview

If you need a fully custom UI, use the core hook `usePageReview` directly.

```js
import { usePageReview } from 'vue-page-review'

const {
  reviews,              // Vue ref of all review records
  allReviews,           // () => reviews.value
  getPageReviews,       // (pagePath?) => records for the page
  addReview,            // (payload) => record
  updateReview,         // (id, updates) => void
  deleteReview,         // (id) => void
  clearPageReviews,     // (pagePath?) => void
  clearAllReviews,      // () => void
  exportToJSON,         // () => void
  exportToMarkdown,     // () => void
  exportToZIP           // async () => void
} = usePageReview({
  storageKey: 'page-reviews',
  defaultPagePath: () => window.location.pathname + window.location.search
})
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `storageKey` | `string` | `'page-reviews'` | localStorage key name |
| `defaultPagePath` | `() => string` | `() => window.location.pathname + window.location.search` | Default page path |

### Reactive Data

- `reviews`: a `ref` array of all review records.
- `allReviews()`: returns `reviews.value`.
- `getPageReviews(pagePath?)`: filters records by page path.

### CRUD Operations

- `addReview(payload)`: adds a record and auto-generates `id` and `createdAt`.
- `updateReview(id, updates)`: merges updates into the target record.
- `deleteReview(id)`: deletes the record.
- `clearPageReviews(pagePath?)`: clears records for a page.
- `clearAllReviews()`: clears all records.

### Exports

- `exportToJSON()`: downloads `page-reviews-YYYYMMDD-HHMM.json`.
- `exportToMarkdown()`: downloads a Markdown report.
- `exportToZIP()`: asynchronously downloads a ZIP containing JSON, Markdown, and screenshots.

> **Note**: `screenshot.js` and `inspector.js` are internal utilities used by `ReviewTool` and are **not** exported from the public entry. If you build a fully custom UI, use `html-to-image` directly for screenshots.

---

## Headless Interaction Composables

If `usePageReview` is not enough and you want to reuse the low-level selection, boxing, drag, and resize logic behind `ReviewTool` (no UI rendered, no Element Plus required), import the headless composables directly:

```vue
<script setup>
import { ref } from 'vue'
import {
  useElementSelection,
  useViewportBoxing,
  useDragResize
} from 'vue-page-review'

const active = ref(true)
const mode = ref('element')
const onIgnoreTarget = (target) => !!target.closest('.my-review-overlay')

const { hoveredRect, selectedElements } = useElementSelection({ active, mode, onIgnoreTarget })
const { selectedBoxes, startResize: startBoxResize } = useViewportBoxing({
  active,
  mode,
  onIgnoreTarget,
  onBoxCreate: (box, e) => console.log('box created', box)
})
const { position, size, onDragStart, onResizeStart } = useDragResize({
  initialPosition: { x: 0, y: 0 },
  initialSize: { width: 400, height: null },
  isDragHandle: (target) => target.classList?.contains('my-panel-header')
})
</script>

<template>
  <div class="my-review-overlay">
    <div
      v-if="hoveredRect"
      class="my-highlight-box"
      :style="{
        left: hoveredRect.x + 'px',
        top: hoveredRect.y + 'px',
        width: hoveredRect.width + 'px',
        height: hoveredRect.height + 'px'
      }"
    />
    <div
      class="my-panel"
      :style="{
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
        width: size.width + 'px'
      }"
      @mousedown="onDragStart"
    >
      <div class="my-panel-header">Draggable panel</div>
      <div class="my-panel-resize" @mousedown.stop="onResizeStart" />
    </div>
  </div>
</template>
```

### Composable API Cheat Sheet

| Composable | Purpose | Main returns (all refs) |
| --- | --- | --- |
| `useElementSelection({ active, mode, onIgnoreTarget })` | Element hover / selection | `hoveredRect`, `hoveredTag`, `selectedElements`, `selectElement`, `removeSelectedElement`, `clearSelectedElements`, `refreshRects` |
| `useViewportBoxing({ active, mode, onIgnoreTarget, onBoxCreate })` | Viewport boxing | `selectedBoxes`, `dragRect`, `resizingBoxId`, `removeBox`, `clearBoxes`, `startResize`, `toViewportRect` |
| `useDragResize({ initialPosition, initialSize, isDragHandle, minWidth, minHeight, measureRef })` | Panel drag / resize | `position`, `size`, `isDragging`, `isResizing`, `onDragStart`, `onResizeStart` |

These composables **do not depend on** `usePageReview`; they only manage interaction state and can be combined with any data layer. `active` / `mode` accept either refs or plain values.

---

## Complete Props Reference

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `active` | `boolean` | `false` | No | Whether review mode is active. Supports `v-model:active`. |
| `pagePath` | `string` | `''` | No | Current page path. Falls back to `window.location.pathname + window.location.search` if empty. |
| `pageName` | `string` | `''` | No | Page name used in reports. Falls back to `pagePath` if empty. |
| `storageKey` | `string` | `'page-reviews'` | No | localStorage key name. |
| `imageUpload` | `(blob: Blob, filename: string) => Promise<string>` | `null` | No | Custom screenshot upload function returning an image URL. |
| `imageUploadUrl` | `string` | `''` | No | **Vue only**. Upload endpoint; the component uses the built-in default uploader to POST screenshots. |
| `enableZipExport` | `boolean` | `true` | No | Whether to show the ZIP export option. |
| `enableComponentTree` | `boolean` | `true` | No | Whether to show the component tree button and drawer. |

### `imageUpload` vs `imageUploadUrl`

- If both are provided, `imageUpload` takes precedence.
- If neither is provided, screenshots are kept as base64 `data:` URLs in local data.

---

## Events / Callbacks

| Event | When It Fires | Payload |
| --- | --- | --- |
| `update:active` | When the user clicks "Exit" or presses `Esc` to close review mode | `boolean` |
| `add` | After a review record is saved | Full review record object |
| `update` | After a review is marked resolved | `{ id, status: 'resolved' }` |
| `delete` | After a single review is deleted | `{ id }` |
| `clear` | After all reviews on the current page are cleared | `{ pagePath }` |

> Note: the component declares an `export` event, but the current version does not emit it after export operations.

### Example

```vue
<ReviewTool
  v-model:active="active"
  page-name="Product Detail"
  @add="(record) => console.log('added', record)"
  @update="({ id }) => console.log('resolved', id)"
  @delete="({ id }) => console.log('deleted', id)"
/>
```

---

## Screenshot Options

The review form lets users choose the following screenshot types:

| Option | Internal Constant | Description |
| --- | --- | --- |
| Selected targets | `SCREENSHOT_TYPES.TARGETS` | Capture each selected element or boxed area. Elements use `captureElement`; boxes use `captureBox`. |
| Current viewport | `SCREENSHOT_TYPES.VIEWPORT` | Capture the visible browser viewport using `captureViewport`. |
| Full page | `SCREENSHOT_TYPES.FULL_PAGE` | Capture the entire scrollable page using `captureFullPage`. |

Screenshots are stored as an array in the record's `screenshots` field:

```ts
{
  type: 'element' | 'viewport' | 'fullpage',
  filename: string,
  data?: string,   // base64 data URL when not uploaded
  url?: string     // remote URL after upload
}
```

---

## Export Formats

### JSON

`exportToJSON` produces:

```json
{
  "exportTime": "2026-07-13T05:59:47.373Z",
  "total": 2,
  "reviews": [
    {
      "id": "rv-...",
      "type": "element",
      "title": "...",
      "severity": "high",
      "suggestion": "...",
      "targets": [...],
      "viewport": { "width": 1920, "height": 1080 },
      "scroll": { "x": 0, "y": 200 },
      "pagePath": "/dashboard",
      "pageUrl": "https://example.com/dashboard",
      "pageName": "Dashboard",
      "status": "open",
      "screenshots": [...],
      "createdAt": "2026-07-13T05:59:47.373Z"
    }
  ]
}
```

### Markdown

`exportToMarkdown` groups records by `pagePath`:

```markdown
# 页面评审报告

导出时间：2026/7/13 13:59:47
评审总数：2

## 页面：/dashboard

### 1. 按钮样式不统一
- **严重等级**：高
- **状态**：待处理
- **窗口尺寸**：1920 × 1080
- **滚动位置**：x=0, y=200
- **评审目标数**：1
  - 目标 1（元素）：`.btn.primary` x=..., y=..., w=..., h=...
- **评审建议**：建议统一主按钮颜色。
- **创建时间**：2026/7/13 13:59:47

#### 截图
![element](images/screenshot-element-....png)
```

### ZIP

`exportToZIP` creates a ZIP archive with this structure:

```
page-reviews-YYYYMMDD-HHMM.zip
├── review.json          // report JSON; screenshots reference images/
├── review.md            // Markdown report
└── images/
    ├── screenshot-element-....png
    └── screenshot-fullpage-....png
```

If a screenshot has already been uploaded (`url` present), JSON/Markdown reference the remote URL and the image is not bundled as base64.

---

## Image Upload Configuration

### Custom Upload Function `imageUpload`

```vue
<script setup>
async function uploadImage(blob, filename) {
  const formData = new FormData()
  formData.append('file', blob, filename)
  const res = await fetch('/api/upload', { method: 'POST', body: formData })
  if (!res.ok) throw new Error('upload failed')
  const data = await res.json()
  return data.url
}
</script>

<ReviewTool v-model:active="active" :image-upload="uploadImage" />
```

### Upload Endpoint `imageUploadUrl` (Vue only)

```vue
<ReviewTool v-model:active="active" image-upload-url="/api/upload" />
```

The built-in default uploader:

1. POSTs the file as `multipart/form-data` with field name `file`.
2. Expects one of these response shapes:
   - JSON: `{ url: 'https://...' }` or `{ data: { url: 'https://...' } }`
   - Plain text: treated as the image URL
3. On success, only the `url` is kept; the base64 data is discarded.

---

## Customizing Styles

Default styles are injected automatically when `ReviewTool` mounts (`<style id="vpr-styles">`), or can be imported manually via `import 'vue-page-review/style.css'`. All custom classes use the `vpr-` prefix; override them in your own CSS.

### Commonly Overridden Classes

| Class | Description |
| --- | --- |
| `.vpr-review-overlay` | Review overlay root, `pointer-events: none`, z-index 9000 |
| `.vpr-review-toolbar` | Top floating toolbar, z-index 10000 |
| `.vpr-highlight-box` / `.vpr-selected-box` / `.vpr-hover-box` | Element highlight boxes |
| `.vpr-drag-rect` | Box-selection areas |
| `.vpr-resize-handle` | Eight resize handles on box selections |
| `.vpr-review-dialog` | Review form dialog (el-dialog), z-index 10002 |
| `.vpr-drawer-layer` | Right-side drawer overlay (el-drawer), z-index 10003 |

### Example: Theme Override

```css
.vpr-review-toolbar {
  background: #1a1a1a;
  color: #fff;
}

.vpr-highlight-box.vpr-selected-box {
  border-color: #ff5722;
  background: rgba(255, 87, 34, 0.12);
}
```

---

## Vue 3 Notes

1. **Teleport**: `ReviewTool` renders via Vue 3 `<teleport to="body">` so it is not affected by parent layout or `overflow` styles.
2. **Event Listeners**: when `active` becomes true, the component attaches `mousemove`, `click`, `mousedown`, `mouseup`, `keydown`, and `scroll` listeners to `document`; they are removed when review mode closes or the component unmounts.
3. **`v-model:active`**: equivalent to `:active` plus `@update:active`.
4. **Template Refs**: the component exposes the following via `defineExpose`:
   - `reviews`
   - `pageReviews`
   - `addReview`, `updateReview`, `deleteReview`, `clearPageReviews`
   - `exportToJSON`, `exportToMarkdown`
5. **SSR Safe**: all `window` / `document` access is guarded by environment checks, so server-side rendering will not throw.

---

## Minimal Runnable Example

```vue
<!-- App.vue -->
<script setup>
import { ref } from 'vue'
import { ReviewTool } from 'vue-page-review'
import 'element-plus/dist/index.css' // required by the default UI

const active = ref(false)
const upload = async (blob, filename) => {
  // Example: return a local object URL. In production, upload to your CDN.
  return URL.createObjectURL(blob)
}

function onAdd(record) {
  console.log('added review', record)
}
</script>

<template>
  <div class="app">
    <h1>My Page</h1>
    <button @click="active = true">Enter Review Mode</button>

    <ReviewTool
      v-model:active="active"
      page-name="My Page"
      page-path="/demo"
      :image-upload="upload"
      @add="onAdd"
    />
  </div>
</template>

<style>
.app {
  padding: 40px;
}
</style>
```

Click the button to enter review mode, select page elements, fill out the form, and export the report.
