<template>
  <teleport to="body">
    <div v-if="active" class="review-overlay" @click="handleOverlayClick">
      <!-- 顶部工具栏 -->
      <div
        class="review-toolbar"
        :class="{ 'is-dragging': isDraggingToolbar }"
        :style="toolbarStyle"
        @click.stop
        @mousedown="onToolbarMouseDown"
      >
        <div class="toolbar-left">
          <span class="toolbar-title" title="按住此处可拖动">页面评审模式</span>
          <div class="radio-group radio-group-small">
            <label class="radio-button" :class="{ active: mode === 'element' }">
              <input v-model="mode" type="radio" name="review-mode" value="element">
              选择元素
            </label>
            <label class="radio-button" :class="{ active: mode === 'viewport' }">
              <input v-model="mode" type="radio" name="review-mode" value="viewport">
              框定视图
            </label>
          </div>
        </div>
        <div class="toolbar-right">
          <button
            v-if="enableComponentTree"
            class="btn btn-sm"
            @click="openTreePanel"
          >
            组件树
          </button>
          <button
            class="btn btn-sm btn-primary"
            :disabled="selectedCount === 0"
            @click="openReviewForm"
          >
            评审 ({{ selectedCount }})
          </button>
          <button
            class="btn btn-sm"
            :disabled="selectedCount === 0"
            @click="clearAllSelections"
          >
            取消选择
          </button>
          <span class="badge-wrapper">
            <button class="btn btn-sm" @click="listVisible = true">评审列表</button>
            <span v-if="pageReviews.length > 0" class="badge">{{ pageReviews.length }}</span>
          </span>
          <div class="dropdown">
            <button class="btn btn-sm btn-primary" @click="exportToMarkdown">导出</button>
            <button class="btn btn-sm btn-primary dropdown-toggle" @click.stop="exportDropdownVisible = !exportDropdownVisible">▼</button>
            <div v-if="exportDropdownVisible" class="dropdown-menu">
              <button class="dropdown-item" @click="exportToMarkdownAndClose">导出为 Markdown</button>
              <button class="dropdown-item" @click="exportToJSONAndClose">导出为 JSON</button>
              <button v-if="enableZipExport" class="dropdown-item" @click="exportToZIPAndClose">导出为 ZIP</button>
            </div>
          </div>
          <button class="btn btn-sm btn-danger" @click="close">退出评审</button>
        </div>
        <div class="toolbar-resize-handle" @mousedown.stop="onToolbarResizeStart" />
      </div>

      <!-- 元素悬停高亮 -->
      <div
        v-if="hoveredRect && mode === 'element' && !isDraggingBox && !resizingBoxId"
        class="highlight-box hover-box"
        :style="highlightStyle(hoveredRect)"
      >
        <span class="highlight-label">{{ hoveredTag }}</span>
      </div>

      <!-- 已选元素高亮 -->
      <div
        v-for="(item, idx) in selectedElements"
        :key="'el-' + idx"
        class="highlight-box selected-box"
        :style="highlightStyle(item.rect)"
        @click.stop="onSelectedElementClick(item, $event)"
      >
        <span class="highlight-label">
          {{ item.tag }}
          <i class="remove-icon" @click.stop="removeSelectedElement(item)">×</i>
        </span>
      </div>

      <!-- 组件树悬停高亮 -->
      <div
        v-if="treeHoverRect"
        class="highlight-box tree-hover-box"
        :style="highlightStyle(toViewportRect(treeHoverRect))"
      />

      <!-- 已选框选区域 -->
      <div
        v-for="box in selectedBoxes"
        :key="box.id"
        class="drag-rect selected-box"
        :class="{ 'is-resizing': resizingBoxId === box.id }"
        :style="boxStyle(toViewportRect(box.rect))"
        @mousedown.stop="onBoxMouseDown(box, $event)"
      >
        <span class="box-label" @mousedown.stop>
          框选 {{ box.index + 1 }}
          <i class="remove-icon" @click.stop="removeSelectedBox(box)">×</i>
        </span>
        <div
          v-for="handle in resizeHandles"
          :key="handle.position"
          class="resize-handle"
          :class="'handle-' + handle.position"
          :style="handleStyle(handle.position, box.rect)"
          @mousedown.stop="onResizeStart(box, handle.position, $event)"
        />
      </div>

      <!-- 正在拖动的框选预览 -->
      <div
        v-if="dragRect"
        class="drag-rect preview-box"
        :style="boxStyle(dragRect)"
      />

      <!-- 评审意见表单弹窗 -->
      <div
        v-if="formVisible"
        class="modal-backdrop"
        @click="formVisible = false"
      />
      <div
        v-if="formVisible"
        class="modal review-modal"
        :class="{ 'is-dragging': isDraggingModal }"
        :style="modalStyle"
        @click.stop
      >
        <div class="modal-header" @mousedown="onModalHeaderMouseDown">
          <span>添加评审意见</span>
          <button class="close" @click="formVisible = false">×</button>
        </div>
        <div class="modal-body">
          <div class="form">
            <div class="form-group">
              <label class="form-label">评审目标</label>
              <div class="form-control-static">
                <span
                  v-for="(target, idx) in form.targets"
                  :key="idx"
                  class="review-tag target-tag"
                >
                  {{ target.type === 'element' ? (target.elementText || target.selector || '元素') : `框选 ${target.viewportRect?.x},${target.viewportRect?.y}` }}
                </span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">窗口尺寸</label>
              <span class="text-muted">{{ form.viewport?.width }} × {{ form.viewport?.height }}</span>
            </div>
            <div class="form-group">
              <label class="form-label">滚动位置</label>
              <span class="text-muted">x={{ form.scroll?.x }}, y={{ form.scroll?.y }}</span>
            </div>
            <div class="form-group">
              <label class="form-label">截图</label>
              <div class="checkbox-group">
                <label class="checkbox">
                  <input v-model="selectedScreenshots" type="checkbox" :value="SCREENSHOT_TYPES.TARGETS">
                  选中目标
                </label>
                <label class="checkbox">
                  <input v-model="selectedScreenshots" type="checkbox" :value="SCREENSHOT_TYPES.VIEWPORT">
                  当前视口
                </label>
                <label class="checkbox">
                  <input v-model="selectedScreenshots" type="checkbox" :value="SCREENSHOT_TYPES.FULL_PAGE">
                  完整页面
                </label>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">标题 <span class="required">*</span></label>
              <input v-model="form.title" class="form-input" placeholder="例如：按钮样式不统一">
            </div>
            <div class="form-group">
              <label class="form-label">严重等级 <span class="required">*</span></label>
              <div class="radio-group">
                <label class="radio">
                  <input v-model="form.severity" type="radio" value="low">
                  低
                </label>
                <label class="radio">
                  <input v-model="form.severity" type="radio" value="medium">
                  中
                </label>
                <label class="radio">
                  <input v-model="form.severity" type="radio" value="high">
                  高
                </label>
                <label class="radio">
                  <input v-model="form.severity" type="radio" value="critical">
                  严重
                </label>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">评审建议 <span class="required">*</span></label>
              <textarea
                v-model="form.suggestion"
                class="form-textarea"
                rows="4"
                placeholder="描述问题现象、影响和改进建议"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" @click="formVisible = false">取消</button>
          <button class="btn btn-primary" :disabled="!canSubmit" @click="submitReview">保存评审</button>
        </div>
        <div class="modal-resize-handle" @mousedown.stop="onModalResizeStart" />
      </div>

      <!-- 组件树抽屉 -->
      <div v-if="treeVisible" class="drawer-backdrop" @click="treeVisible = false" />
      <div v-if="treeVisible" class="review-drawer">
        <div class="drawer-header">
          <span>组件树检查器</span>
          <button class="close" @click="treeVisible = false">×</button>
        </div>
        <div class="drawer-body">
          <div v-if="!componentTree" class="empty-state">先选择一个元素以查看组件树</div>
          <div v-else class="tree-panel">
            <div v-if="componentTree.framework && componentTree.framework.length" class="tree-section">
              <h4>框架组件树</h4>
              <div class="tree-list">
                <div
                  v-for="(node, idx) in componentTree.framework"
                  :key="'fw-' + idx"
                  class="tree-node"
                  @mouseenter="onTreeNodeHover(node)"
                  @mouseleave="treeHoverRect = null"
                  @click="onTreeNodeSelect(node)"
                >
                  <span class="node-name">{{ node.componentName }}</span>
                </div>
              </div>
            </div>
            <div class="tree-section">
              <h4>DOM 树</h4>
              <div class="tree-list">
                <div
                  v-for="(node, idx) in componentTree.dom"
                  :key="'dom-' + idx"
                  class="tree-node"
                  :style="{ paddingLeft: idx * 12 + 'px' }"
                  @mouseenter="onTreeNodeHover(node)"
                  @mouseleave="treeHoverRect = null"
                  @click="onTreeNodeSelect(node)"
                >
                  <span class="node-tag">{{ node.tag }}</span>
                  <span v-if="node.id" class="node-id">#{{ node.id }}</span>
                  <span v-if="node.aria?.role" class="node-aria">role={{ node.aria.role }}</span>
                  <span v-if="node.testId" class="node-testid">testid={{ node.testId }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 评审列表抽屉 -->
      <div v-if="listVisible" class="drawer-backdrop" @click="listVisible = false" />
      <div v-if="listVisible" class="review-drawer">
        <div class="drawer-header">
          <span>当前页面评审意见</span>
          <button class="close" @click="listVisible = false">×</button>
        </div>
        <div class="drawer-body">
          <div class="review-list-actions">
            <button class="btn btn-sm btn-primary" @click="exportToMarkdown">导出 Markdown</button>
            <button class="btn btn-sm" @click="exportToJSON">导出 JSON</button>
            <button v-if="enableZipExport" class="btn btn-sm" @click="exportToZIP">导出 ZIP</button>
            <button class="btn btn-sm btn-danger btn-text" @click="clearPage">清空本页</button>
          </div>
          <div v-if="pageReviews.length === 0" class="empty-state">暂无评审意见</div>
          <div v-else class="review-list">
            <div v-for="item in pageReviews" :key="item.id" class="review-card review-item">
              <div class="review-item-header">
                <span class="review-item-title">{{ item.title }}</span>
                <div class="review-item-tags">
                  <span class="review-tag" :class="'tag-' + severityClass(item.severity)">{{ severityText(item.severity) }}</span>
                  <span class="review-tag tag-info">{{ item.targets?.length || 1 }} 个目标</span>
                  <span v-if="hasComponentTree(item)" class="review-tag tag-success">树</span>
                </div>
              </div>
              <p class="review-item-target">
                {{ summarizeTargets(item.targets) }}
              </p>
              <p class="review-item-suggestion">{{ item.suggestion }}</p>
              <div class="review-item-meta">
                <span class="text-muted">{{ new Date(item.createdAt).toLocaleString() }}</span>
                <div class="review-item-actions">
                  <button v-if="item.status !== 'resolved'" class="btn btn-sm btn-text btn-primary" @click="resolve(item.id)">标记解决</button>
                  <button class="btn btn-sm btn-text btn-danger" @click="remove(item.id)">删除</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { usePageReview } from './useReview.js'
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
import './style.css'

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
const exportDropdownVisible = ref(false)

const hoveredRect = ref(null)
const hoveredTag = ref('')
const selectedElements = ref([])
const selectedBoxes = ref([])
const boxCounter = ref(0)

const treeHoverRect = ref(null)
const componentTree = ref(null)

const scrollPos = ref({ x: window.scrollX, y: window.scrollY })

const dragRect = ref(null)
const isDraggingBox = ref(false)
const dragStart = ref({ x: 0, y: 0 })

const resizingBoxId = ref(null)
const resizeHandle = ref('')
const resizeStart = ref({ x: 0, y: 0, rect: null })

const toolbarPos = ref({ x: 0, y: 0 })
const toolbarSize = ref({ width: null, height: null })
const isDraggingToolbar = ref(false)
const toolbarDragStart = ref({ x: 0, y: 0 })
const isResizingToolbar = ref(false)
const toolbarResizeStart = ref({ x: 0, y: 0, width: 0, height: 0 })

const modalPos = ref({ x: 0, y: 0 })
const modalSize = ref({ width: 560, height: null })
const isDraggingModal = ref(false)
const modalDragStart = ref({ x: 0, y: 0 })
const isResizingModal = ref(false)
const modalResizeStart = ref({ x: 0, y: 0, width: 0, height: 0 })

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

const selectedCount = computed(() => selectedElements.value.length + selectedBoxes.value.length)
const canSubmit = computed(() => form.value.title.trim() && form.value.suggestion.trim())

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
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
    transform: 'translate(-50%, -50%)',
    width: modalSize.value.width + 'px'
  }
  if (modalSize.value.height) style.height = modalSize.value.height + 'px'
  return style
})

