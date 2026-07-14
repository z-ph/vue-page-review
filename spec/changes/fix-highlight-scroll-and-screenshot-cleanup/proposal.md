# Proposal: 修复高亮跟随失效与截图包含评审 UI

## Change ID

`fix-highlight-scroll-and-screenshot-cleanup`

## Why

与 react-page-review 相同的两个缺陷（vue 版从 react 版移植，bug 同款；线上真实使用反馈 `page-reviews-20260714-1228.zip` 已证实 react 侧问题，vue 侧代码模式一致必然存在）：

1. **高亮跟随失效（严重）**：同时使用「选中元素」和「框定视图」后，滚动页面时只有当前模式的高亮会跟随，另一种高亮变成相对视口固定。

   根因：`src/composables/useElementSelection.js:18` 与 `src/composables/useViewportBoxing.js:26` 的 `isEnabled = active && mode === '<当前模式>'`，scroll 监听（分别见 `:111`、`:145`）挂在 `isEnabled` 上，切换模式后另一个 composable 的 scroll 监听被移除，矩形不再刷新。

2. **截图包含评审 UI（严重）**：导出的截图里包含评审工具栏、「添加评审意见」弹窗等评审工具自身 UI，截图应当只呈现被评审的页面本身。

   根因：`src/ReviewTool.vue` 的 `captureScreenshots`（`:704`）截取时 `.vpr-review-overlay`（工具栏、弹窗、抽屉、高亮全部在其中）处于可见状态，缺少 react 侧已补齐的隐藏逻辑。

## What Changes

1. **滚动跟随与模式解耦**：两个 composable 中，scroll 监听与矩形刷新改为只依赖 `active`（评审激活即生效），不依赖当前 `mode`；mousemove/click/mousedown 等交互监听仍按模式门控（`useViewportBoxing` 保留 `resizingBoxId` 例外）。即：
   - 元素模式下滚动，框选区域照常跟随文档
   - 框选模式下滚动，元素高亮照常跟随元素
2. **截图前隐藏评审 UI**：`captureScreenshots` 执行期间将 `.vpr-review-overlay` 设为 `display: none`，双层 rAF 等待后截取，结束后在 `finally` 中恢复；仅当确有截图任务（`selectedScreenshots.length > 0`）时隐藏，避免无截图时弹窗提前消失导致竞态。覆盖三种截图类型（选中目标 / 当前视口 / 完整页面）。

## Impact

- **代码**：`src/composables/useElementSelection.js`、`src/composables/useViewportBoxing.js`、`src/ReviewTool.vue`
- **行为**：混合模式下两种高亮始终正确跟随；所有导出截图不再包含评审工具自身 UI
- **无破坏性变更**：composable 对外 API 不变；无头使用者如需相同行为可参照实现

## 验证

- vue-test-app 端到端（`test-vue-e2e.cjs`）新增用例：
  - 元素选中 + 框选共存，元素模式下滚动，断言框选区域位置随滚动更新
  - 框选模式下滚动，断言元素高亮位置随滚动更新
  - 勾选完整页面截图并保存，用 MutationObserver 记录断言截取期间 `.vpr-review-overlay` 曾为 `display:none`，导出 ZIP 解码 PNG 校验合法性
- 既有 27 项 e2e 全部保持通过
