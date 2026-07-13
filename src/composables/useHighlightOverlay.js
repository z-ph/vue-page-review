import { ref, unref, watchEffect } from 'vue'

/**
 * 高亮覆盖层样式 helper（无头 composable，不渲染任何 UI）。
 * 负责文档坐标到视口坐标的转换以及高亮/框选元素的样式计算。
 *
 * @param {object} [options]
 * @param {import('vue').Ref<boolean>|boolean} [options.active] 传入时仅在激活期间跟踪滚动；不传则始终跟踪
 */
export function useHighlightOverlay({ active } = {}) {
  const scrollPos = ref({ x: 0, y: 0 })

  watchEffect((onCleanup) => {
    if (active !== undefined && !unref(active)) return
    scrollPos.value = { x: window.scrollX, y: window.scrollY }
    const onScroll = () => {
      scrollPos.value = { x: window.scrollX, y: window.scrollY }
    }
    window.addEventListener('scroll', onScroll, true)
    onCleanup(() => window.removeEventListener('scroll', onScroll, true))
  })

  const toViewportRect = (rect) => {
    if (!rect) return null
    return {
      x: rect.x - scrollPos.value.x,
      y: rect.y - scrollPos.value.y,
      width: rect.width,
      height: rect.height
    }
  }

  const highlightStyle = (rect) => {
    if (!rect) return {}
    return {
      left: rect.x + 'px',
      top: rect.y + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px'
    }
  }

  const boxStyle = (rect) => {
    if (!rect) return {}
    return {
      left: rect.x + 'px',
      top: rect.y + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px'
    }
  }

  const handleStyle = (position, rect) => {
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

  return {
    scrollPos,
    toViewportRect,
    highlightStyle,
    boxStyle,
    handleStyle
  }
}
