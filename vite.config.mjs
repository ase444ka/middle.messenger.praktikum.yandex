import {resolve} from 'path'
import { defineConfig } from 'vite'
import postcssNesting from 'postcss-nested'
import handlebars from 'vite-plugin-handlebars';

const pageData = {
  '/pages/signin_page/index.html': {
    title: 'Авторизация',
    fields: [
      {name: 'имя', class: ''},
      {name: 'фамилия', class: 'input_simple'},
  ]
  },
};

export default defineConfig({
  root: resolve(__dirname, 'src'),
  plugins: [handlebars({
    partialDirectory: resolve(__dirname, 'src/partials'),
    context(pagePath) {
      return pageData[pagePath];
    },
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