const resizeHandles = [
  { position: 'nw' }, { position: 'n' }, { position: 'ne' },
  { position: 'w' }, { position: 'e' },
  { position: 'sw' }, { position: 's' }, { position: 'se' }
]

watch(exportDropdownVisible, (visible) => {
  if (!visible) return
  nextTick(() => {
    const close = () => { exportDropdownVisible.value = false }
    document.addEventListener('click', close, { once: true })
  })
})

function toViewportRect(rect) {
  if (!rect) return null
  return {
    x: rect.x - scrollPos.value.x,
    y: rect.y - scrollPos.value.y,
    width: rect.width,
    height: rect.height
  }
}

function highlightStyle(rect) {
  if (!rect) return {}
  return {
    left: rect.x + 'px',
    top: rect.y + 'px',
    width: rect.width + 'px',
    height: rect.height + 'px'
  }
}

function boxStyle(rect) {
  if (!rect) return {}
  return {
    left: rect.x + 'px',
    top: rect.y + 'px',
    width: rect.width + 'px',
    height: rect.height + 'px'
  }
}

function handleStyle(position, rect) {
  const size = 8
  const styles = {}
  if (position.includes('n')) styles.top = -size / 2 + 'px'
  if (position.includes('s')) styles.bottom = -size / 2 + 'px'
  if (position.includes('w')) styles.left = -size / 2 + 'px'
  if (position.includes('e')) styles.right = -size / 2 + 'px'
  if (position === 'n' || position === 's') styles.left = rect.width / 2 - size / 2 + 'px'
  if (position === 'w' || position === 'e') styles.top = rect.height / 2 - size / 2 + 'px'
  styles.width = size + 'px'
  styles.height = size + 'px'
  return styles
}

