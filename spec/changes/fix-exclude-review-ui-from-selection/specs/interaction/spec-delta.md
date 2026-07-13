# 交互规范差异：排除评审 UI 自身被选中

## 当前状态

- 元素模式通过 `getSafeTarget` 判断点击目标。
- 仅当目标在 `.review-overlay` 内时才排除。
- ElementPlus 弹出层（dropdown、popper、drawer 遮罩等）默认 teleport 到 body，不在 `.review-overlay` 内。

## 问题表现

1. 点击工具栏「导出」下拉菜单项，菜单项被当作页面元素选中。
2. 在框定视图模式下，点击下拉菜单可能误触发框选拖拽。
3. 选中后高亮框覆盖在 UI 上，干扰后续操作。

## 变更后

- `getSafeTarget` 额外排除以下元素及其子元素：
  - `.review-overlay` 内所有元素
  - `.el-dropdown-menu`（ElementPlus 下拉菜单）
  - `.el-popper`（ElementPlus 弹出层容器）
  - `.el-overlay`（ElementPlus 抽屉/弹窗遮罩）
- `onMouseDown` 在框选模式使用同样的排除逻辑。
- 仅当 `getSafeTarget` 返回有效页面元素时，才阻止默认事件和传播。

## 验收标准

1. 点击「导出」按钮或下拉菜单项，不选中任何元素，正常导出。
2. 在框定视图模式下，点击工具栏、下拉菜单、弹窗、抽屉，不开始框选。
3. 选中页面元素后，再点击评审 UI 按钮，不会新增或替换选择。
