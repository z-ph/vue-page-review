## MODIFIED Requirements

### Requirement: 高亮滚动跟随
WHEN 评审模式激活且页面滚动
THEN 已选元素的高亮框 SHALL 始终跟随对应元素移动（无论当前处于元素模式还是框选模式）
AND 已框选的区域 SHALL 始终跟随其文档位置移动（无论当前处于元素模式还是框选模式）

#### Scenario: 元素模式下滚动时框选跟随
GIVEN 用户已框选一个区域并切换到元素模式
WHEN 用户滚动页面
THEN 框选区域 SHALL 随文档滚动更新位置，而非固定在视口

#### Scenario: 框选模式下滚动时元素高亮跟随
GIVEN 用户已选中一个元素并切换到框选模式
WHEN 用户滚动页面
THEN 元素高亮框 SHALL 随该元素移动，而非固定在视口

### Requirement: 截图内容纯净
WHEN 用户导出包含截图的评审（选中目标 / 当前视口 / 完整页面）
THEN 截图 SHALL 只包含被评审页面自身内容
AND 截图 SHALL NOT 包含评审工具栏、评审弹窗、抽屉、高亮框等评审工具自身 UI

#### Scenario: 完整页面截图不含弹窗
GIVEN 评审弹窗已打开且用户勾选「完整页面」截图
WHEN 用户保存评审
THEN 生成的完整页面截图中不出现评审弹窗与工具栏
