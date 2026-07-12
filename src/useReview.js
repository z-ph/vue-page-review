import { ref } from 'vue'
import JSZip from 'jszip'

export function usePageReview(options = {}) {
  const {
    storageKey = 'page-reviews',
    defaultPagePath = () => typeof window !== 'undefined'
      ? window.location.pathname + window.location.search
      : '/'
  } = options

  function generateId() {
    return 'rv-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8)
  }

  function loadFromStorage() {
    if (typeof window === 'undefined') return []
    try {
      const raw = window.localStorage.getItem(storageKey)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  function saveToStorage(list) {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(list))
    } catch {}
  }

  const reviews = ref(loadFromStorage())

  const allReviews = () => reviews.value

  function getPageReviews(pagePath) {
    const path = pagePath || defaultPagePath()
    return reviews.value.filter(r => r.pagePath === path)
  }

  function addReview(payload) {
    const record = {
      id: generateId(),
      ...payload,
      createdAt: new Date().toISOString()
    }
    reviews.value.unshift(record)
    saveToStorage(reviews.value)
    return record
  }

  function updateReview(id, updates) {
    const idx = reviews.value.findIndex(r => r.id === id)
    if (idx > -1) {
      reviews.value[idx] = { ...reviews.value[idx], ...updates }
      saveToStorage(reviews.value)
    }
  }

  function deleteReview(id) {
    reviews.value = reviews.value.filter(r => r.id !== id)
    saveToStorage(reviews.value)
  }

  function clearPageReviews(pagePath) {
    const path = pagePath || defaultPagePath()
    reviews.value = reviews.value.filter(r => r.pagePath !== path)
    saveToStorage(reviews.value)
  }

  function clearAllReviews() {
    reviews.value = []
    saveToStorage(reviews.value)
  }

  function buildReportData() {
    return {
      exportTime: new Date().toISOString(),
      total: reviews.value.length,
      reviews: reviews.value
    }
  }

  function exportToJSON() {
    downloadBlob(
      new Blob([JSON.stringify(buildReportData(), null, 2)], { type: 'application/json' }),
      `page-reviews-${formatDate()}.json`
    )
  }

  function exportToMarkdown() {
    const content = buildMarkdown(buildReportData())
    downloadBlob(
      new Blob([content], { type: 'text/markdown' }),
      `page-reviews-${formatDate()}.md`
    )
  }

  async function exportToZIP() {
    const zip = new JSZip()
    const data = buildReportData()

    const reportForZip = {
      ...data,
      reviews: data.reviews.map(r => ({
        ...r,
        screenshots: r.screenshots?.map(s => {
          if (s.url) return { type: s.type, filename: s.filename, url: s.url }
          return { type: s.type, filename: s.filename, imagePath: `images/${s.filename}` }
        })
      }))
    }

    zip.file('review.json', JSON.stringify(reportForZip, null, 2))
    zip.file('review.md', buildMarkdown(reportForZip))

    const imagesFolder = zip.folder('images')
    for (const review of data.reviews) {
      for (const screenshot of (review.screenshots || [])) {
        if (screenshot.data && !screenshot.url) {
          const base64 = screenshot.data.replace(/^data:image\/png;base64,/, '')
          imagesFolder.file(screenshot.filename, base64, { base64: true })
        }
      }
    }

    const blob = await zip.generateAsync({ type: 'blob' })
    downloadBlob(blob, `page-reviews-${formatDate()}.zip`)
  }

  return {
    reviews,
    allReviews,
    getPageReviews,
    addReview,
    updateReview,
    deleteReview,
    clearPageReviews,
    clearAllReviews,
    exportToJSON,
    exportToMarkdown,
    exportToZIP
  }
}

function buildMarkdown(data) {
  const lines = [
    '# 页面评审报告',
    '',
    `导出时间：${new Date().toLocaleString()}`,
    `评审总数：${data.total}`,
    ''
  ]

  const grouped = groupBy(data.reviews, 'pagePath')
  Object.entries(grouped).forEach(([path, list]) => {
    lines.push(`## 页面：${path}`)
    lines.push('')
    list.forEach((item, idx) => {
      lines.push(`### ${idx + 1}. ${item.title || '未命名评审'}`)
      lines.push(`- **类型**：${item.type === 'element' ? '元素评审' : '视图范围评审'}`)
      lines.push(`- **严重等级**：${severityText(item.severity)}`)
      lines.push(`- **状态**：${item.status === 'resolved' ? '已解决' : '待处理'}`)
      lines.push(`- **窗口尺寸**：${item.viewport?.width} × ${item.viewport?.height}`)
      if (item.scroll) {
        lines.push(`- **滚动位置**：x=${item.scroll.x}, y=${item.scroll.y}`)
      }
      if (item.type === 'element' && item.elementRect) {
        lines.push(`- **元素选择器**：\`${item.selector}\``)
        lines.push(`- **元素位置**：x=${item.elementRect.x}, y=${item.elementRect.y}, width=${item.elementRect.width}, height=${item.elementRect.height}`)
        if (item.elementText) lines.push(`- **元素文本**：${item.elementText}`)
      } else if (item.viewportRect) {
        lines.push(`- **框选范围**：x=${item.viewportRect.x}, y=${item.viewportRect.y}, width=${item.viewportRect.width}, height=${item.viewportRect.height}`)
      }
      lines.push(`- **评审建议**：${item.suggestion}`)
      lines.push(`- **创建时间**：${new Date(item.createdAt).toLocaleString()}`)

      if (item.locators && Object.keys(item.locators).length > 0) {
        lines.push('')
        lines.push('#### 定位信息')
        if (item.locators.cssSelector) lines.push(`- **CSS Selector**: \`${item.locators.cssSelector}\``)
        if (item.locators.xpath) lines.push(`- **XPath**: \`${item.locators.xpath}\``)
        if (item.locators.aria?.role) lines.push(`- **ARIA Role**: ${item.locators.aria.role}`)
        if (item.locators.aria?.accessibleName) lines.push(`- **Accessible Name**: ${item.locators.aria.accessibleName}`)
        if (item.locators.testId) lines.push(`- **data-testid**: ${item.locators.testId}`)
      }

      if (item.screenshots && item.screenshots.length > 0) {
        lines.push('')
        lines.push('#### 截图')
        item.screenshots.forEach(s => {
          const src = s.url || (s.imagePath || `images/${s.filename}`)
          lines.push(`![${s.type}](${src})`)
        })
      }

      lines.push('')
    })
  })

  return lines.join('\n')
}

function downloadBlob(blob, filename) {
  if (typeof window === 'undefined') return
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function formatDate() {
  const now = new Date()
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function severityText(s) {
  const map = { low: '低', medium: '中', high: '高', critical: '严重' }
  return map[s] || s
}

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = item[key] || 'unknown'
    if (!acc[k]) acc[k] = []
    acc[k].push(item)
    return acc
  }, {})
}
