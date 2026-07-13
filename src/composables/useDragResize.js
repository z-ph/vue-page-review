import { ref, watch } from 'vue'

/**
 * 通用浮动面板拖拽与尺寸调整逻辑（无头 composable，不渲染任何 UI）。
 * 适用于工具栏、弹窗以及任意自定义面板。
 *
 * @param {object} options
 * @param {{x: number, y: number}} [options.initialPosition] 初始偏移
 * @param {{width: number|null, height: number|null}} [options.initialSize] 初始尺寸
 * @param {number} [options.minWidth] 最小宽度
 * @param {number} [options.minHeight] 最小高度
 * @param {(target: EventTarget) => boolean} [options.isDragHandle] 判断 mousedown 目标是否为拖拽手柄
 * @param {import('vue').Ref<HTMLElement|null>} [options.measureRef] 首次缩放前用于测量实际尺寸的模板引用
 */
export function useDragResize({
  initialPosition = { x: 0, y: 0 },
  initialSize = { width: null, height: null },
  minWidth = 200,
  minHeight = 40,
  isDragHandle,
  measureRef = null
} = {}) {
  const position = ref({ ...initialPosition })
  const size = ref({ ...initialSize })
  const isDragging = ref(false)
  const isResizing = ref(false)

  const dragStart = { x: 0, y: 0 }
  const resizeStart = { x: 0, y: 0, width: 0, height: 0 }

  const onDragStart = (e) => {
    if (isDragHandle && !isDragHandle(e.target)) return
    isDragging.value = true
    dragStart.x = e.clientX - position.value.x
    dragStart.y = e.clientY - position.value.y
    e.stopPropagation()
  }

  const onResizeStart = (e) => {
    let startWidth = size.value.width ?? 0
    let startHeight = size.value.height ?? 0
    if ((startWidth === 0 || startHeight === 0) && measureRef?.value) {
      const rect = measureRef.value.getBoundingClientRect()
      startWidth = rect.width
      startHeight = rect.height
    }
    size.value = { width: startWidth, height: startHeight }
    isResizing.value = true
    resizeStart.x = e.clientX
    resizeStart.y = e.clientY
    resizeStart.width = startWidth
    resizeStart.height = startHeight
    e.stopPropagation()
  }

  watch([isDragging, isResizing], ([dragging, resizing], _, onCleanup) => {
    if (!dragging && !resizing) return
    const handleMove = (e) => {
      if (isDragging.value) {
        position.value = {
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        }
      } else if (isResizing.value) {
        const dx = e.clientX - resizeStart.x
        const dy = e.clientY - resizeStart.y
        size.value = {
          width: Math.max(minWidth, resizeStart.width + dx),
          height: Math.max(minHeight, resizeStart.height + dy)
        }
      }
    }
    const handleUp = () => {
      isDragging.value = false
      isResizing.value = false
    }
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)
    onCleanup(() => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleUp)
    })
  })

  return {
    position,
    size,
    isDragging,
    isResizing,
    onDragStart,
    onResizeStart
  }
}
