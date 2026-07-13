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
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
