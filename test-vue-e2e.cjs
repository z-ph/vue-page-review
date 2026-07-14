// vue-page-review 端到端验收脚本（对齐 react-page-review/test-react-e2e.cjs）
// 用法: NODE_PATH=$(npm root -g) node test-vue-e2e.cjs
// 前置: examples/vue-test-app 的 vite dev server 已启动 (默认 5173)
const { chromium } = require('playwright')

const BASE = process.env.BASE_URL || 'http://localhost:5173'

const results = []
function check(name, ok, extra = '') {
  results.push({ name, ok })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? '  -- ' + extra : ''}`)
}

async function openMoreMenu(page) {
  await page.locator('.vpr-review-toolbar .el-dropdown .el-button').click()
  await page.waitForSelector('.el-dropdown-menu__item:visible', { state: 'visible' })
}

async function clickMoreItem(page, label) {
  await openMoreMenu(page)
  await page.locator('.el-dropdown-menu__item:visible').filter({ hasText: label }).click()
}

async function waitBlob(page, minCount) {
  await page.waitForFunction(
    (n) => (window.__blobs || []).length >= n,
    minCount,
    { timeout: 15000 }
  )
  return page.evaluate(() => window.__blobs.at(-1))
}

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
  const pageErrors = []
  page.on('pageerror', (e) => pageErrors.push(String(e)))
  const consoleWarnings = []
  page.on('console', (msg) => {
    if (msg.type() === 'warning' || msg.type() === 'error') consoleWarnings.push(msg.text())
  })

  await page.addInitScript(() => {
    window.__blobs = []
    const orig = URL.createObjectURL.bind(URL)
    URL.createObjectURL = function (blob) {
      if (blob && typeof blob.arrayBuffer === 'function') {
        blob.arrayBuffer().then((buf) => {
          window.__blobs.push({ type: blob.type, bytes: Array.from(new Uint8Array(buf)) })
        })
      }
      return orig(blob)
    }
    // 记录评审 overlay 的 display 变化（验证截图期间被隐藏）
    window.__overlayDisplayLog = []
    new MutationObserver((mutations) => {
      for (const m of mutations) {
        const t = m.target
        if (t && t.classList && t.classList.contains('vpr-review-overlay')) {
          window.__overlayDisplayLog.push(t.style.display || '')
        }
      }
    }).observe(document, {
      attributes: true,
      attributeFilter: ['style'],
      subtree: true
    })
  })

  await page.goto(BASE, { waitUntil: 'networkidle' })

  // 1. 启动评审模式
  await page.getByRole('button', { name: 'Start Review' }).click()
  await page.waitForSelector('.vpr-review-toolbar', { state: 'visible' })
  check('工具栏渲染（vpr- 前缀类名）', true)

  // 2. 样式注入
  const styleInjected = await page.$eval('#vpr-styles', (el) => el.textContent.length).catch(() => 0)
  check('样式标签自动注入 (#vpr-styles)', styleInjected > 500, `长度 ${styleInjected}`)

  // 3. 自定义类名前缀检查
  const toolbarClasses = await page.$$eval('.vpr-review-toolbar *', (els) =>
    Array.from(new Set(els.flatMap((el) => Array.from(el.classList))))
  )
  const badClasses = toolbarClasses.filter(
    (c) => !c.startsWith('vpr-') && !c.startsWith('el-') && !c.startsWith('is-')
  )
  check('自定义类名均带 vpr-/el- 前缀', badClasses.length === 0, badClasses.join(','))

  // 4. 元素模式：点击卡片选中
  await page.click('.test-card >> nth=0')
  await page.waitForSelector('.vpr-selected-box', { state: 'visible' })
  let selectedCount = await page.locator('.vpr-selected-box').count()
  check('点击卡片后元素选中高亮', selectedCount === 1, `数量 ${selectedCount}`)

  // 5. Ctrl 多选（Action 按钮，隐式 role=button）
  await page.click('.test-card button:has-text("Action 3")', { modifiers: ['ControlOrMeta'] })
  await page.waitForFunction(() => document.querySelectorAll('.vpr-selected-box').length === 2)
  selectedCount = await page.locator('.vpr-selected-box').count()
  check('Ctrl/Cmd 多选第二个元素', selectedCount === 2, `数量 ${selectedCount}`)

  // 6. 选中后不自动弹窗
  const dialogAutoOpen = await page.locator('.vpr-review-dialog').isVisible().catch(() => false)
  check('选中后未自动弹出评审弹窗', !dialogAutoOpen)

  // 7. 点击「评审」弹出弹窗
  await page.locator('.vpr-review-toolbar .el-badge .el-button').click()
  await page.waitForSelector('.vpr-review-dialog', { state: 'visible' })
  check('点击「评审」弹出评审弹窗', true)

  // 8. 弹窗内目标数量
  const targetTags = await page.locator('.vpr-review-dialog .vpr-target-tag').count()
  check('评审弹窗显示 2 个选中目标', targetTags === 2, `数量 ${targetTags}`)

  // 9. 填写表单并保存
  await page.getByPlaceholder('例如：按钮样式不统一').fill('E2E 测试标题')
  await page.getByPlaceholder('描述问题现象、影响和改进建议').fill('E2E 测试建议内容')
  await page.locator('.vpr-review-dialog .el-dialog__footer .el-button--primary').click()
  await page.waitForSelector('.vpr-review-dialog', { state: 'hidden' })
  check('保存评审后弹窗关闭', true)

  // 10. localStorage 写入
  const stored = await page.evaluate(() => {
    const raw = localStorage.getItem('page-reviews')
    return raw ? JSON.parse(raw) : null
  })
  const allReviews = stored ? (Array.isArray(stored) ? stored : Object.values(stored).flat()) : []
  const mine = allReviews.find((r) => r.title === 'E2E 测试标题')
  check('localStorage 写入评审记录', !!mine, mine ? `id=${mine.id}` : '')
  check('记录包含 2 个目标', !!mine && Array.isArray(mine.targets) && mine.targets.length === 2)
  check(
    '记录含 CSS 选择器与 xpath',
    !!mine && mine.targets.every((t) => t.selector && t.locators?.cssSelector && t.locators?.xpath)
  )
  const ariaTarget = mine?.targets?.find((t) => t.aria && (t.aria.role || t.aria.accessibleName))
  check('记录含无障碍信息（role/accessibleName）', !!ariaTarget, JSON.stringify(ariaTarget?.aria || {}))

  // 11. 「更多」下拉 click 触发、移开不消失
  await openMoreMenu(page)
  await page.mouse.move(10, 10)
  await page.waitForTimeout(300)
  const menuStillOpen = await page.locator('.el-dropdown-menu__item:visible').first().isVisible()
  check('「更多」下拉点击触发、移开不消失', menuStillOpen)
  const menuItems = await page.locator('.el-dropdown-menu__item:visible').allInnerTexts()
  check('下拉菜单项齐全（6 项）', menuItems.length === 6, menuItems.join(' / '))

  // 12. 导出 JSON（字节 + 真实下载事件）
  const [jsonDownload] = await Promise.all([
    page.waitForEvent('download', { timeout: 10000 }).catch(() => null),
    page.locator('.el-dropdown-menu__item:visible').filter({ hasText: '导出 JSON' }).click()
  ])
  const jsonBlob = await waitBlob(page, 1)
  const jsonText = Buffer.from(jsonBlob.bytes).toString('utf8')
  let jsonOk = false
  try {
    const parsed = JSON.parse(jsonText)
    const list = Array.isArray(parsed) ? parsed : parsed.reviews || Object.values(parsed).flat()
    jsonOk = JSON.stringify(list).includes('E2E 测试标题')
  } catch {}
  check('导出 JSON 可下载且内容正确', jsonOk, `${jsonBlob.bytes.length} bytes`)
  check('导出触发真实浏览器下载事件', !!jsonDownload, jsonDownload?.suggestedFilename() || '未触发')

  // 13. 导出 Markdown
  await clickMoreItem(page, '导出 Markdown')
  const mdBlob = await waitBlob(page, 2)
  const mdText = Buffer.from(mdBlob.bytes).toString('utf8')
  check('导出 Markdown 可下载且内容正确', mdText.includes('E2E 测试标题'), `${mdBlob.bytes.length} bytes`)

  // 14. 导出 ZIP
  await clickMoreItem(page, '导出 ZIP')
  const zipBlob = await waitBlob(page, 3)
  const isZip = zipBlob.bytes[0] === 0x50 && zipBlob.bytes[1] === 0x4b
  check('导出 ZIP 可下载且为合法 ZIP', isZip, `${zipBlob.bytes.length} bytes, 魔数 ${zipBlob.bytes.slice(0, 2)}`)

  // 15. 评审列表抽屉 + 头部「操作」下拉
  await clickMoreItem(page, '评审列表')
  await page.waitForSelector('.el-drawer:visible', { state: 'visible' })
  const drawerText = await page.locator('.el-drawer:visible').first().innerText()
  check('评审列表抽屉显示已保存记录', drawerText.includes('E2E 测试标题'))
  const headerButtons = await page.locator('.el-drawer:visible .el-drawer__header .el-button').count()
  check('抽屉头部只有「操作」一个按钮', headerButtons === 1, `按钮数 ${headerButtons}`)
  await page.locator('.el-drawer:visible .el-drawer__header .el-dropdown .el-button').click()
  await page.waitForSelector('.el-drawer:visible .el-dropdown-menu__item', { state: 'visible' })
  const drawerMenuItems = await page.locator('.el-drawer:visible .el-dropdown-menu__item').allInnerTexts()
  check(
    '抽屉「操作」下拉 4 项齐全',
    drawerMenuItems.length === 4 && drawerMenuItems[3].includes('清空本页'),
    drawerMenuItems.join(' / ')
  )
  // 再点一次触发按钮收起下拉，避免遮挡关闭按钮
  await page.locator('.el-drawer:visible .el-drawer__header .el-dropdown .el-button').click()
  await page.waitForTimeout(300)
  await page.locator('.el-drawer:visible .el-drawer__close-btn').first().click()
  await page.waitForTimeout(600)

  // 16. 抽屉关闭后页面可交互（pointer-events 不泄漏）+ 组件树抽屉
  await page.click('.test-card >> nth=1')
  await page.waitForSelector('.vpr-selected-box', { state: 'visible' })
  check('抽屉关闭后页面可正常选中元素', true)
  await clickMoreItem(page, '组件树')
  await page.waitForSelector('.el-drawer:visible', { state: 'visible' })
  const treeText = await page.locator('.el-drawer:visible').first().innerText()
  check('组件树抽屉显示 DOM 树', treeText.includes('DOM 树'))
  await page.locator('.el-drawer:visible .el-drawer__close-btn').first().click()
  await page.waitForTimeout(600)

  // 17. 取消选择
  await clickMoreItem(page, '取消选择')
  await page.waitForFunction(() => document.querySelectorAll('.vpr-selected-box').length === 0)
  check('「取消选择」清空所有选中', true)

  // 18. 混合模式滚动跟随（滚动监听与模式解耦）
  await page.evaluate(() => {
    const spacer = document.createElement('div')
    spacer.id = 'e2e-scroll-spacer'
    spacer.style.height = '2000px'
    document.body.appendChild(spacer)
  })
  // 框定视图模式框选一个区域
  await page.locator('.vpr-review-toolbar').getByText('框定视图', { exact: true }).click()
  await page.mouse.move(200, 500)
  await page.mouse.down()
  await page.mouse.move(400, 650, { steps: 5 })
  await page.mouse.up()
  await page.waitForSelector('.vpr-drag-rect.vpr-selected-box', { state: 'visible' })
  // 切回元素模式选中一个元素（两种高亮共存）
  await page.locator('.vpr-review-toolbar').getByText('选择元素', { exact: true }).click()
  await page.click('.test-card >> nth=4')
  await page.waitForSelector('.vpr-highlight-box.vpr-selected-box', { state: 'visible' })

  const rectOf = (sel) =>
    page.evaluate((s) => {
      const el = document.querySelector(s)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { x: r.left, y: r.top, width: r.width, height: r.height }
    }, sel)
  const waitRectTop = (sel, y) =>
    page.waitForFunction(
      ([s, top]) => {
        const el = document.querySelector(s)
        return el && Math.abs(el.getBoundingClientRect().top - top) < 3
      },
      [sel, y],
      { timeout: 10000 }
    )

  const boxBefore = await rectOf('.vpr-drag-rect.vpr-selected-box')
  const elBefore = await rectOf('.vpr-highlight-box.vpr-selected-box')
  // 元素模式下滚动：框选区域也应跟随
  await page.evaluate(() => window.scrollBy(0, 300))
  await waitRectTop('.vpr-highlight-box.vpr-selected-box', elBefore.y - 300)
  const boxAfter = await rectOf('.vpr-drag-rect.vpr-selected-box')
  const elAfter = await rectOf('.vpr-highlight-box.vpr-selected-box')
  check(
    '元素模式下滚动：框选区域跟随文档',
    !!boxAfter && Math.abs(boxAfter.y - (boxBefore.y - 300)) < 3,
    boxAfter ? `Δy=${(boxAfter.y - boxBefore.y).toFixed(1)}` : '框选高亮缺失'
  )
  check(
    '元素模式下滚动：元素高亮跟随元素',
    !!elAfter && Math.abs(elAfter.y - (elBefore.y - 300)) < 3,
    elAfter ? `Δy=${(elAfter.y - elBefore.y).toFixed(1)}` : '元素高亮缺失'
  )

  // 框选模式下滚动：元素高亮也应跟随
  await page.locator('.vpr-review-toolbar').getByText('框定视图', { exact: true }).click()
  await page.evaluate(() => window.scrollBy(0, 300))
  await waitRectTop('.vpr-highlight-box.vpr-selected-box', elAfter.y - 300)
  const boxAfter2 = await rectOf('.vpr-drag-rect.vpr-selected-box')
  const elAfter2 = await rectOf('.vpr-highlight-box.vpr-selected-box')
  check(
    '框选模式下滚动：元素高亮跟随元素',
    !!elAfter2 && Math.abs(elAfter2.y - (elAfter.y - 300)) < 3,
    elAfter2 ? `Δy=${(elAfter2.y - elAfter.y).toFixed(1)}` : '元素高亮缺失'
  )
  check(
    '框选模式下滚动：框选区域跟随文档',
    !!boxAfter2 && Math.abs(boxAfter2.y - (boxAfter.y - 300)) < 3,
    boxAfter2 ? `Δy=${(boxAfter2.y - boxAfter.y).toFixed(1)}` : '框选高亮缺失'
  )

  // 清理：回顶部、移除撑高元素、清空选择、切回元素模式
  await page.evaluate(() => {
    window.scrollTo(0, 0)
    document.getElementById('e2e-scroll-spacer')?.remove()
  })
  await clickMoreItem(page, '取消选择')
  await page.locator('.vpr-review-toolbar').getByText('选择元素', { exact: true }).click()

  // 19. 截图期间隐藏评审 UI（导出截图纯净）
  await page.click('.test-card >> nth=0')
  await page.waitForSelector('.vpr-highlight-box.vpr-selected-box', { state: 'visible' })
  await page.locator('.vpr-review-toolbar .el-badge .el-button').click()
  await page.waitForSelector('.vpr-review-dialog', { state: 'visible' })
  await page.locator('.vpr-review-dialog .el-checkbox', { hasText: '完整页面' }).click()
  await page.waitForFunction(
    () => {
      const w = Array.from(document.querySelectorAll('.vpr-review-dialog .el-checkbox'))
        .find((el) => el.textContent.includes('完整页面'))
      return !!w?.querySelector('input')?.checked
    },
    null,
    { timeout: 5000 }
  )
  check('勾选「完整页面」截图选项', true)
  await page.getByPlaceholder('例如：按钮样式不统一').fill('E2E 截图评审')
  await page.getByPlaceholder('描述问题现象、影响和改进建议').fill('E2E 截图建议')
  await page.locator('.vpr-review-dialog .el-dialog__footer .el-button--primary').click()
  // 断言：截图生成期间 overlay 处于 display:none（MutationObserver 已记录）
  await page.waitForFunction(() => (window.__overlayDisplayLog || []).includes('none'), null, {
    timeout: 15000
  })
  check('保存评审截图期间 overlay 曾隐藏（display:none）', true)
  // 截图期间 overlay（含弹窗）被隐藏，弹窗消失不等于保存完成；以记录落盘为完成信号
  const savedWithShot = await page
    .waitForFunction(
      () => {
        const raw = localStorage.getItem('page-reviews')
        if (!raw) return false
        const list = JSON.parse(raw)
        const reviews = Array.isArray(list) ? list : Object.values(list).flat()
        const r = reviews.find((x) => x.title === 'E2E 截图评审')
        return !!(
          r &&
          r.screenshots?.some(
            (s) => s.type === 'fullpage' && s.data && s.data.startsWith('data:image/png')
          )
        )
      },
      null,
      { timeout: 20000 }
    )
    .then(() => true)
    .catch(() => false)
  check('评审记录落盘且含完整页面截图数据', savedWithShot)
  const overlayRestored = await page.evaluate(() => {
    const el = document.querySelector('.vpr-review-overlay')
    return el ? el.style.display !== 'none' : false
  })
  check('截图完成后 overlay 显示已恢复', overlayRestored)

  // 导出 ZIP 并解码其中的完整页面 PNG（PNG 头 + IHDR 尺寸断言）
  await clickMoreItem(page, '导出 ZIP')
  const zipBlobPng = await waitBlob(page, 4)
  const JSZip = require('jszip')
  const zip = await JSZip.loadAsync(Buffer.from(zipBlobPng.bytes))
  const pngNames = Object.keys(zip.files).filter((n) => /images\/screenshot-fullpage-.*\.png$/.test(n))
  check('ZIP 内含完整页面截图文件', pngNames.length > 0, pngNames.join(','))
  let pngOk = false
  let pngInfo = ''
  if (pngNames.length > 0) {
    const png = await zip.files[pngNames[0]].async('nodebuffer')
    const isPng =
      png.length > 24 && png[0] === 0x89 && png[1] === 0x50 && png[2] === 0x4e && png[3] === 0x47
    const w = isPng ? png.readUInt32BE(16) : 0
    const h = isPng ? png.readUInt32BE(20) : 0
    pngOk = isPng && w > 0 && h > 0
    pngInfo = `${w}x${h}, ${png.length} bytes`
  }
  check('完整页面截图为合法 PNG 且尺寸有效', pngOk, pngInfo)

  // 20. 退出评审
  await page.locator('.vpr-review-toolbar .el-button--danger').click()
  await page.waitForSelector('.vpr-review-toolbar', { state: 'hidden' })
  check('退出评审后工具栏消失', true)

  // 21. 无页面级 JS 错误
  check('无页面 JS 错误', pageErrors.length === 0, pageErrors.join(' | '))

  await browser.close()

  const failed = results.filter((r) => !r.ok)
  console.log(`\n共 ${results.length} 项, 通过 ${results.length - failed.length}, 失败 ${failed.length}`)
  process.exit(failed.length ? 1 : 0)
})().catch((e) => {
  console.error('脚本异常:', e)
  process.exit(1)
})
