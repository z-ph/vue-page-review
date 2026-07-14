import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/index.js',
      name: 'VuePageReview',
      fileName: (format) => `vue-page-review.${format === 'umd' ? 'umd.cjs' : 'js'}`,
      formats: ['es', 'umd']
    },
    cssCodeSplit: false,
    rolldownOptions: {
      external: ['vue', 'element-plus', '@element-plus/icons-vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@element-plus/icons-vue': 'ElementPlusIconsVue'
        },
        // 保留函数/类的 name 属性（组件名），不被压缩混淆，
        // 方便使用方在 Vue DevTools 与堆栈中定位组件
        // https://oxc.rs/docs/guide/usage/minifier/mangling.html
        minify: {
          mangle: {
            keepNames: true
          }
        }
      }
    }
  }
})
