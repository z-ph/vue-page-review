# Fix Drawer Z-Index Above Selected Highlights

## 问题

Vue 包使用 ElementPlus `el-drawer` 渲染「评审列表」和「组件树」抽屉。`el-drawer` 默认 `append-to-body`，其默认 `z-index` 约为 2000。而页面评审浮层 `.review-overlay` 的 `z-index` 为 9000，已选元素高亮 `.highlight-box` 与框选 `.drag-rect` 的 `z-index` 为 9100。因此当用户打开抽屉时，已选高亮和框选会覆盖在抽屉之上，遮挡内容并可能拦截点击。

## 目标

确保评审列表抽屉和组件树抽屉的层级始终高于评审浮层及其内部的高亮/框选元素，避免视觉遮挡和交互冲突。

## 方案

为两个 `el-drawer` 显式设置 `:z-index="10003"`，高于 `.review-modal`（10002）、`.modal-backdrop`（10001）以及 `.highlight-box`/`.drag-rect`（9100），与 React 包的自定义抽屉层级保持一致。

## 影响范围

- `src/ReviewTool.vue`：两个 `el-drawer` 增加 `z-index` 属性
- 版本号提升至 `0.5.1`
