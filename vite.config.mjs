import {resolve} from 'path'
import { defineConfig } from 'vite'
import postcssNesting from 'postcss-nested'
import handlebars from 'vite-plugin-handlebars';
import user from './src/data/user.js'

const pageData = {
  '/pages/signin_page/index.html': {
    title: 'Вход',
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
  '/pages/user_page/index.html': {
    readonly: true,
    cursor: 'default',
    name: user.name,
    fields: [
      {name: 'Почта', value: user.email},
      {name: 'Логин', value: user.username},
      {name: 'Имя', value: user.name},
      {name: 'Фамилия', value: user.surname},
      {name: 'Имя в чате', value: user.nik},
      {name: 'Телефон', value: user.phone},
  ],
  buttons: [
    {title: 'Изменить данные', var: 'primary', action: 'alert("trololo")'},
    {title: 'Изменить пароль', var: 'primary', action: 'alert("trololo")'},
    {title: 'Выйти', var: 'danger', action: 'alert("trololo")'},
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