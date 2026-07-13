# vue-page-review

A Vue 3 page review tool for collecting UI feedback through element selection, viewport boxing, screenshots, localStorage persistence, and Markdown / JSON / ZIP export.

## Features

- Element review: hover to highlight, click to annotate
- Viewport review: drag to box a region
- Multi-select and box resizing with Ctrl/Cmd
- Screenshots: target, viewport, full page
- Draggable toolbar and review modal
- localStorage persistence
- Export to JSON / Markdown / ZIP (with screenshots)
- Optional Element Plus peer dependency for the default UI (on-demand import)
- Headless composables for building a fully custom review UI

## Install

```bash
npm install vue-page-review
```

Peer dependency:

```bash
npm install vue
```

If you use the default `ReviewTool` UI, also install the optional peer dependencies (not needed if you only use the headless composables):

```bash
npm install element-plus @element-plus/icons-vue
```

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { ReviewTool } from 'vue-page-review'
import 'element-plus/dist/index.css' // required by the default UI

const active = ref(false)
</script>

<template>
  <button @click="active = true">Start Review</button>
  <ReviewTool v-model:active="active" page-path="/dashboard" />
</template>
```

> **Note:** `vue-page-review`'s own styles are injected automatically when `ReviewTool` mounts (a `<style id="vpr-styles">` tag). The manual `import 'vue-page-review/style.css'` is optional and kept only for backward compatibility or for overriding styles.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `Boolean` | `false` | Controls review overlay visibility |
| `pagePath` | `String` | current path | Page identifier for grouping reviews |
| `pageName` | `String` | `pagePath` | Display name of the page |
| `storageKey` | `String` | `'page-reviews'` | localStorage key |
| `enableComponentTree` | `Boolean` | `true` | Show component tree button |
| `enableZipExport` | `Boolean` | `true` | Enable ZIP export |
| `imageUploadUrl` | `String` | - | Image upload endpoint |

## Data Composable

```js
import { usePageReview } from 'vue-page-review'

const { reviews, addReview, exportToJSON, exportToZIP } = usePageReview({
  storageKey: 'my-reviews'
})
```

## Headless Composables

The interaction logic behind `ReviewTool` is exposed as standalone composables (no UI rendered, no Element Plus required), so you can build a fully custom review UI:

```js
import { ref, computed } from 'vue'
import {
  useElementSelection,
  useViewportBoxing,
  useDragResize
} from 'vue-page-review'

const active = ref(true)
const mode = ref('element')
const onIgnoreTarget = (target) => !!target.closest('.my-review-overlay')

const selection = useElementSelection({ active, mode, onIgnoreTarget })
const boxing = useViewportBoxing({ active, mode, onIgnoreTarget })
const panel = useDragResize({
  initialPosition: { x: 0, y: 0 },
  initialSize: { width: 400, height: null },
  isDragHandle: (target) => target.classList?.contains('my-panel-header')
})
```

- `useElementSelection` — hover detection, click selection, Ctrl/Cmd multi-select, and scroll-following highlight rects. Returns `hoveredRect`, `hoveredTag`, `selectedElements`, `selectElement`, `removeSelectedElement`, `clearSelectedElements`, `refreshRects`.
- `useViewportBoxing` — drag-to-create boxes, 8-direction resize, and multi-box support. Returns `selectedBoxes`, `dragRect`, `resizingBoxId`, `removeBox`, `clearBoxes`, `startResize`, `toViewportRect`.
- `useDragResize` — generic drag and resize for floating panels (toolbar, modal, custom panels). Returns `position`, `size`, `isDragging`, `isResizing`, `onDragStart`, `onResizeStart`.

## Chinese Documentation

See [`README.zh-CN.md`](./README.zh-CN.md).

## Detailed Documentation

- [Usage Guide](./docs/usage.en.md)
- [Principle & Implementation](./docs/principle.en.md)

## Related

- [react-page-review](https://github.com/z-ph/react-page-review) — React version
- [bidding-prototype](https://github.com/z-ph/bidding-prototype) — Example project using this package

## License

MIT
