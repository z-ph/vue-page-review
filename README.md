# vue-page-review

> 一个 Vue 3 页面评审工具，支持元素选择、框定视图、截图、localStorage 持久化以及 Markdown / JSON / ZIP 导出。
>
> A Vue 3 page review tool for collecting UI feedback through element selection, viewport boxing, screenshots, localStorage persistence, and Markdown / JSON / ZIP export.

## 特性 / Features

- 元素评审：悬停高亮，点击标注 / Element review: hover to highlight, click to annotate
- 视口评审：拖拽框选区域 / Viewport review: drag to box a region
- 多选与框选调整：支持 Ctrl/Cmd 多选、调整大小 / Multi-select and box resizing with Ctrl/Cmd
- 截图：可选选中目标、当前视口、完整页面 / Screenshots: target, viewport, full page
- 可拖动工具栏与评审弹窗 / Draggable toolbar and review modal
- localStorage 持久化 / localStorage persistence
- 导出：JSON / Markdown / ZIP（含截图）/ Export to JSON / Markdown / ZIP (with screenshots)
- 基于 Element Plus UI / Built on Element Plus

## 安装 / Install

```bash
npm install vue-page-review
```

Peer dependencies:

```bash
npm install vue element-plus @element-plus/icons-vue
```

## 使用 / Usage

```vue
<script setup>
import { ref } from 'vue'
import { ReviewTool } from 'vue-page-review'
import 'vue-page-review/style.css'

const active = ref(false)
</script>

<template>
  <button @click="active = true">开始评审 / Start Review</button>
  <ReviewTool v-model:active="active" page-path="/dashboard" />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `Boolean` | `false` | 控制评审浮层显示 / Controls review overlay visibility |
| `pagePath` | `String` | current path | 页面标识，用于分组评审 / Page identifier for grouping reviews |
| `pageName` | `String` | `pagePath` | 页面显示名称 / Display name of the page |
| `storageKey` | `String` | `'page-reviews'` | localStorage 键名 / localStorage key |
| `enableComponentTree` | `Boolean` | `true` | 是否显示组件树按钮 / Show component tree button |
| `enableZipExport` | `Boolean` | `true` | 是否启用 ZIP 导出 / Enable ZIP export |
| `imageUploadUrl` | `String` | - | 截图上传图床地址 / Image upload endpoint |

## 组合式函数 / Composable

```js
import { usePageReview } from 'vue-page-review'

const { reviews, addReview, exportToJSON, exportToZIP } = usePageReview({
  storageKey: 'my-reviews'
})
```

## 相关 / Related

- [react-page-review](https://github.com/z-ph/react-page-review) — React 版本 / React version
- [bidding-prototype](https://github.com/z-ph/bidding-prototype) — 使用本组件的示例项目 / Example project using this package

## License

MIT
