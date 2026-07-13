# vue-page-review 原理与实现

本文档从源码层面说明 `vue-page-review` 的架构、核心功能实现细节以及安全与性能方面的考虑。

---

## 目录

1. [架构概览](#架构概览)
2. [元素选择模式](#元素选择模式)
3. [框定视图模式](#框定视图模式)
4. [截图实现](#截图实现)
5. [localStorage 持久化](#localstorage-持久化)
6. [组件树检查](#组件树检查)
7. [导出报告生成](#导出报告生成)
8. [拖拽与缩放交互](#拖拽与缩放交互)
9. [安全与性能](#安全与性能)

---

## 架构概览

源码按职责分为三层：

| 层级 | 文件 | 职责 |
| --- | --- | --- |
| UI 层 | `src/ReviewTool.vue` | 工具栏、元素高亮、框选框、表单弹窗、抽屉、评审列表 |
| 核心 SDK | `src/useReview.js` | 基于 localStorage 的状态管理、CRUD、导入导出 |
| 工具层 | `src/screenshot.js` | 基于 `html-to-image` 的截图封装 |
| 工具层 | `src/inspector.js` | DOM/组件树检查、定位信息生成 |

公共入口 `src/index.js` 只导出 `ReviewTool` 与 `usePageReview`，截图与检查模块为内部实现。

---

## 元素选择模式

### 悬停检测

进入评审模式后，组件在 `document` 上监听 `mousemove`：

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

`getSafeTarget` 会过滤掉事件目标位于 `.vpr-review-overlay` 内部的情况，防止评审 UI 自身被选中。

### 点击选择

在 `document` 的 `click` 捕获阶段处理选择：

```js
document.addEventListener('click', onElementClick, true)
```

点击有效目标时，会调用 `e.preventDefault()` 与 `e.stopPropagation()`，并生成一个包含 `el`、`selector`、`tag`、`text`、`rect`、`docRect` 的选择项。

### 多选与取消

- **单选**：普通点击会清空已有 `selectedBoxes`，并将 `selectedElements` 设为当前元素。
- **多选**：按住 `Ctrl`（Windows/Linux）或 `Cmd`（macOS）点击可在 `selectedElements` 中切换该元素。
- **取消选择**：在已选元素上按住 `Ctrl/Cmd` 再次点击，或点击高亮框上的 `×` 图标移除。
- **清空全部**：工具栏“取消选择”按钮调用 `clearAllSelections`。

### 滚动刷新

页面滚动时监听 `scroll`，并调用 `refreshElementRects`：

```js
function onScroll() {
  scrollPos.value = { x: window.scrollX, y: window.scrollY }
  refreshElementRects()
}
```

`refreshElementRects` 会重新查询元素并更新 `rect`，使高亮框始终跟随目标。

---

## 框定视图模式

### 拖拽创建框选

切换到“框定视图”模式后，监听 `mousedown`：

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

`mousemove` 过程中实时更新 `dragRect` 预览框；`mouseup` 时若宽高均大于 10px，则将当前框加入 `selectedBoxes`。

### 坐标计算与滚动处理

框选区域以**文档坐标**保存：

```js
rect: {
  x: dragRect.value.x + window.scrollX,
  y: dragRect.value.y + window.scrollY,
  width: dragRect.value.width,
  height: dragRect.value.height
}
```

渲染时通过 `toViewportRect` 减去当前滚动偏移，转换为视口坐标：

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

这样即使页面滚动，框选区域仍能正确覆盖原始位置。

### 调整大小手柄

每个框选区域有 8 个方向手柄：`nw`, `n`, `ne`, `w`, `e`, `sw`, `s`, `se`。点击手柄进入缩放模式：

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

`onResizeMove` 根据手柄方向调整宽高或位置，并限制最小 10px：

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

## 截图实现

截图模块封装了 `html-to-image` 的 `toPng` 方法，导出 5 个常量与若干函数：

```js
export const SCREENSHOT_TYPES = {
  ELEMENT: 'element',
  VIEWPORT: 'viewport',
  FULL_PAGE: 'fullpage',
  BOX: 'box',
  TARGETS: 'targets'
}
```

### 元素截图 `captureElement`

直接对传入元素调用 `toPng`，使用 `window.devicePixelRatio` 作为默认像素比：

```js
captureElement(el, { pixelRatio, ...options })
```

### 视口截图 `captureViewport`

截取 `document.documentElement`，并强制宽高为当前视口尺寸，同时隐藏滚动条：

```js
{
  width: window.innerWidth,
  height: window.innerHeight,
  style: { width: '...', height: '...', overflow: 'hidden' }
}
```

### 完整页面截图 `captureFullPage`

临时将 `document.documentElement` 的 `overflow` 设为 `visible`，宽高设为 `auto`，以展开全部滚动内容，截图完成后恢复原始样式。

### 框选截图 `captureBox`

先调用 `captureFullPage` 获取整页截图，再用 Canvas 裁剪出指定区域：

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

### 上传

`uploadScreenshot` 将 base64 data URL 通过 `fetch` 转为 `Blob`，再交给调用方传入的 `uploadFn`：

```js
export async function uploadScreenshot(dataUrl, filename, uploadFn) {
  const blob = await dataUrlToBlob(dataUrl)
  return await uploadFn(blob, filename)
}
```

Vue 版还内置了 `defaultUrlUploader`，通过 `imageUploadUrl` 以 `multipart/form-data` 形式上传文件。

---

## localStorage 持久化

### 键结构

所有评审数据以 JSON 数组形式存储在单个 localStorage 键下，默认键名为 `page-reviews`。

```js
function loadFromStorage() {
  const raw = window.localStorage.getItem(storageKey)
  const list = raw ? JSON.parse(raw) : []
  return list.map(migrateRecord)
}
```

每条记录都是一个完整的评审对象，包含 `id`、`pagePath`、`targets`、`screenshots` 等字段。页面分组不是存储结构，而是在导出/展示时通过 `pagePath` 过滤。

### 数据迁移

旧版数据使用扁平结构（如 `selector`、`elementRect` 直接挂在记录上）。`migrateRecord` 会自动将其迁移为 `targets` 数组：

```js
export function migrateRecord(record) {
  if (!record || record.targets) return record
  const target = record.type === 'element'
    ? { type: 'element', selector: record.selector, ... }
    : { type: 'viewport', viewportRect: record.viewportRect }
  return { ...record, targets: [target] }
}
```

### 写入策略

每次 `addReview`、`updateReview`、`deleteReview`、`clearPageReviews` 后都会调用 `saveToStorage`，将当前数组完整序列化写入。写入失败会被静默吞掉，避免阻塞 UI。

---

## 组件树检查

`inspector.js` 负责收集目标元素的定位信息与层级关系。

### DOM 树

`getDomTree` 从目标元素向上遍历到 `document.body`，收集每个祖先节点的信息：

```js
{
  tag, id, classes, selector, xpath,
  rect: { x, y, width, height },
  aria, testId
}
```

### 框架组件树

`getFrameworkTree` 会同时尝试读取 Vue 与 React 的内部属性：

- Vue：遍历元素及祖先，查找以 `__vue` 开头的 key，读取组件名。
- React：通过 `__reactFiber$` key 向上遍历 fiber 树，读取 `type.displayName` 或 `type.name`。

只要页面是 Vue 或 React 应用，就能在抽屉中展示对应的框架组件层级。

### 定位信息

`getNodeInfo` 生成的 `locators` 包括：

- `cssSelector`：基于 ID、class、层级生成的 CSS 选择器。
- `xpath`：基于兄弟索引的 XPath。
- `aria`：显式或隐式 ARIA role 与 accessible name。
- `testId`：`data-testid` 属性值。

这些信息会随评审记录一起保存，便于后续自动化回归测试。

---

## 导出报告生成

### JSON

`buildReportData` 返回：

```js
{
  exportTime: new Date().toISOString(),
  total: reviews.value.length,
  reviews: reviews.value
}
```

### Markdown

`buildMarkdown` 按 `pagePath` 分组，使用中文标题与字段，包括：

- 页面标题 `## 页面：{pagePath}`
- 每条评审的标题、严重等级、状态、窗口尺寸、滚动位置、目标数、目标坐标、建议、创建时间
- 定位信息小节
- 截图引用

### ZIP

`exportToZIP` 通过 `jszip` 打包：

1. `review.json`：将未上传截图的 `data` 替换为 `imagePath: 'images/{filename}'`。
2. `review.md`：与 JSON 结构一致的 Markdown。
3. `images/`：仅打包没有 `url` 的 base64 截图，去掉 `data:image/png;base64,` 前缀后写入。

---

## 拖拽与缩放交互

### 工具栏

- 拖拽：只能在 `.vpr-toolbar-title` 或 `.vpr-review-toolbar` 区域按下并拖动。
- 缩放：右下角 `.vpr-toolbar-resize-handle` 支持东南方向缩放，最小宽度 400px，最小高度 48px。

### 表单弹窗

- 拖拽：只能在 `.el-dialog__header` 区域按下。
- 缩放：右下角 `.vpr-modal-resize-handle`，最小宽度 360px，最小高度 300px。

### 框选区域

- 缩放：8 个方向手柄。
- 删除：按住 `Ctrl/Cmd` 点击整个框，或点击标签上的 `×`。
- 缩放期间 `is-resizing` 类会禁用框的 `pointer-events`，避免事件冲突。

---

## 安全与性能

### 安全

1. **跨域资源**：`html-to-image` 在截图时会读取页面 DOM、图片与字体。跨域图片/字体需配置 `crossorigin` 属性或 CORS，否则可能被截成空白或失败。
2. **上传安全**：自定义 `imageUpload` 或 `imageUploadUrl` 会将截图上传到服务端，请确保接口有认证与文件类型校验。
3. **localStorage 容量**：所有数据保存在客户端 localStorage，超出配额时写入会静默失败。建议配合上传能力将大图上传，避免 base64 撑满存储。
4. **XSS 风险**：评审记录中的文本字段来自用户输入，回显时应由框架自动转义；Markdown 报告中的截图路径来自受控数据，不应直接渲染不可信 HTML。

### 性能

1. **事件监听**：组件只在 `active` 为 true 时挂载全局事件，关闭后移除，减少平时开销。
2. **截图开销**：完整页面截图会临时修改 `document.documentElement` 样式并恢复，大页面可能耗时较长，建议在 UI 上展示加载状态。
3. **base64 体积**：高清屏截图可能非常大，启用上传后可显著降低 localStorage 占用与 ZIP 体积。
4. **内存泄漏**：组件卸载时 `unbindEvents` 会移除所有监听；下载生成的 Blob URL 在 1 秒后清理，兼顾自动化工具捕获需求。
