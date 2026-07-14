import { ref, unref, computed, watchEffect } from 'vue'

/**
 * 视口框选交互逻辑（无头 composable，不渲染任何 UI）。
 * 提供拖拽创建框选、8 方向调整大小与多框选。
 *
 * @param {object} options
 * @param {import('vue').Ref<boolean>|boolean} options.active 评审是否激活
 * @param {import('vue').Ref<string>|string} options.mode 当前模式，'viewport' 时生效
 * @param {(target: Element) => boolean} [options.onIgnoreTarget] 返回 true 表示忽略该目标（如评审自身 UI）
 * @param {(box: object, e: MouseEvent) => void} [options.onBoxCreate] 框选创建回调
 */
export function useViewportBoxing({ active, mode, onIgnoreTarget, onBoxCreate } = {}) {
  const selectedBoxes = ref([])
  const dragRect = ref(null)
  const resizingBoxId = ref(null)
  const isDraggingBox = ref(false)
  const scrollPos = ref({ x: 0, y: 0 })
  const boxCounter = ref(0)

  // 拖拽过程中的瞬时状态不需要触发渲染，用普通闭包变量即可
  let dragStart = { x: 0, y: 0 }
  let resizeHandle = ''
  let resizeStart = { x: 0, y: 0, rect: null }

  const isEnabled = () => !!unref(active) && unref(mode) === 'viewport'
  const isResizing = computed(() => resizingBoxId.value !== null)

  const getSafeTarget = (e) => {
    const target = e.target
    if (!target || !(target instanceof Element)) return null
    if (onIgnoreTarget && onIgnoreTarget(target)) return null
    return target
  }

  const toViewportRect = (rect) => {
    if (!rect) return null
    return {
      x: rect.x - scrollPos.value.x,
      y: rect.y - scrollPos.value.y,
      width: rect.width,
      height: rect.height
    }
  }

  const removeBox = (box) => {
    selectedBoxes.value = selectedBoxes.value.filter(b => b.id !== box.id)
    selectedBoxes.value.forEach((b, idx) => { b.index = idx })
  }

  const clearBoxes = () => {
    selectedBoxes.value = []
    dragRect.value = null
  }

  const startResize = (box, position, e) => {
    e.stopPropagation()
    resizingBoxId.value = box.id
    resizeHandle = position
    resizeStart = {
      x: e.clientX + window.scrollX,
      y: e.clientY + window.scrollY,
      rect: { ...box.rect }
    }
  }

  const onMouseDown = (e) => {
    if (!isEnabled()) return
    if (resizingBoxId.value) return
    const target = getSafeTarget(e)
    if (!target) return
    e.preventDefault()
    isDraggingBox.value = true
    dragStart = { x: e.clientX, y: e.clientY }
    dragRect.value = { x: e.clientX, y: e.clientY, width: 0, height: 0 }
  }

  const onMouseMove = (e) => {
    if (!isEnabled() && !resizingBoxId.value) return
    if (resizingBoxId.value && resizeStart.rect) {
      const dx = e.clientX + window.scrollX - resizeStart.x
      const dy = e.clientY + window.scrollY - resizeStart.y
      const orig = resizeStart.rect
      const box = selectedBoxes.value.find(b => b.id === resizingBoxId.value)
      if (!box) return

      let { x, y, width, height } = orig
      if (resizeHandle.includes('e')) width = Math.max(10, orig.width + dx)
      if (resizeHandle.includes('s')) height = Math.max(10, orig.height + dy)
      if (resizeHandle.includes('w')) {
        width = Math.max(10, orig.width - dx)
        x = orig.x + (orig.width - width)
      }
      if (resizeHandle.includes('n')) {
        height = Math.max(10, orig.height - dy)
        y = orig.y + (orig.height - height)
      }
      box.rect = { x, y, width, height }
      return
    }
    if (!isDraggingBox.value) return
    const x = e.clientX
    const y = e.clientY
    dragRect.value = {
      x: Math.min(dragStart.x, x),
      y: Math.min(dragStart.y, y),
      width: Math.abs(x - dragStart.x),
      height: Math.abs(y - dragStart.y)
    }
  }

  const onMouseUp = (e) => {
    if (!isEnabled() && !resizingBoxId.value) return
    if (resizingBoxId.value) {
      resizingBoxId.value = null
      resizeHandle = ''
      resizeStart = { x: 0, y: 0, rect: null }
      return
    }
    if (!isDraggingBox.value) return
    isDraggingBox.value = false
    const rect = dragRect.value
    if (rect && rect.width > 10 && rect.height > 10) {
      const box = {
        id: 'box-' + Date.now() + '-' + boxCounter.value++,
        index: selectedBoxes.value.length,
        rect: {
          x: rect.x + window.scrollX,
          y: rect.y + window.scrollY,
          width: rect.width,
          height: rect.height
        }
      }
      selectedBoxes.value.push(box)
      onBoxCreate?.(box, e)
    }
    dragRect.value = null
  }

  const onScroll = () => {
    scrollPos.value = { x: window.scrollX, y: window.scrollY }
  }

  // 滚动跟随与模式解耦：评审激活即挂载，保证元素模式下框选区域也随文档滚动
  watchEffect((onCleanup) => {
    if (!unref(active)) return
    scrollPos.value = { x: window.scrollX, y: window.scrollY }
    window.addEventListener('scroll', onScroll, true)
    onCleanup(() => {
      window.removeEventListener('scroll', onScroll, true)
    })
  })

  // 框选交互仍按框选模式门控（调整尺寸中的 resizingBoxId 例外保留）
  watchEffect((onCleanup) => {
    if (!isEnabled() && !resizingBoxId.value) return
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    onCleanup(() => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    })
  })

  return {
    selectedBoxes,
    dragRect,
    resizingBoxId,
    isDraggingBox,
    isResizing,
    removeBox,
    clearBoxes,
    startResize,
    toViewportRect
  }
}
