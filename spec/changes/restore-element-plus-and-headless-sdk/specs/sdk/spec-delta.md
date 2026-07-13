## ADDED Requirements

### Requirement: 暴露 useElementSelection
WHEN 用户从 `vue-page-review` 导入 `useElementSelection`
THEN 系统 SHALL 提供元素选择的完整交互逻辑
AND 不渲染任何 UI
AND 返回 hover/selected 状态与操作方法

#### Scenario: 自定义 UI 使用 useElementSelection
GIVEN 用户构建自定义评审 UI
WHEN 用户调用 `useElementSelection({ active, mode })`
THEN 返回 `hoveredRect`、`hoveredTag`、`selectedElements`、`selectedBoxes`
AND 返回 `selectElement`、`deselectElement`、`clearSelections`、`refreshRects`

### Requirement: 暴露 useViewportBoxing
WHEN 用户从 `vue-page-review` 导入 `useViewportBoxing`
THEN 系统 SHALL 提供框定视图的完整交互逻辑
AND 不渲染任何 UI
AND 返回框选状态与 resize API

#### Scenario: 自定义框选 UI
GIVEN 用户构建自定义评审 UI
WHEN 用户调用 `useViewportBoxing({ active, mode })`
THEN 返回 `selectedBoxes`、`dragRect`、`isDraggingBox`
AND 返回 `addBox`、`removeBox`、`clearBoxes`、`startResize`、`resizeBox`

### Requirement: 暴露 useDragResize
WHEN 用户从 `vue-page-review` 导入 `useDragResize`
THEN 系统 SHALL 提供通用面板拖拽与尺寸调整逻辑
AND 不渲染任何 UI

#### Scenario: 自定义可拖动面板
GIVEN 用户构建自定义评审 UI
WHEN 用户调用 `useDragResize({ initialPosition, initialSize })`
THEN 返回 `position`、`size`、`isDragging`、`isResizing`
AND 返回 `startDrag`、`startResize`
