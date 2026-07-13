# Proposal: restore-element-plus-and-headless-sdk

## Why

`vue-page-review@0.6.0` removed Element Plus entirely in favor of native elements. The result hurt UX:

- Export dropdown opened on hover and closed when the mouse moved away, making it hard to use.
- All toolbar buttons were laid out inline, consuming too much space.
- Custom CSS replaced mature component styles, leading to inconsistent look and accessibility gaps.

At the same time, the package claims to expose SDK capabilities, but `usePageReview` only covers data (localStorage CRUD). All interaction logic — element hover/click selection, multi-select, viewport boxing drag/resize, highlight rendering that follows elements during scroll, and toolbar/modal drag/resize — remains tightly coupled inside `ReviewTool.vue`. Building a custom UI currently requires rewriting almost everything.

We need to restore Element Plus for the default UI while extracting headless composables so users can build their own UI without reimplementing interaction logic.

## What Changes

### UI layer

- Restore `element-plus` and `@element-plus/icons-vue` as **optional peer dependencies** with on-demand import (Vite tree-shaking).
- Replace hover-triggered export dropdown with a click-triggered `el-dropdown`.
- Group secondary toolbar actions into a single dropdown to save space:
  - Primary buttons: 选择元素 / 框定视图, 评审(N), 退出评审
  - Dropdown: 组件树, 评审列表, 导出 Markdown/JSON/ZIP, 取消选择
- Keep modal and drawer draggable/resizable.

### SDK / headless composables

Export new composables from `src/composables/`:

- `useElementSelection` — hover detection, click selection, Ctrl/Cmd multi-select, scroll-following highlight rects.
- `useViewportBoxing` — drag to create boxes, 8-direction resize, multi-box.
- `useDragResize` — generic drag and resize for floating panels (toolbar, modal, custom panels).
- `useHighlightOverlay` — document-to-viewport rect conversion and style helpers.

`ReviewTool.vue` becomes a default UI implementation that reuses these composables. Users who want a custom UI can import the composables directly.

## Impact

- **Specs**: `specs/ui` (UI behavior), `specs/sdk` (public API)
- **Code**: `src/ReviewTool.vue`, `src/index.js`, new files under `src/composables/`
- **Dependencies**: re-add `element-plus` and `@element-plus/icons-vue` as optional peer deps
- **Breaking**: none for existing `ReviewTool` users; new exports are additive
- **Build**: bundle size may increase slightly due to Element Plus tree-shaken imports

## Risks

- Element Plus styling may conflict with host app styles; mitigate by keeping `review-overlay` scoped CSS.
- Headless composables must not depend on the data layer; keep them independent.
