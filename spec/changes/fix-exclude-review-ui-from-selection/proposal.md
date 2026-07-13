# Fix Review UI Self-Selection

## 问题

点击评审工具栏的「导出」按钮或其下拉菜单项时，评审工具会误把评审 UI 自身（或下拉菜单项）当作页面元素选中。用户希望点击评审组件自身的按钮时只触发按钮功能，不要开启元素选择。

根本原因是：
1. `getSafeTarget` 仅排除 `.review-overlay` 内部的元素。
2. Vue 包使用 ElementPlus 的 `el-dropdown`，其下拉菜单默认 `append-to-body`，不在 `.review-overlay` 内，因此绕过排除逻辑。
3. 捕获阶段的全局点击监听在按钮自身逻辑之前执行，导致选中逻辑误触发。

## 目标

确保评审工具栏、下拉菜单、弹窗、抽屉等所有评审 UI 元素都不会被元素选择或框选模式选中。

## 方案

1. 扩展 `getSafeTarget`：排除 `.review-overlay` 内部元素，同时排除 ElementPlus 弹出层相关元素（`.el-dropdown-menu`、`.el-popper`、`.el-overlay` 等）。
2. 扩展框选模式的 `onMouseDown`：同样排除上述 UI 元素，避免在下拉菜单上开始框选。
3. 元素选择事件仅在确认目标为页面元素后才调用 `preventDefault` / `stopPropagation`。

## 影响范围

- `src/ReviewTool.vue`：`getSafeTarget`、`onMouseDown` 的排除逻辑
- 版本号提升