function severityClass(s) {
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

function exportToMarkdownAndClose() {
  exportDropdownVisible.value = false
  exportToMarkdown()
}

function exportToJSONAndClose() {
  exportDropdownVisible.value = false
  exportToJSON()
}

function exportToZIPAndClose() {
  exportDropdownVisible.value = false
  exportToZIP()
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

function getElementSelector(el) {
  if (el.id) return '#' + el.id
  if (el.className) {
    const classes = String(el.className).split(/\s+/).filter(c => c && !c.startsWith('el-')).slice(0, 2)
    if (classes.length) return el.tagName.toLowerCase() + '.' + classes.join('.')
  }
  let path = []
  let node = el
  while (node && node !== document.body) {
    let name = node.tagName.toLowerCase()
    if (node.id) {
      name += '#' + node.id
      path.unshift(name)
      break
    }
    const siblings = Array.from(node.parentNode?.children || [])
    const same = siblings.filter(s => s.tagName === node.tagName)
    if (same.length > 1) {
      const idx = same.indexOf(node) + 1
      name += `:nth-of-type(${idx})`
    }
    path.unshift(name)
    node = node.parentNode
  }
  return path.join(' > ')
}

function getSafeTarget(e) {
  const target = e.target
  if (!target || !(target instanceof Element)) return null
  if (target.closest('.review-overlay')) return null
  return target
}

function isMultiSelectKey(e) {
  return e.ctrlKey || e.metaKey
}

function onMouseMove(e) {
  if (isDraggingToolbar.value) return
  if (resizingBoxId.value) return
  if (mode.value !== 'element' || formVisible.value || isDraggingBox.value) return
  const target = getSafeTarget(e)
  if (!target) {
    hoveredRect.value = null
    return
  }
  const rect = target.getBoundingClientRect()
  hoveredRect.value = {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height
  }
  hoveredTag.value = target.tagName.toLowerCase()
}

function onMouseOut() {
  hoveredRect.value = null
}

function onElementClick(e) {
  if (mode.value !== 'element' || formVisible.value || isDraggingBox.value || resizingBoxId.value) return
  const target = getSafeTarget(e)
  if (!target) return
  e.preventDefault()
  e.stopPropagation()

  const rect = target.getBoundingClientRect()
  const item = {
    el: target,
    selector: getElementSelector(target),
    tag: target.tagName.toLowerCase(),
    text: target.innerText?.slice(0, 40) || '',
    rect: {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    },
    docRect: {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height
    }
  }

  if (isMultiSelectKey(e)) {
    const idx = selectedElements.value.findIndex(s => s.el === target)
    if (idx > -1) selectedElements.value.splice(idx, 1)
    else selectedElements.value.push(item)
  } else {
    selectedElements.value = [item]
    selectedBoxes.value = []
  }

  if (selectedElements.value.length === 1) {
    componentTree.value = getComponentTree(target)
  }
}

function onSelectedElementClick(item, e) {
  if (!isMultiSelectKey(e)) return
  e.stopPropagation()
  removeSelectedElement(item)
}

function removeSelectedElement(item) {
  const idx = selectedElements.value.findIndex(s => s.el === item.el)
  if (idx > -1) selectedElements.value.splice(idx, 1)
  if (selectedElements.value.length === 0) componentTree.value = null
}

function onMouseDown(e) {
  if (isDraggingToolbar.value) return
  if (mode.value !== 'viewport' || formVisible.value || resizingBoxId.value) return
  if (!getSafeTarget(e)) return
  e.preventDefault()
  isDraggingBox.value = true
  dragStart.value = { x: e.clientX, y: e.clientY }
  dragRect.value = { x: dragStart.value.x, y: dragStart.value.y, width: 0, height: 0 }
}

function onMouseMoveDrag(e) {
  if (isDraggingToolbar.value) return
  if (resizingBoxId.value) {
    onResizeMove(e)
    return
  }
  if (!isDraggingBox.value) return
  const x = e.clientX
  const y = e.clientY
  dragRect.value = {
    x: Math.min(dragStart.value.x, x),
    y: Math.min(dragStart.value.y, y),
    width: Math.abs(x - dragStart.value.x),
    height: Math.abs(y - dragStart.value.y)
  }
}

function onMouseUp(e) {
  if (isDraggingToolbar.value) {
    isDraggingToolbar.value = false
    return
  }
  if (isResizingToolbar.value) {
    isResizingToolbar.value = false
    return
  }
  if (isDraggingModal.value) {
    isDraggingModal.value = false
    return
  }
  if (isResizingModal.value) {
    isResizingModal.value = false
    return
  }
  if (resizingBoxId.value) {
    resizingBoxId.value = null
    resizeHandle.value = ''
    resizeStart.value = { x: 0, y: 0, rect: null }
    return
  }
  if (!isDraggingBox.value) return
  isDraggingBox.value = false
  if (dragRect.value && dragRect.value.width > 10 && dragRect.value.height > 10) {
    if (!isMultiSelectKey(e)) {
      selectedElements.value = []
    }
    selectedBoxes.value.push({
      id: 'box-' + Date.now() + '-' + boxCounter.value++,
      index: selectedBoxes.value.length,
      rect: {
        x: dragRect.value.x + window.scrollX,
        y: dragRect.value.y + window.scrollY,
        width: dragRect.value.width,
        height: dragRect.value.height
      }
    })
  }
  dragRect.value = null
}

function onBoxMouseDown(box, e) {
  if (!isMultiSelectKey(e)) return
  e.stopPropagation()
  removeSelectedBox(box)
}

function removeSelectedBox(box) {
  selectedBoxes.value = selectedBoxes.value.filter(b => b.id !== box.id)
  selectedBoxes.value.forEach((b, idx) => { b.index = idx })
}

function onResizeStart(box, position, e) {
  resizingBoxId.value = box.id
  resizeHandle.value = position
  resizeStart.value = {
    x: e.clientX + window.scrollX,
    y: e.clientY + window.scrollY,
    rect: { ...box.rect }
  }
}

function onResizeMove(e) {
  if (!resizingBoxId.value || !resizeStart.value.rect) return
  const dx = e.clientX + window.scrollX - resizeStart.value.x
  const dy = e.clientY + window.scrollY - resizeStart.value.y
  const orig = resizeStart.value.rect
  const box = selectedBoxes.value.find(b => b.id === resizingBoxId.value)
  if (!box) return

  let { x, y, width, height } = orig
  if (resizeHandle.value.includes('e')) width = Math.max(10, orig.width + dx)
  if (resizeHandle.value.includes('s')) height = Math.max(10, orig.height + dy)
  if (resizeHandle.value.includes('w')) {
    width = Math.max(10, orig.width - dx)
    x = orig.x + (orig.width - width)
  }
  if (resizeHandle.value.includes('n')) {
    height = Math.max(10, orig.height - dy)
    y = orig.y + (orig.height - height)
  }
  box.rect = { x, y, width, height }
}

function onToolbarMouseDown(e) {
  const isDragHandle = e.target.classList?.contains('toolbar-title') || e.target.classList?.contains('review-toolbar')
  if (!isDragHandle) return
  isDraggingToolbar.value = true
  toolbarDragStart.value = {
    x: e.clientX - toolbarPos.value.x,
    y: e.clientY - toolbarPos.value.y
  }
}

function onToolbarMouseMove(e) {
  if (isDraggingToolbar.value) {
    toolbarPos.value = {
      x: e.clientX - toolbarDragStart.value.x,
      y: e.clientY - toolbarDragStart.value.y
    }
    return
  }
  if (isResizingToolbar.value) {
    const dx = e.clientX - toolbarResizeStart.value.x
    const dy = e.clientY - toolbarResizeStart.value.y
    toolbarSize.value = {
      width: Math.max(400, toolbarResizeStart.value.width + dx),
      height: Math.max(48, toolbarResizeStart.value.height + dy)
    }
  }
}

function onToolbarResizeStart(e) {
  isResizingToolbar.value = true
  const toolbarEl = e.target.closest('.review-toolbar')
  const rect = toolbarEl?.getBoundingClientRect()
  toolbarResizeStart.value = {
    x: e.clientX,
    y: e.clientY,
    width: rect?.width || 0,
    height: rect?.height || 0
  }
}

function onModalHeaderMouseDown(e) {
  if (!e.target.classList?.contains('modal-header')) return
  isDraggingModal.value = true
  modalDragStart.value = {
    x: e.clientX - modalPos.value.x,
    y: e.clientY - modalPos.value.y
  }
}

function onModalMouseMove(e) {
  if (isDraggingModal.value) {
    modalPos.value = {
      x: e.clientX - modalDragStart.value.x,
      y: e.clientY - modalDragStart.value.y
    }
  } else if (isResizingModal.value) {
    const dx = e.clientX - modalResizeStart.value.x
    const dy = e.clientY - modalResizeStart.value.y
    modalSize.value = {
      width: Math.max(360, modalResizeStart.value.width + dx),
      height: Math.max(300, modalResizeStart.value.height + dy)
    }
  }
}

function onModalResizeStart(e) {
  isResizingModal.value = true
  modalResizeStart.value = {
    x: e.clientX,
    y: e.clientY,
    width: modalSize.value.width,
    height: modalSize.value.height
  }
}

function onKeyDown(e) {
  if (e.key === 'Escape') {
    if (formVisible.value) formVisible.value = false
    else close()
  }
}

function refreshElementRects() {
  selectedElements.value = selectedElements.value.map(item => {
    const el = item.el || document.querySelector(item.selector)
    if (!el) return item
    const rect = el.getBoundingClientRect()
    return {
      ...item,
      el,
      rect: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      }
    }
  })
}

function onScroll() {
  scrollPos.value = { x: window.scrollX, y: window.scrollY }
  refreshElementRects()
}

function handleOverlayClick() {}

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
  const rect = el.getBoundingClientRect()
  selectedElements.value = [{
    el,
    selector: node.selector,
    tag: el.tagName.toLowerCase(),
    text: el.innerText?.slice(0, 40) || '',
    rect: {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    },
    docRect: {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height
    }
  }]
  selectedBoxes.value = []
  componentTree.value = getComponentTree(el)
  treeVisible.value = false
}

