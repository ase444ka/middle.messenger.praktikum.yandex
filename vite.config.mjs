import {resolve} from 'path'
import { defineConfig } from 'vite'
import postcssNesting from 'postcss-nested'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  plugins: [handlebars({
    partialDirectory: resolve(__dirname, 'src/partials'),
    context: {
      title: 'hello yandex'
    }
  })],
  server: {
    port: 3000
  }, 
  css: {
    postcss: {
      plugins: [
        postcssNesting
      ]
    }
  }
}) 