# Fix Review Layer Scroll Positioning

## 问题

当前评审浮层 `.review-overlay` 使用 `position: fixed`，而其内部的高亮框和框选框使用文档坐标（`clientX + scrollX` / `getBoundingClientRect() + scroll`）进行定位。由于父容器固定视口，子元素实际按视口坐标解析，导致：

1. **元素高亮不跟随元素滚动**：选中元素并滚动页面后，高亮框停留在原来的视口位置，不再覆盖该元素。
2. **框选区域与鼠标区域错位**：滚动后再框选，或先框选再滚动，框选框的实际位置与鼠标指示的文档区域不一致。

## 目标

让已选元素高亮和框选框始终与对应的文档位置保持一致，滚动时自动跟随内容移动。

## 方案

1. 继续以文档坐标存储元素高亮和框选框的位置（`x = clientX + scrollX`）。
2. 渲染时根据当前滚动位置换算为视口坐标（`viewportX = docX - scrollX`）。
3. 监听 `window` 的 `scroll` 事件，滚动时重新计算所有高亮和框选框的视口坐标并刷新渲染。
4. 元素高亮在滚动时优先通过 selector 重新查询元素当前的 `getBoundingClientRect()`，以应对布局变化；若元素消失则保留最后一次位置。

## 影响范围

- `src/ReviewTool.vue`：坐标计算、新增滚动监听与位置刷新逻辑
- 版本号提升
