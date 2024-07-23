import {resolve} from 'path'
import url from 'url'
import {defineConfig} from 'vite'
import postcssNesting from 'postcss-nested'
import postcssMixins from 'postcss-mixins'
import handlebars from 'vite-plugin-handlebars'
import pageData from './src/data/user.js'

export default defineConfig({
  resolve: {
    alias: {
      '@': url.fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        user: resolve(__dirname, 'src/pages/user_page/index.html'),
        page404: resolve(__dirname, 'src/pages/404_page/index.html'),
        page500: resolve(__dirname, 'src/pages/500_page/index.html'),
        signin: resolve(__dirname, 'src/pages/signin_page/index.html'),
        signup: resolve(__dirname, 'src/pages/signup_page/index.html'),
        chats: resolve(__dirname, 'src/pages/chats_page/index.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context(pagePath) {
        return pageData[pagePath]
      },
    }),
  ],
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
