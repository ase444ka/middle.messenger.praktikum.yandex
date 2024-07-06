import {resolve} from 'path'
import { defineConfig } from 'vite'
import postcssNesting from 'postcss-nested'
import handlebars from 'vite-plugin-handlebars';

const pageData = {
  '/pages/signin_page/index.html': {
    title: 'Вход',
    class: 'input_at_auth',
    fields: [
      {name: 'имя'},
      {name: 'пароль'},
  ],
  buttons: [
    {title: 'авторизация', var: 'primary', action: 'alert("trololo")'},
    {title: 'нет аккаунта?', var: 'secondary', action: 'alert("trololo")'},
  ]
  },
  '/pages/signup_page/index.html': {
    title: 'Регистрация',
    class: 'input_at_auth',
    fields: [
      {name: 'почта'},
      {name: 'логин'},
      {name: 'имя'},
      {name: 'фамилия'},
      {name: 'телефон'},
      {name: 'пароль'},
      {name: 'пароль (ещё раз)', type: 'password'},
  ],
  buttons: [
    {title: 'зарегистрироваться', var: 'primary', action: 'alert("trololo")'},
    {title: 'войти', var: 'secondary', action: 'alert("trololo")'},
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