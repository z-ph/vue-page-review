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
- Native HTML elements with custom CSS — no UI framework required
- SDK capabilities exposed via `usePageReview` for custom UI wrappers

## Install

```bash
npm install vue-page-review
```

Peer dependency:

```bash
npm install vue
```

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { ReviewTool } from 'vue-page-review'
import 'vue-page-review/style.css'

const active = ref(false)
</script>

<template>
  <button @click="active = true">Start Review</button>
  <ReviewTool v-model:active="active" page-path="/dashboard" />
</template>
```

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

## Composable

```js
import { usePageReview } from 'vue-page-review'

const { reviews, addReview, exportToJSON, exportToZIP } = usePageReview({
  storageKey: 'my-reviews'
})
```

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
