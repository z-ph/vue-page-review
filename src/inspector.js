export function getCssSelector(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return ''
  if (el.id) return '#' + el.id
  const tag = el.tagName.toLowerCase()
  if (el.className) {
    const classes = String(el.className)
      .split(/\s+/)
      .filter(c => c && !c.startsWith('el-') && !/^__/.test(c))
      .slice(0, 2)
    if (classes.length) return tag + '.' + classes.join('.')
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

export function getXPath(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return ''
  if (el.id) return `//*[@id="${el.id}"]`
  const parts = []
  let node = el
  while (node && node !== document.body) {
    const siblings = Array.from(node.parentNode?.children || [])
    const same = siblings.filter(s => s.tagName === node.tagName)
    const idx = same.indexOf(node) + 1
    parts.unshift(`${node.tagName.toLowerCase()}[${idx}]`)
    node = node.parentNode
  }
  parts.unshift('')
  return '/html/body/' + parts.slice(1).join('/')
}

export function getAriaInfo(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return {}
  const result = {}
  const role = el.getAttribute('role') || getImplicitRole(el)
  if (role) result.role = role

  const accessibleName = computeAccessibleName(el)
  if (accessibleName) result.accessibleName = accessibleName

  const labeledBy = el.getAttribute('aria-labelledby')
  if (labeledBy) result.labeledBy = labeledBy

  return Object.keys(result).length ? result : undefined
}

function getImplicitRole(el) {
  const tag = el.tagName.toLowerCase()
  const type = el.getAttribute('type')
  const map = {
    button: 'button',
    a: el.hasAttribute('href') ? 'link' : undefined,
    input: type === 'checkbox' ? 'checkbox' : type === 'radio' ? 'radio' : type === 'text' || !type ? 'textbox' : undefined,
    textarea: 'textbox',
    select: 'combobox',
    nav: 'navigation',
    main: 'main',
    aside: 'complementary',
    header: 'banner',
    footer: 'contentinfo',
    h1: 'heading',
    h2: 'heading',
    h3: 'heading',
    h4: 'heading',
    h5: 'heading',
    h6: 'heading',
    img: 'img',
    ul: 'list',
    ol: 'list',
    li: 'listitem'
  }
  return map[tag]
}

function computeAccessibleName(el) {
  if (el.getAttribute('aria-label')) return el.getAttribute('aria-label').trim()
  const labeledBy = el.getAttribute('aria-labelledby')
  if (labeledBy) {
    const labels = labeledBy.split(/\s+/)
      .map(id => document.getElementById(id)?.textContent?.trim())
      .filter(Boolean)
    if (labels.length) return labels.join(' ')
  }
  const label = el.labels?.[0]
  if (label) return label.textContent.trim()
  if (el.tagName.toLowerCase() === 'input' && el.placeholder) return el.placeholder.trim()
  const alt = el.getAttribute('alt')
  if (alt) return alt.trim()
  const title = el.getAttribute('title')
  if (title) return title.trim()
  if (['button', 'a'].includes(el.tagName.toLowerCase())) {
    const text = el.textContent?.trim()
    if (text) return text
  }
  return ''
}

export function getTestId(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return undefined
  const value = el.getAttribute('data-testid')
  return value || undefined
}

export function getNodeInfo(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return null
  const rect = el.getBoundingClientRect()
  return {
    tag: el.tagName.toLowerCase(),
    id: el.id || undefined,
    classes: el.className ? String(el.className).split(/\s+/).filter(Boolean) : undefined,
    selector: getCssSelector(el),
    xpath: getXPath(el),
    rect: {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height
    },
    aria: getAriaInfo(el),
    testId: getTestId(el)
  }
}

export function getDomTree(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return []
  const chain = []
  let node = el
  while (node && node !== document.body) {
    chain.unshift(node)
    node = node.parentElement
  }
  if (node === document.body) chain.unshift(document.body)
  return chain.map(getNodeInfo).filter(Boolean)
}

export function getFrameworkTree(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return []
  const vue = getVueTree(el)
  if (vue.length) return vue
  const react = getReactTree(el)
  if (react.length) return react
  return []
}

function getVueTree(el) {
  const nodes = []
  let current = el
  while (current) {
    const vue = findVueComponent(current)
    if (vue && !nodes.find(n => n.componentName === vue.componentName && n.selector === vue.selector)) {
      nodes.unshift(vue)
    }
    current = current.parentElement
  }
  return nodes
}

function findVueComponent(el) {
  const keys = Object.keys(el || {})
  const vueKey = keys.find(k => k.startsWith('__vue'))
  if (!vueKey) return null
  const instance = el[vueKey]
  const componentName = instance?.type?.name || instance?.type?.__name || instance?.parent?.type?.name
  if (!componentName) return null
  return {
    componentName,
    selector: getCssSelector(el),
    rect: getNodeInfo(el)?.rect
  }
}

function getReactTree(el) {
  const nodes = []
  const fiberKey = Object.keys(el || {}).find(k => k.startsWith('__reactFiber$'))
  if (!fiberKey) return nodes
  let fiber = el[fiberKey]
  while (fiber) {
    const name = getFiberName(fiber)
    if (name && !nodes.find(n => n.componentName === name)) {
      nodes.unshift({ componentName: name, selector: undefined, rect: undefined })
    }
    fiber = fiber.return
  }
  return nodes
}

function getFiberName(fiber) {
  if (!fiber) return null
  if (typeof fiber.type === 'function') return fiber.type.displayName || fiber.type.name || null
  if (typeof fiber.type === 'string') return null
  if (fiber.elementType) {
    if (typeof fiber.elementType === 'function') return fiber.elementType.displayName || fiber.elementType.name || null
    if (typeof fiber.elementType === 'object' && fiber.elementType?.$$typeof) return fiber.elementType.name || null
  }
  return null
}

export function getComponentTree(el) {
  return {
    dom: getDomTree(el),
    framework: getFrameworkTree(el)
  }
}
