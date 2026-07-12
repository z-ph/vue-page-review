import { toPng } from 'html-to-image'

export const SCREENSHOT_TYPES = {
  ELEMENT: 'element',
  VIEWPORT: 'viewport',
  FULL_PAGE: 'fullpage',
  BOX: 'box',
  TARGETS: 'targets'
}

export function generateScreenshotFilename(type) {
  const timestamp = Date.now()
  const rand = Math.random().toString(36).slice(2, 6)
  return `screenshot-${type}-${timestamp}-${rand}.png`
}

export async function captureElement(el, options = {}) {
  if (!el) return null
  try {
    const dataUrl = await toPng(el, {
      pixelRatio: options.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: true,
      ...options
    })
    return dataUrl
  } catch (err) {
    console.error('captureElement failed:', err)
    return null
  }
}

export async function captureViewport(options = {}) {
  const target = document.documentElement
  return captureElement(target, {
    width: window.innerWidth,
    height: window.innerHeight,
    style: {
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      overflow: 'hidden'
    },
    ...options
  })
}

export async function captureFullPage(options = {}) {
  const target = document.documentElement
  const originalOverflow = target.style.overflow
  const originalWidth = target.style.width
  const originalHeight = target.style.height

  try {
    // Temporarily expand to full scroll size
    target.style.overflow = 'visible'
    target.style.width = 'auto'
    target.style.height = 'auto'

    const dataUrl = await toPng(target, {
      pixelRatio: options.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: true,
      ...options
    })
    return dataUrl
  } catch (err) {
    console.error('captureFullPage failed:', err)
    return null
  } finally {
    target.style.overflow = originalOverflow
    target.style.width = originalWidth
    target.style.height = originalHeight
  }
}

export async function captureBox(rect, options = {}) {
  if (!rect || rect.width < 1 || rect.height < 1) return null

  const target = document.documentElement
  const originalOverflow = target.style.overflow
  const originalWidth = target.style.width
  const originalHeight = target.style.height

  try {
    target.style.overflow = 'visible'
    target.style.width = 'auto'
    target.style.height = 'auto'

    const dataUrl = await toPng(target, {
      pixelRatio: options.pixelRatio || window.devicePixelRatio || 1,
      cacheBust: true,
      ...options
    })

    return cropDataUrl(dataUrl, rect)
  } catch (err) {
    console.error('captureBox failed:', err)
    return null
  } finally {
    target.style.overflow = originalOverflow
    target.style.width = originalWidth
    target.style.height = originalHeight
  }
}

function cropDataUrl(dataUrl, rect) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const scale = window.devicePixelRatio || 1
      canvas.width = Math.round(rect.width * scale)
      canvas.height = Math.round(rect.height * scale)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(
        img,
        rect.x * scale,
        rect.y * scale,
        rect.width * scale,
        rect.height * scale,
        0,
        0,
        canvas.width,
        canvas.height
      )
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = reject
    img.src = dataUrl
  })
}

export async function dataUrlToBlob(dataUrl) {
  const res = await fetch(dataUrl)
  return res.blob()
}

export async function uploadScreenshot(dataUrl, filename, uploadFn) {
  if (!uploadFn) return null
  try {
    const blob = await dataUrlToBlob(dataUrl)
    return await uploadFn(blob, filename)
  } catch (err) {
    console.error('uploadScreenshot failed:', err)
    return null
  }
}
