# Proposal: 评审列表抽屉头部操作收敛为下拉菜单

## Change ID

`compact-drawer-header-actions`

## Why

评审列表抽屉头部平铺了 4 个按钮（导出 Markdown、导出 JSON、导出 ZIP、清空本页），违反已确立的 UX 原则：「次要操作收进下拉，不要一股脑塞按钮占位置」（工具栏已按此原则改造为「更多」下拉）。同时平铺按钮在窄宽度抽屉中会挤压头部布局（React 姊妹包在 antd v5 宿主下已实测导致关闭按钮被遮挡不可点）。

## What Changes

1. 评审列表抽屉头部（#header 插槽）的 4 个按钮收敛为单个「操作」下拉菜单（el-dropdown，click 触发）：导出 Markdown、导出 JSON、导出 ZIP、（分隔线）清空本页（danger）。
2. 各操作的触发逻辑（导出格式、清空确认弹窗）完全不变。
3. 组件树抽屉无头部操作，不涉及。

## Impact

- **代码**：`src/ReviewTool.vue`
- **行为**：抽屉头部只显示一个「操作」按钮，点击展开菜单。
- **无破坏性变更**：对外 props/emit 不变。

## 验证

- vue-test-app 端到端：抽屉头部下拉可打开、4 项齐全、导出 JSON/Markdown/ZIP 正常、清空确认正常、关闭按钮可点击关闭。
