// 样式单一来源是 style.css；构建时由 Vite `?inline` 内联为字符串，
// 避免维护两份拷贝导致样式漂移。
import css from './style.css?inline'

export function injectVuePageReviewStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById('vpr-styles')) return
  const style = document.createElement('style')
  style.id = 'vpr-styles'
  style.textContent = css
  document.head.appendChild(style)
}