function clearAllSelections() {
  selectedElements.value = []
  selectedBoxes.value = []
  componentTree.value = null
  dragRect.value = null
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
  if (!window.confirm('确定删除这条评审意见吗？')) return
  deleteReview(id)
  emit('delete', { id })
}

function clearPage() {
  if (pageReviews.value.length === 0) return
  if (!window.confirm('确定清空当前页面的所有评审意见吗？')) return
  clearPageReviews(resolvedPagePath.value)
  emit('clear', { pagePath: resolvedPagePath.value })
}

function close() {
  emit('update:active', false)
}

function bindEvents() {
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseout', onMouseOut)
  document.addEventListener('click', onElementClick, true)
  document.addEventListener('mousedown', onMouseDown)
  document.addEventListener('mousemove', onMouseMoveDrag)
  document.addEventListener('mousemove', onToolbarMouseMove)
  document.addEventListener('mousemove', onModalMouseMove)
  document.addEventListener('mouseup', onMouseUp)
  document.addEventListener('keydown', onKeyDown)
  window.addEventListener('scroll', onScroll, true)
}

function unbindEvents() {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseout', onMouseOut)
  document.removeEventListener('click', onElementClick, true)
  document.removeEventListener('mousedown', onMouseDown)
  document.removeEventListener('mousemove', onMouseMoveDrag)
  document.removeEventListener('mousemove', onToolbarMouseMove)
  document.removeEventListener('mousemove', onModalMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
  document.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('scroll', onScroll, true)
}

onMounted(() => {
  if (props.active) bindEvents()
})

onUnmounted(() => {
  unbindEvents()
})

let watcher = null
nextTick(() => {
  watcher = watch(() => props.active, (val) => {
    if (val) {
      bindEvents()
      mode.value = 'element'
    } else {
      unbindEvents()
      clearAllSelections()
      resetForm()
      hoveredRect.value = null
      listVisible.value = false
      treeVisible.value = false
    }
  })
})

onUnmounted(() => {
  if (watcher) watcher()
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
