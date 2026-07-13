import { ref, unref, watchEffect } from 'vue'

/**
 * 元素选择交互逻辑（无头 composable，不渲染任何 UI）。
 * 提供 hover 高亮、点击选择、Ctrl/Cmd 多选以及滚动后的矩形刷新。
 *
 * @param {object} options
 * @param {import('vue').Ref<boolean>|boolean} options.active 评审是否激活
 * @param {import('vue').Ref<string>|string} options.mode 当前模式，'element' 时生效
 * @param {(target: Element) => boolean} [options.onIgnoreTarget] 返回 true 表示忽略该目标（如评审自身 UI）
 */
export function useElementSelection({ active, mode, onIgnoreTarget } = {}) {
  const hoveredRect = ref(null)
  const hoveredTag = ref('')
  const selectedElements = ref([])
  const scrollPos = ref({ x: 0, y: 0 })

  const isEnabled = () => !!unref(active) && unref(mode) === 'element'

  const getSafeTarget = (e) => {
    const target = e.target
    if (!target || !(target instanceof Element)) return null
    if (onIgnoreTarget && onIgnoreTarget(target)) return null
    return target
  }

  const onMouseMove = (e) => {
    if (!isEnabled()) return
    if (e.buttons !== 0) return
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

  const onMouseOut = () => {
    hoveredRect.value = null
  }

  const onClick = (e) => {
    if (!isEnabled()) return
    const target = getSafeTarget(e)
    if (!target) return
    // 不拦截下载链接：导出通过 a[download] 触发，preventDefault 会取消下载
    if (target.closest('a[download]')) return
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
        x: rect.left + scrollPos.value.x,
        y: rect.top + scrollPos.value.y,
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
    }
  }

  const refreshRects = () => {
    selectedElements.value = selectedElements.value.map(item => {
      const el = item.el || (item.selector ? document.querySelector(item.selector) : null)
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

  const onScroll = () => {
    scrollPos.value = { x: window.scrollX, y: window.scrollY }
    refreshRects()
  }

  watchEffect((onCleanup) => {
    if (!isEnabled()) return
    scrollPos.value = { x: window.scrollX, y: window.scrollY }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('click', onClick, true)
    window.addEventListener('scroll', onScroll, true)
    onCleanup(() => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('scroll', onScroll, true)
    })
  })

  const selectElement = (el) => {
    if (!el || !(el instanceof Element)) return
    const rect = el.getBoundingClientRect()
    selectedElements.value = [{
      el,
      selector: getElementSelector(el),
      tag: el.tagName.toLowerCase(),
      text: el.innerText?.slice(0, 40) || '',
      rect: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      },
      docRect: {
        x: rect.left + scrollPos.value.x,
        y: rect.top + scrollPos.value.y,
        width: rect.width,
        height: rect.height
      }
    }]
  }

  const removeSelectedElement = (item) => {
    selectedElements.value = selectedElements.value.filter(s => s.el !== item.el)
  }

  const clearSelectedElements = () => {
    selectedElements.value = []
  }

  return {
    hoveredRect,
    hoveredTag,
    selectedElements,
    selectElement,
    removeSelectedElement,
    clearSelectedElements,
    refreshRects
  }
}

function isMultiSelectKey(e) {
  return e.ctrlKey || e.metaKey
}

function getElementSelector(el) {
  if (!el || !(el instanceof Element)) return ''
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
