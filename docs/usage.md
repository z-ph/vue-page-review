# vue-page-review 使用对接文档

`vue-page-review` 是一个用于在 Vue 3 页面中收集 UI 评审意见的组件库。它提供开箱即用的 `ReviewTool` 组件，以及一个可独立使用的核心钩子 `usePageReview`，方便你搭建自定义评审界面。

---

## 目录

1. [安装与依赖](#安装与依赖)
2. [基础集成：使用 ReviewTool 组件](#基础集成使用-reviewtool-组件)
3. [高级集成：使用 usePageReview 构建自定义 UI](#高级集成使用-usepagereview-构建自定义-ui)
4. [Props 完整参考](#props-完整参考)
5. [Events / 回调](#events--回调)
6. [截图选项说明](#截图选项说明)
7. [导出格式](#导出格式)
8. [图片上传配置](#图片上传配置)
9. [自定义样式](#自定义样式)
10. [Vue 3 注意事项](#vue-3-注意事项)
11. [最小可运行示例](#最小可运行示例)

---

## 安装与依赖

### 安装

```bash
# pnpm
pnpm add vue-page-review

# npm
npm install vue-page-review

# yarn
yarn add vue-page-review
```

### Peer Dependencies

`vue-page-review` 需要 Vue 3 环境：

```json
{
  "vue": "^3.3.0"
}
```

### 引入样式

组件依赖自带的 CSS，请在入口或页面中引入：

```js
import 'vue-page-review/style.css'
```

### 运行时依赖

库内部依赖 `html-to-image` 与 `jszip`，已打包进产物，无需额外安装。

---

## 基础集成：使用 ReviewTool 组件

最简单的用法是挂载 `ReviewTool`，并通过 `v-model:active` 控制评审模式的开关。

```vue
<script setup>
import { ref } from 'vue'
import { ReviewTool } from 'vue-page-review'
import 'vue-page-review/style.css'

const active = ref(false)
</script>

<template>
  <div>
    <button @click="active = true">进入评审模式</button>
    <ReviewTool v-model:active="active" page-name="首页" />
  </div>
</template>
```

### 交互说明

1. 点击“进入评审模式”后，页面顶部会出现评审工具栏。
2. 工具栏可在“选择元素”与“框定视图”两种模式间切换。
3. 选择目标后点击“评审 (N)”打开表单，填写标题、严重等级与建议后保存。
4. 已保存的评审会按页面路径分组，可在“评审列表”抽屉中查看、导出或删除。

---

## 高级集成：使用 usePageReview 构建自定义 UI

如果你需要完全自定义界面，可以直接使用核心钩子 `usePageReview`。

```js
import { usePageReview } from 'vue-page-review'

const {
  reviews,              // Vue ref，所有评审记录
  allReviews,           // () => reviews.value
  getPageReviews,       // (pagePath?) => 当前页记录
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

### 选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `storageKey` | `string` | `'page-reviews'` | localStorage 键名 |
| `defaultPagePath` | `() => string` | `() => window.location.pathname + window.location.search` | 默认页面路径 |

### 返回的响应式数据

- `reviews`：所有评审记录的 `ref` 数组。
- `allReviews()`：返回当前 `reviews.value`。
- `getPageReviews(pagePath?)`：按页面路径过滤评审。

### 增删改查

- `addReview(payload)`：新增一条记录，自动补充 `id` 与 `createdAt`。
- `updateReview(id, updates)`：合并更新指定记录。
- `deleteReview(id)`：删除记录。
- `clearPageReviews(pagePath?)`：清空某页记录。
- `clearAllReviews()`：清空全部记录。

### 导出

- `exportToJSON()`：下载 `page-reviews-YYYYMMDD-HHMM.json`。
- `exportToMarkdown()`：下载 Markdown 报告。
- `exportToZIP()`：异步下载包含 JSON、Markdown 与截图的 ZIP。

> **注意**：`screenshot.js` 与 `inspector.js` 是 `ReviewTool` 内部使用的工具模块，未通过公共入口导出。如需完全自定义截图或元素检查，建议直接使用 `html-to-image` 等底层能力。

---

## Props 完整参考

| Prop | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `active` | `boolean` | `false` | 否 | 是否进入评审模式。支持 `v-model:active`。 |
| `pagePath` | `string` | `''` | 否 | 当前页面路径。留空时自动取 `window.location.pathname + window.location.search`。 |
| `pageName` | `string` | `''` | 否 | 页面名称，用于报告展示。留空时回退到 `pagePath`。 |
| `storageKey` | `string` | `'page-reviews'` | 否 | localStorage 键名。 |
| `imageUpload` | `(blob: Blob, filename: string) => Promise<string>` | `null` | 否 | 自定义截图上传函数，返回图片 URL。 |
| `imageUploadUrl` | `string` | `''` | 否 | **Vue 版特有**。指定上传地址，组件会使用内置默认上传器 POST 截图。 |
| `enableZipExport` | `boolean` | `true` | 否 | 是否显示 ZIP 导出选项。 |
| `enableComponentTree` | `boolean` | `true` | 否 | 是否显示“组件树”按钮与抽屉。 |

### 关于 `imageUpload` 与 `imageUploadUrl` 的优先级

- 如果同时传入 `imageUpload` 与 `imageUploadUrl`，优先使用 `imageUpload`。
- 两者都未提供时，截图以 base64 `data:` URL 形式保存在本地数据中。

---

## Events / 回调

| 事件名 | 触发时机 | 参数 |
| --- | --- | --- |
| `update:active` | 点击“退出评审”或按 `Esc` 关闭评审模式时 | `boolean` |
| `add` | 成功保存一条评审记录后 | 完整的评审记录对象 |
| `update` | 将评审标记为“已解决”后 | `{ id, status: 'resolved' }` |
| `delete` | 删除单条评审后 | `{ id }` |
| `clear` | 清空当前页面所有评审后 | `{ pagePath }` |

> 注意：组件源码中声明了 `export` 事件，但当前版本未在导出操作完成后触发。

### 使用示例

```vue
<ReviewTool
  v-model:active="active"
  page-name="商品详情"
  @add="(record) => console.log('新增评审', record)"
  @update="({ id }) => console.log('已解决', id)"
  @delete="({ id }) => console.log('已删除', id)"
/>
```

---

## 截图选项说明

在评审表单中，用户可以选择以下截图类型：

| 截图类型 | 内部常量 | 说明 |
| --- | --- | --- |
| 选中目标 | `SCREENSHOT_TYPES.TARGETS` | 为每个选中的元素或框选区域截图。元素使用 `captureElement`，框选区域使用 `captureBox`。 |
| 当前视口 | `SCREENSHOT_TYPES.VIEWPORT` | 截取当前浏览器可视区域，使用 `captureViewport`。 |
| 完整页面 | `SCREENSHOT_TYPES.FULL_PAGE` | 截取包含滚动区域的完整页面，使用 `captureFullPage`。 |

截图结果以对象数组形式保存在评审记录的 `screenshots` 字段：

```ts
{
  type: 'element' | 'viewport' | 'fullpage',
  filename: string,
  data?: string,   // base64 data URL，未上传时存在
  url?: string     // 上传后的远程地址
}
```

---

## 导出格式

### JSON

`exportToJSON` 生成如下结构：

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

`exportToMarkdown` 按 `pagePath` 分组，生成中文报告：

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

`exportToZIP` 生成的压缩包结构：

```
page-reviews-YYYYMMDD-HHMM.zip
├── review.json          // 报告 JSON，screenshots 引用 images/ 下文件
├── review.md            // Markdown 报告
└── images/
    ├── screenshot-element-....png
    └── screenshot-fullpage-....png
```

若截图已上传（存在 `url`），ZIP 中的 JSON/Markdown 会直接引用远程 URL，不再打包 base64 图片。

---

## 图片上传配置

### 自定义上传函数 `imageUpload`

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

### 使用上传地址 `imageUploadUrl`（Vue 版特有）

```vue
<ReviewTool v-model:active="active" image-upload-url="/api/upload" />
```

内置默认上传器行为：

1. 以 `multipart/form-data` 方式 POST，字段名为 `file`。
2. 期望响应：
   - JSON：`{ url: 'https://...' }` 或 `{ data: { url: 'https://...' } }`
   - 纯文本：直接作为图片 URL
3. 上传成功后，截图记录只保留 `url`，不再保存 base64 数据。

---

## 自定义样式

默认样式通过 `vue-page-review/style.css` 引入。你可以在自己的 CSS 中覆盖类名。

### 常见可覆盖类名

| 类名 | 说明 |
| --- | --- |
| `.review-overlay` | 评审浮层根节点，`pointer-events: none`，z-index 9000 |
| `.review-toolbar` | 顶部工具栏，z-index 10000 |
| `.highlight-box` / `.selected-box` / `.hover-box` | 元素高亮框 |
| `.drag-rect` | 框选区域 |
| `.resize-handle` | 框选区域 8 个调整大小手柄 |
| `.review-modal` | 评审表单弹窗，z-index 10002 |
| `.review-drawer` | 右侧抽屉，z-index 10003 |

### 示例：修改主题色

```css
.review-toolbar {
  background: #1a1a1a;
  color: #fff;
}

.highlight-box.selected-box {
  border-color: #ff5722;
  background: rgba(255, 87, 34, 0.12);
}
```

---

## Vue 3 注意事项

1. **Teleport**：`ReviewTool` 使用 Vue 3 `<teleport to="body">` 渲染到 `body`，避免受父级样式影响。
2. **事件监听**：进入 `active` 后，组件会在 `document` 上绑定 `mousemove/click/mousedown/mouseup/keydown/scroll` 等事件；关闭或组件卸载时会移除。
3. **`v-model:active`**：等同于 `:active` + `@update:active`。
4. **模板引用**：组件通过 `defineExpose` 暴露了以下属性和方法：
   - `reviews`
   - `pageReviews`
   - `addReview`、`updateReview`、`deleteReview`、`clearPageReviews`
   - `exportToJSON`、`exportToMarkdown`
5. **SSR 安全**：所有访问 `window` / `document` 的代码都判断了运行环境，服务端渲染时不会报错。

---

## 最小可运行示例

```vue
<!-- App.vue -->
<script setup>
import { ref } from 'vue'
import { ReviewTool } from 'vue-page-review'
import 'vue-page-review/style.css'

const active = ref(false)
const upload = async (blob, filename) => {
  // 示例：直接返回一个 data URL，实际应上传到 CDN
  return URL.createObjectURL(blob)
}

function onAdd(record) {
  console.log('新增评审', record)
}
</script>

<template>
  <div class="app">
    <h1>我的页面</h1>
    <button @click="active = true">进入评审模式</button>

    <ReviewTool
      v-model:active="active"
      page-name="我的页面"
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

运行后点击按钮即可进入评审模式，选择页面元素、填写表单并导出报告。
