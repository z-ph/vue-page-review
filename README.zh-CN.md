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
- 基于 Element Plus

## 安装

```bash
npm install vue-page-review
```

Peer dependencies：

```bash
npm install vue element-plus @element-plus/icons-vue
```

## 使用

```vue
<script setup>
import { ref } from 'vue'
import { ReviewTool } from 'vue-page-review'
import 'vue-page-review/style.css'

const active = ref(false)
</script>

<template>
  <button @click="active = true">开始评审</button>
  <ReviewTool v-model:active="active" page-path="/dashboard" />
</template>
```

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

## 组合式函数

```js
import { usePageReview } from 'vue-page-review'

const { reviews, addReview, exportToJSON, exportToZIP } = usePageReview({
  storageKey: 'my-reviews'
})
```

## 英文文档

见 [`README.md`](./README.md)。

## 相关

- [react-page-review](https://github.com/z-ph/react-page-review) — React 版本
- [bidding-prototype](https://github.com/z-ph/bidding-prototype) — 使用本组件的示例项目

## License

MIT
