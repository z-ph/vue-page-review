## ADDED Requirements

### Requirement: 点击触发导出下拉
WHEN 用户点击工具栏上的导出按钮
THEN 系统 SHALL 显示导出选项下拉菜单
AND 下拉菜单 SHALL 保持显示直到用户选择选项或点击外部

#### Scenario: 打开导出菜单
GIVEN 评审模式已激活
WHEN 用户点击导出按钮
THEN 显示包含「导出为 Markdown」「导出为 JSON」「导出为 ZIP」的下拉菜单

#### Scenario: 选择导出格式
GIVEN 导出菜单已打开
WHEN 用户点击「导出为 ZIP」
THEN 系统 SHALL 导出 ZIP 文件
AND 关闭下拉菜单

### Requirement: 工具栏按钮分组
WHEN 评审工具栏显示
THEN 系统 SHALL 将主要操作（模式切换、评审、退出评审）直接展示为按钮
AND 系统 SHALL 将次要操作（组件树、评审列表、导出、取消选择）收进一个下拉菜单

#### Scenario: 打开次要操作菜单
GIVEN 评审模式已激活
WHEN 用户点击「更多」或类似下拉触发器
THEN 显示包含组件树、评审列表、导出选项、取消选择的菜单

## MODIFIED Requirements

### Requirement: 默认 UI 使用 Element Plus
WHEN 用户安装并使用 `ReviewTool` 组件
THEN 系统 SHALL 通过 element-plus 渲染工具栏、弹窗、抽屉和表单
AND element-plus SHALL 作为可选 peer dependency 提供

#### Scenario: 安装依赖
GIVEN 用户项目中已安装 Vue 3
WHEN 用户安装 `vue-page-review`
THEN 用户 SHALL 自行安装 `element-plus` 与 `@element-plus/icons-vue`
AND `vue-page-review` 不应强制安装 element-plus
