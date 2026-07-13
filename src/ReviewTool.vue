<template>
  <teleport to="body">
    <div v-if="active" class="vpr-review-overlay">
      <!-- 顶部工具栏 -->
      <div
        ref="toolbarRef"
        class="vpr-review-toolbar"
        :class="{ 'vpr-is-dragging': isDraggingToolbar }"
        :style="toolbarStyle"
        @click.stop
        @mousedown="onToolbarDragStart"
      >
        <div class="vpr-toolbar-left">
          <span class="vpr-toolbar-title" title="按住此处可拖动">页面评审模式</span>
          <el-radio-group v-model="mode" size="small">
            <el-radio-button value="element">选择元素</el-radio-button>
            <el-radio-button value="viewport">框定视图</el-radio-button>
          </el-radio-group>
        </div>
        <div class="vpr-toolbar-right">
          <el-badge :value="selectedCount">
            <el-button
              type="primary"
              size="small"
              :disabled="selectedCount === 0"
              @click="openReviewForm"
            >
              评审
            </el-button>
          </el-badge>
          <el-button type="danger" size="small" @click="close">退出评审</el-button>
          <el-dropdown
            trigger="click"
            placement="bottom-end"
            popper-class="vpr-popper"
            :teleported="false"
            @command="handleMoreCommand"
          >
            <el-button size="small">
              更多
              <el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="enableComponentTree" command="tree">组件树</el-dropdown-item>
                <el-dropdown-item command="list">评审列表</el-dropdown-item>
                <el-dropdown-item divided command="export-md">导出 Markdown</el-dropdown-item>
                <el-dropdown-item command="export-json">导出 JSON</el-dropdown-item>
                <el-dropdown-item v-if="enableZipExport" command="export-zip">导出 ZIP</el-dropdown-item>
                <el-dropdown-item divided command="clear" :disabled="selectedCount === 0">取消选择</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="vpr-toolbar-resize-handle" @mousedown.stop="onToolbarResizeStart" />
      </div>

      <!-- 元素悬停高亮 -->
      <div
        v-if="hoveredRect && mode === 'element' && !isResizing && !dragRect"
        class="vpr-highlight-box vpr-hover-box"
        :style="highlightStyle(hoveredRect)"
      >
        <span class="vpr-highlight-label">{{ hoveredTag }}</span>
      </div>

      <!-- 已选元素高亮 -->
      <div
        v-for="(item, idx) in selectedElements"
        :key="'el-' + idx"
        class="vpr-highlight-box vpr-selected-box"
        :style="highlightStyle(item.rect)"
        @click.stop="onSelectedElementClick(item, $event)"
      >
        <span class="vpr-highlight-label">
          {{ item.tag }}
          <i class="vpr-remove-icon" @click.stop="removeSelectedElement(item)">×</i>
        </span>
      </div>

      <!-- 组件树悬停高亮 -->
      <div
        v-if="treeHoverRect"
        class="vpr-highlight-box vpr-tree-hover-box"
        :style="highlightStyle(toViewportRect(treeHoverRect))"
      />

      <!-- 已选框选区域 -->
      <div
        v-for="box in selectedBoxes"
        :key="box.id"
        class="vpr-drag-rect vpr-selected-box"
        :class="{ 'vpr-is-resizing': resizingBoxId === box.id }"
        :style="boxStyle(toViewportRect(box.rect))"
        @mousedown.stop="onBoxMouseDown(box, $event)"
      >
        <span class="vpr-box-label" @mousedown.stop>
          框选 {{ box.index + 1 }}
          <i class="vpr-remove-icon" @click.stop="removeBox(box)">×</i>
        </span>
        <div
          v-for="position in resizeHandlePositions"
          :key="position"
          class="vpr-resize-handle"
          :class="'vpr-handle-' + position"
          :style="handleStyle(position, toViewportRect(box.rect))"
          @mousedown.stop="startResize(box, position, $event)"
        />
      </div>

      <!-- 正在拖动的框选预览 -->
      <div
        v-if="dragRect"
        class="vpr-drag-rect vpr-preview-box"
        :style="boxStyle(dragRect)"
      />

      <!-- 评审意见表单弹窗 -->
      <div class="vpr-modal-layer" @mousedown="onModalDragStart">
        <el-dialog
          v-model="formVisible"
          class="vpr-review-dialog"
          modal-class="vpr-dialog-layer"
          title="添加评审意见"
          :width="modalSize.width"
          :style="modalStyle"
          :z-index="10002"
          :append-to-body="false"
          :close-on-press-escape="false"
          align-center
        >
          <div class="vpr-form-row">
            <label>评审目标</label>
            <div class="vpr-review-targets-summary">
              <el-tag
                v-for="(target, idx) in form.targets"
                :key="idx"
                class="vpr-target-tag"
                :title="target.type === 'element' ? (target.selector || '元素') : `框选 ${target.viewportRect?.x},${target.viewportRect?.y}`"
              >
                {{ target.type === 'element' ? (target.elementText || target.selector || '元素') : `框选 ${target.viewportRect?.x},${target.viewportRect?.y}` }}
              </el-tag>
            </div>
          </div>
          <div class="vpr-form-row">
            <label>窗口尺寸</label>
            <span class="vpr-text-muted">{{ form.viewport?.width }} × {{ form.viewport?.height }}</span>
          </div>
          <div class="vpr-form-row">
            <label>滚动位置</label>
            <span class="vpr-text-muted">x={{ form.scroll?.x }}, y={{ form.scroll?.y }}</span>
          </div>
          <div class="vpr-form-row">
            <label>截图</label>
            <el-checkbox-group v-model="selectedScreenshots">
              <el-checkbox :value="SCREENSHOT_TYPES.TARGETS">选中目标</el-checkbox>
              <el-checkbox :value="SCREENSHOT_TYPES.VIEWPORT">当前视口</el-checkbox>
              <el-checkbox :value="SCREENSHOT_TYPES.FULL_PAGE">完整页面</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="vpr-form-row">
            <label>标题 <span class="vpr-required">*</span></label>
            <el-input v-model="form.title" placeholder="例如：按钮样式不统一" />
          </div>
          <div class="vpr-form-row">
            <label>严重等级 <span class="vpr-required">*</span></label>
            <el-select v-model="form.severity" style="width: 160px" popper-class="vpr-popper">
              <el-option value="low" label="低" />
              <el-option value="medium" label="中" />
              <el-option value="high" label="高" />
              <el-option value="critical" label="严重" />
            </el-select>
          </div>
          <div class="vpr-form-row">
            <label>评审建议 <span class="vpr-required">*</span></label>
            <el-input
              v-model="form.suggestion"
              type="textarea"
              :rows="4"
              placeholder="描述问题现象、影响和改进建议"
            />
          </div>
          <div class="vpr-modal-resize-handle" @mousedown.stop="onModalResizeStart" />
          <template #footer>
            <el-button @click="formVisible = false">取消</el-button>
            <el-button type="primary" :disabled="!canSubmit" @click="submitReview">保存评审</el-button>
          </template>
        </el-dialog>
      </div>

      <!-- 组件树抽屉 -->
      <el-drawer
        v-model="treeVisible"
        title="组件树检查器"
        direction="rtl"
        size="480px"
        resizable
        modal-class="vpr-drawer-layer"
        :z-index="10003"
        :append-to-body="false"
      >
        <el-empty v-if="!componentTree" description="先选择一个元素以查看组件树" />
        <div v-else class="vpr-tree-panel">
          <div v-if="componentTree.framework && componentTree.framework.length" class="vpr-tree-section">
            <h4>框架组件树</h4>
            <div class="vpr-tree-list">
              <div
                v-for="(node, idx) in componentTree.framework"
                :key="'fw-' + idx"
                class="vpr-tree-node"
                @mouseenter="onTreeNodeHover(node)"
                @mouseleave="treeHoverRect = null"
                @click="onTreeNodeSelect(node)"
              >
                <span class="vpr-node-name">{{ node.componentName }}</span>
              </div>
            </div>
          </div>
          <div class="vpr-tree-section">
            <h4>DOM 树</h4>
            <div class="vpr-tree-list">
              <div
                v-for="(node, idx) in componentTree.dom"
                :key="'dom-' + idx"
                class="vpr-tree-node"
                :style="{ paddingLeft: idx * 12 + 'px' }"
                @mouseenter="onTreeNodeHover(node)"
                @mouseleave="treeHoverRect = null"
                @click="onTreeNodeSelect(node)"
              >
                <span class="vpr-node-tag">{{ node.tag }}</span>
                <span v-if="node.id" class="vpr-node-id">#{{ node.id }}</span>
                <span v-if="node.aria?.role" class="vpr-node-aria">role={{ node.aria.role }}</span>
                <span v-if="node.testId" class="vpr-node-testid">testid={{ node.testId }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-drawer>

      <!-- 评审列表抽屉 -->
      <el-drawer
        v-model="listVisible"
        direction="rtl"
        size="560px"
        resizable
        modal-class="vpr-drawer-layer"
        :z-index="10003"
        :append-to-body="false"
      >
        <template #header>
          <div class="vpr-drawer-header">
            <span class="vpr-drawer-title">当前页面评审意见</span>
            <div class="vpr-drawer-actions">
              <el-button type="primary" size="small" @click="handleExportMarkdown">导出 Markdown</el-button>
              <el-button size="small" @click="handleExportJSON">导出 JSON</el-button>
              <el-button v-if="enableZipExport" size="small" @click="handleExportZIP">导出 ZIP</el-button>
              <el-button type="danger" size="small" @click="clearPage">清空本页</el-button>
            </div>
          </div>
        </template>
        <el-empty v-if="pageReviews.length === 0" description="暂无评审意见" />
        <div v-else class="vpr-review-list">
          <el-card
            v-for="item in pageReviews"
            :key="item.id"
            shadow="never"
          >
            <template #header>
              <div class="vpr-review-item-header">
                <span class="vpr-review-item-title">{{ item.title }}</span>
                <div class="vpr-review-item-tags">
                  <el-tag :type="severityType(item.severity)" size="small">{{ severityText(item.severity) }}</el-tag>
                  <el-tag type="info" size="small">{{ item.targets?.length || 1 }} 个目标</el-tag>
                  <el-tag v-if="hasComponentTree(item)" type="success" size="small">树</el-tag>
                </div>
              </div>
            </template>
            <p class="vpr-review-item-target">{{ summarizeTargets(item.targets) }}</p>
            <p class="vpr-review-item-suggestion">{{ item.suggestion }}</p>
            <div class="vpr-review-item-meta">
              <span class="vpr-text-muted">{{ new Date(item.createdAt).toLocaleString() }}</span>
              <div class="vpr-review-item-actions">
                <el-button v-if="item.status !== 'resolved'" link type="primary" size="small" @click="resolve(item.id)">标记解决</el-button>
                <el-button link type="danger" size="small" @click="remove(item.id)">删除</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-drawer>

      <!-- 确认弹窗 -->
      <el-dialog
        v-model="confirmVisible"
        modal-class="vpr-confirm-layer"
        :title="confirmState?.title"
        width="360px"
        :z-index="10004"
        :append-to-body="false"
        :close-on-press-escape="false"
        align-center
      >
        <p>{{ confirmState?.message }}</p>
        <template #footer>
          <el-button @click="confirmState = null">取消</el-button>
          <el-button type="primary" @click="onConfirm">确定</el-button>
        </template>
      </el-dialog>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import {
  ElButton,
  ElRadioGroup,
  ElRadioButton,
  ElBadge,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElDialog,
  ElDrawer,
  ElTag,
  ElCheckboxGroup,
  ElCheckbox,
  ElInput,
  ElSelect,
  ElOption,
  ElCard,
  ElEmpty,
  ElIcon
} from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { usePageReview } from './useReview.js'
import { useElementSelection } from './composables/useElementSelection.js'
import { useViewportBoxing } from './composables/useViewportBoxing.js'
import { useDragResize } from './composables/useDragResize.js'
import { useHighlightOverlay } from './composables/useHighlightOverlay.js'
import {
  SCREENSHOT_TYPES,
  generateScreenshotFilename,
  captureElement,
  captureViewport,
  captureFullPage,
  captureBox,
  uploadScreenshot
} from './screenshot.js'
import { getComponentTree, getNodeInfo } from './inspector.js'
import { injectVuePageReviewStyles } from './injectStyles.js'

const props = defineProps({
  active: { type: Boolean, default: false },
  pagePath: { type: String, default: '' },
  pageName: { type: String, default: '' },
  storageKey: { type: String, default: 'page-reviews' },
  imageUpload: { type: Function, default: null },
  imageUploadUrl: { type: String, default: '' },
  enableZipExport: { type: Boolean, default: true },
  enableComponentTree: { type: Boolean, default: true }
})

const emit = defineEmits(['update:active', 'add', 'update', 'delete', 'clear', 'export'])

const resolvedPagePath = computed(() => {
  return props.pagePath || (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/')
})

const { reviews, getPageReviews, addReview, updateReview, deleteReview, clearPageReviews, exportToJSON, exportToMarkdown, exportToZIP } = usePageReview({
  storageKey: props.storageKey,
  defaultPagePath: () => resolvedPagePath.value
})

const pageReviews = computed(() => getPageReviews(resolvedPagePath.value))

const mode = ref('element')
const formVisible = ref(false)
const listVisible = ref(false)
const treeVisible = ref(false)
const confirmState = ref(null)

const treeHoverRect = ref(null)
const componentTree = ref(null)

const selectedScreenshots = ref([])

const form = ref({
  type: 'element',
  title: '',
  severity: 'medium',
  suggestion: '',
  targets: [],
  viewport: { width: 0, height: 0 },
  scroll: { x: 0, y: 0 },
  pagePath: '',
  pageUrl: '',
  pageName: '',
  aria: null,
  locators: null
})

onMounted(() => {
  injectVuePageReviewStyles()
})

// 面板拖拽/缩放（工具栏与评审弹窗）
const toolbarRef = ref(null)

const {
  position: toolbarPos,
  size: toolbarSize,
  isDragging: isDraggingToolbar,
  isResizing: isResizingToolbar,
  onDragStart: onToolbarDragStart,
  onResizeStart: onToolbarResizeStart
} = useDragResize({
  initialPosition: { x: 0, y: 0 },
  initialSize: { width: null, height: null },
  minWidth: 400,
  minHeight: 48,
  isDragHandle: (target) =>
    target.classList?.contains('vpr-toolbar-title') ||
    target.classList?.contains('vpr-review-toolbar'),
  measureRef: toolbarRef
})

const {
  position: modalPos,
  size: modalSize,
  isDragging: isDraggingModal,
  isResizing: isResizingModal,
  onDragStart: onModalDragStart,
  onResizeStart: onModalResizeStart
} = useDragResize({
  initialPosition: { x: 0, y: 0 },
  initialSize: { width: 560, height: null },
  minWidth: 360,
  minHeight: 300,
  isDragHandle: (target) => {
    const header = target.closest?.('.el-dialog__header')
    const closeBtn = target.closest?.('.el-dialog__headerbtn')
    return !!header && !closeBtn
  }
})

const panelInteracting = computed(() =>
  isDraggingToolbar.value || isResizingToolbar.value || isDraggingModal.value || isResizingModal.value
)

const onIgnoreTarget = (target) => {
  if (panelInteracting.value) return true
  return !!target.closest('.vpr-review-overlay')
}

const interactionActive = computed(() => props.active && !formVisible.value)

const {
  hoveredRect,
  hoveredTag,
  selectedElements,
  selectElement,
  removeSelectedElement,
  clearSelectedElements,
  refreshRects
} = useElementSelection({
  active: interactionActive,
  mode,
  onIgnoreTarget
})

const handleBoxCreate = (box, e) => {
  if (!isMultiSelectKey(e)) {
    clearSelectedElements()
  }
}

const {
  selectedBoxes,
  dragRect,
  resizingBoxId,
  isResizing,
  removeBox,
  clearBoxes,
  startResize
} = useViewportBoxing({
  active: interactionActive,
  mode,
  onIgnoreTarget,
  onBoxCreate: handleBoxCreate
})

const { toViewportRect, highlightStyle, boxStyle, handleStyle } = useHighlightOverlay({
  active: computed(() => props.active)
})

const resizeHandlePositions = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']

const selectedCount = computed(() => selectedElements.value.length + selectedBoxes.value.length)
const canSubmit = computed(() => form.value.title.trim() && form.value.suggestion.trim())

const confirmVisible = computed({
  get: () => !!confirmState.value,
  set: (val) => { if (!val) confirmState.value = null }
})

const uploadFn = computed(() => {
  if (props.imageUpload) return props.imageUpload
  if (props.imageUploadUrl) return defaultUrlUploader
  return null
})

async function defaultUrlUploader(blob, filename) {
  const formData = new FormData()
  formData.append('file', blob, filename)
  const res = await fetch(props.imageUploadUrl, { method: 'POST', body: formData })
  if (!res.ok) throw new Error('Upload failed')
  const text = await res.text()
  try {
    const json = JSON.parse(text)
    return json.url || json.data?.url || text
  } catch {
    return text
  }
}

const toolbarStyle = computed(() => {
  const { x, y } = toolbarPos.value
  const style = {
    transform: `translate(calc(-50% + ${x}px), ${y}px)`
  }
  if (toolbarSize.value.width) style.width = toolbarSize.value.width + 'px'
  if (toolbarSize.value.height) style.height = toolbarSize.value.height + 'px'
  return style
})

const modalStyle = computed(() => {
  const { x, y } = modalPos.value
  const style = {
    transform: `translate(${x}px, ${y}px)`
  }
  if (modalSize.value.height) style.height = modalSize.value.height + 'px'
  return style
})

function isMultiSelectKey(e) {
  return e.ctrlKey || e.metaKey
}

function severityType(s) {
  const map = { low: 'info', medium: 'warning', high: 'danger', critical: 'danger' }
  return map[s] || 'info'
}

function severityText(s) {
  const map = { low: '低', medium: '中', high: '高', critical: '严重' }
  return map[s] || s
}

function hasComponentTree(item) {
  return item.targets?.some(t => t.componentTree?.dom?.length)
}

function summarizeTargets(targets) {
  if (!targets || targets.length === 0) return '无目标'
  const first = targets[0]
  const firstDesc = first.type === 'element'
    ? (first.elementText || first.selector || '元素')
    : `框选 x=${first.viewportRect.x}, y=${first.viewportRect.y}`
  if (targets.length === 1) return firstDesc
  return `${firstDesc} 等 ${targets.length} 个目标`
}

function captureEnv() {
  return {
    viewport: { width: window.innerWidth, height: window.innerHeight },
    scroll: { x: window.scrollX, y: window.scrollY },
    pagePath: resolvedPagePath.value,
    pageUrl: window.location.href,
    pageName: props.pageName || resolvedPagePath.value
  }
}

function onSelectedElementClick(item, e) {
  if (!isMultiSelectKey(e)) return
  e.stopPropagation()
  removeSelectedElement(item)
}

function onBoxMouseDown(box, e) {
  if (!isMultiSelectKey(e)) return
  e.stopPropagation()
  removeBox(box)
}

function onKeyDown(e) {
  if (e.key === 'Escape') {
    if (formVisible.value) formVisible.value = false
    else close()
  }
}

function openTreePanel() {
  if (selectedElements.value.length === 0) {
    componentTree.value = null
  }
  treeVisible.value = true
}

function onTreeNodeHover(node) {
  if (!node.rect) {
    treeHoverRect.value = null
    return
  }
  treeHoverRect.value = node.rect
}

function onTreeNodeSelect(node) {
  if (!node.selector) return
  const el = document.querySelector(node.selector)
  if (!el) return
  selectElement(el)
  clearBoxes()
  treeVisible.value = false
}

function clearAllSelections() {
  clearSelectedElements()
  clearBoxes()
  componentTree.value = null
}

function openReviewForm() {
  const env = captureEnv()
  const targets = buildTargets()
  const firstElement = selectedElements.value[0]
  const nodeInfo = firstElement?.el ? getNodeInfo(firstElement.el) : null

  form.value = {
    type: selectedElements.value.length > 0 ? 'element' : 'viewport',
    title: '',
    severity: 'medium',
    suggestion: '',
    targets,
    viewport: env.viewport,
    scroll: env.scroll,
    pagePath: env.pagePath,
    pageUrl: env.pageUrl,
    pageName: env.pageName,
    aria: nodeInfo?.aria || null,
    locators: nodeInfo ? buildLocators(nodeInfo) : null
  }
  selectedScreenshots.value = []
  formVisible.value = true
}

function buildTargets() {
  const targets = []
  selectedElements.value.forEach(item => {
    const nodeInfo = item.el ? getNodeInfo(item.el) : null
    targets.push({
      type: 'element',
      selector: item.selector,
      elementText: item.text,
      elementRect: item.docRect || item.rect,
      componentTree: nodeInfo ? getComponentTree(item.el) : null,
      aria: nodeInfo?.aria || null,
      locators: nodeInfo ? buildLocators(nodeInfo) : null
    })
  })
  selectedBoxes.value.forEach(box => {
    targets.push({
      type: 'viewport',
      viewportRect: box.rect
    })
  })
  return targets
}

function buildLocators(nodeInfo) {
  const locators = {}
  if (nodeInfo.selector) locators.cssSelector = nodeInfo.selector
  if (nodeInfo.xpath) locators.xpath = nodeInfo.xpath
  if (nodeInfo.aria && Object.keys(nodeInfo.aria).length) locators.aria = nodeInfo.aria
  if (nodeInfo.testId) locators.testId = nodeInfo.testId
  return Object.keys(locators).length ? locators : null
}

async function captureScreenshots() {
  const screenshots = []
  for (const type of selectedScreenshots.value) {
    if (type === SCREENSHOT_TYPES.TARGETS) {
      for (const target of form.value.targets) {
        let dataUrl = null
        if (target.type === 'element' && target.elementRect) {
          const el = document.querySelector(target.selector)
          if (el) dataUrl = await captureElement(el)
        } else if (target.type === 'viewport' && target.viewportRect) {
          dataUrl = await captureBox(target.viewportRect)
        }
        if (dataUrl) {
          const filename = generateScreenshotFilename(target.type)
          let url = null
          if (uploadFn.value) url = await uploadScreenshot(dataUrl, filename, uploadFn.value)
          screenshots.push({ type: target.type, filename, data: url ? undefined : dataUrl, url: url || undefined })
        }
      }
    } else if (type === SCREENSHOT_TYPES.VIEWPORT) {
      const dataUrl = await captureViewport()
      if (dataUrl) {
        const filename = generateScreenshotFilename(SCREENSHOT_TYPES.VIEWPORT)
        let url = null
        if (uploadFn.value) url = await uploadScreenshot(dataUrl, filename, uploadFn.value)
        screenshots.push({ type: SCREENSHOT_TYPES.VIEWPORT, filename, data: url ? undefined : dataUrl, url: url || undefined })
      }
    } else if (type === SCREENSHOT_TYPES.FULL_PAGE) {
      const dataUrl = await captureFullPage()
      if (dataUrl) {
        const filename = generateScreenshotFilename(SCREENSHOT_TYPES.FULL_PAGE)
        let url = null
        if (uploadFn.value) url = await uploadScreenshot(dataUrl, filename, uploadFn.value)
        screenshots.push({ type: SCREENSHOT_TYPES.FULL_PAGE, filename, data: url ? undefined : dataUrl, url: url || undefined })
      }
    }
  }
  return screenshots
}

function resetForm() {
  selectedScreenshots.value = []
  form.value = {
    type: 'element',
    title: '',
    severity: 'medium',
    suggestion: '',
    targets: [],
    viewport: { width: 0, height: 0 },
    scroll: { x: 0, y: 0 },
    pagePath: '',
    pageUrl: '',
    pageName: '',
    aria: null,
    locators: null
  }
}

async function submitReview() {
  if (!canSubmit.value) return
  const screenshots = await captureScreenshots()
  const record = addReview({
    type: form.value.type,
    title: form.value.title.trim(),
    severity: form.value.severity,
    suggestion: form.value.suggestion.trim(),
    targets: form.value.targets,
    viewport: form.value.viewport,
    scroll: form.value.scroll,
    pagePath: form.value.pagePath,
    pageUrl: form.value.pageUrl,
    pageName: form.value.pageName,
    status: 'open',
    screenshots,
    aria: form.value.aria,
    locators: form.value.locators
  })
  formVisible.value = false
  clearAllSelections()
  emit('add', record)
}

function resolve(id) {
  updateReview(id, { status: 'resolved' })
  emit('update', { id, status: 'resolved' })
}

function remove(id) {
  confirmState.value = {
    title: '删除确认',
    message: '确定删除这条评审意见吗？',
    onConfirm: () => {
      deleteReview(id)
      emit('delete', { id })
    }
  }
}

function clearPage() {
  if (pageReviews.value.length === 0) return
  confirmState.value = {
    title: '清空确认',
    message: '确定清空当前页面的所有评审意见吗？',
    onConfirm: () => {
      clearPageReviews(resolvedPagePath.value)
      emit('clear', { pagePath: resolvedPagePath.value })
    }
  }
}

function onConfirm() {
  confirmState.value?.onConfirm?.()
  confirmState.value = null
}

function handleExportMarkdown() {
  exportToMarkdown()
  emit('export', { format: 'markdown' })
}

function handleExportJSON() {
  exportToJSON()
  emit('export', { format: 'json' })
}

async function handleExportZIP() {
  await exportToZIP()
  emit('export', { format: 'zip' })
}

function handleMoreCommand(command) {
  switch (command) {
    case 'tree':
      openTreePanel()
      break
    case 'list':
      listVisible.value = true
      break
    case 'export-md':
      handleExportMarkdown()
      break
    case 'export-json':
      handleExportJSON()
      break
    case 'export-zip':
      handleExportZIP()
      break
    case 'clear':
      clearAllSelections()
      break
  }
}

function close() {
  emit('update:active', false)
}

watchEffect((onCleanup) => {
  if (!props.active) return
  document.addEventListener('keydown', onKeyDown)
  onCleanup(() => document.removeEventListener('keydown', onKeyDown))
})

watch(() => props.active, (val) => {
  if (val) {
    mode.value = 'element'
  } else {
    clearAllSelections()
    resetForm()
    formVisible.value = false
    hoveredRect.value = null
    listVisible.value = false
    treeVisible.value = false
    confirmState.value = null
  }
})

// 选中元素变化时同步组件树（用 selector 签名避免滚动刷新矩形时重复计算）
watch(
  () => selectedElements.value.map(item => item.selector).join('|'),
  () => {
    componentTree.value = selectedElements.value.length > 0
      ? getComponentTree(selectedElements.value[0].el)
      : null
  }
)

// viewport 模式下滚动时也要刷新已选元素的矩形（element 模式由 useElementSelection 内部处理）
watchEffect((onCleanup) => {
  if (!props.active) return
  const onScroll = () => refreshRects()
  window.addEventListener('scroll', onScroll, true)
  onCleanup(() => window.removeEventListener('scroll', onScroll, true))
})

defineExpose({
  reviews,
  pageReviews,
  addReview,
  updateReview,
  deleteReview,
  clearPageReviews,
  exportToJSON,
  exportToMarkdown
})
</script>
