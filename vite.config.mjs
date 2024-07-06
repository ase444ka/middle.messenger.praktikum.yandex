import {resolve} from 'path'
import { defineConfig } from 'vite'
import postcssNesting from 'postcss-nested'
import handlebars from 'vite-plugin-handlebars';

const pageData = {
  '/pages/signin_page/index.html': {
    title: 'Вход',
    fields: [
      {name: 'имя', class: ''},
      {name: 'пароль', class: 'input_simple'},
  ]
  },
  '/pages/signup_page/index.html': {
    title: 'Регистрация',
    fields: [
      {name: 'почта', class: 'input_simple'},
      {name: 'логин', class: 'input_simple'},
      {name: 'имя', class: ''},
      {name: 'фамилия', class: 'input_simple'},
      {name: 'телефон', class: 'input_simple'},
      {name: 'пароль', class: 'input_simple'},
      {name: 'пароль (ещё раз)', class: 'input_simple'},
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