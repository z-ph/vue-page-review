# vue-page-review

一个 Vue 3 页面评审工具，支持元素选择、框定视图、截图、localStorage 持久化以及 Markdown / JSON / ZIP 导出。

## 特性

- 元素评审：悬停高亮，点击标注
- 视口评审：拖拽框选区域
- 多选与框选调整：支持 Ctrl/Cmd 多选、调整大小
- 截图：可选选中目标、当前视口、完整页面
- 可拖动工具栏与评审弹窗
- localStorage 持久化
- 导出：JSON / Markdown / ZIP（含截图）
- Element Plus 为可选 peer dependency，默认 UI 按需引入
- 无头 composables，可完全自定义评审 UI

## 安装

```bash
npm install vue-page-review
```

Peer dependency：

```bash
npm install vue
```

如果使用默认的 `ReviewTool` UI，还需安装可选 peer dependencies（只使用无头 composables 则不需要）：

```bash
npm install element-plus @element-plus/icons-vue
```

## 使用

```vue
<script setup>
import { ref } from 'vue'
import { ReviewTool } from 'vue-page-review'
import 'element-plus/dist/index.css' // 默认 UI 需要

const active = ref(false)
</script>

<template>
  <button @click="active = true">开始评审</button>
  <ReviewTool v-model:active="active" page-path="/dashboard" />
</template>
```

> **注意**：`vue-page-review` 自身的样式会在 `ReviewTool` 挂载时自动注入（`<style id="vpr-styles">`）。手动 `import 'vue-page-review/style.css'` 是可选的，仅为向后兼容或覆盖样式保留。

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `active` | `Boolean` | `false` | 控制评审浮层显示 |
| `pagePath` | `String` | 当前路径 | 页面标识，用于分组评审 |
| `pageName` | `String` | `pagePath` | 页面显示名称 |
| `storageKey` | `String` | `'page-reviews'` | localStorage 键名 |
| `enableComponentTree` | `Boolean` | `true` | 是否显示组件树按钮 |
| `enableZipExport` | `Boolean` | `true` | 是否启用 ZIP 导出 |
| `imageUploadUrl` | `String` | - | 截图上传图床地址 |

## 数据组合式函数

```js
import { usePageReview } from 'vue-page-review'

const { reviews, addReview, exportToJSON, exportToZIP } = usePageReview({
  storageKey: 'my-reviews'
})
```

## 无头 Composables

`ReviewTool` 底层的交互逻辑已抽成独立 composables（不渲染任何 UI，也不依赖 Element Plus），可用于构建完全自定义的评审 UI：

```js
import { ref } from 'vue'
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

- `useElementSelection`：悬停检测、点击选择、Ctrl/Cmd 多选、滚动后高亮矩形跟随。返回 `hoveredRect`、`hoveredTag`、`selectedElements`、`selectElement`、`removeSelectedElement`、`clearSelectedElements`、`refreshRects`。
- `useViewportBoxing`：拖拽创建框选、8 方向调整大小、多框选。返回 `selectedBoxes`、`dragRect`、`resizingBoxId`、`removeBox`、`clearBoxes`、`startResize`、`toViewportRect`。
- `useDragResize`：通用浮动面板拖拽与缩放（工具栏、弹窗、自定义面板）。返回 `position`、`size`、`isDragging`、`isResizing`、`onDragStart`、`onResizeStart`。

## 详细文档

- [使用对接文档](./docs/usage.md)
- [原理与实现](./docs/principle.md)

## 英文文档

见 [`README.md`](./README.md) / [`usage.en.md`](./docs/usage.en.md) / [`principle.en.md`](./docs/principle.en.md)。

## 相关

- [react-page-review](https://github.com/z-ph/react-page-review) — React 版本
- [bidding-prototype](https://github.com/z-ph/bidding-prototype) — 使用本组件的示例项目

## License

MIT
