import {resolve} from 'path'
import url from 'url'
import {defineConfig} from 'vite'
import postcssNesting from 'postcss-nested'
import postcssMixins from 'postcss-mixins'

export default defineConfig({
  resolve: {
    alias: {
      '@': url.fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  server: {
    port: 3000,
  },
  css: {
    postcss: {
      plugins: [
        postcssMixins({mixinsDir: resolve(__dirname, 'src')}),
        postcssNesting,
      ],
    },
  },
})
