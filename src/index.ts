import render from '@/utils/render.js'
import CardBlock from '@/blocks/auth/CardBlock'
import FormBlock from '@/blocks/auth/FormBlock'

const form = new FormBlock({
  readonly: true,
  cursor: 'default',
  name: 'Петр',

  elements: {
    fields: [
      {inputName: 'Почта', value: 'sdfg', fieldName: 'email'},
      {inputName: 'Логин', value: 'user.username', fieldName: 'login'},
      {inputName: 'Имя', value: 'user.name', fieldName: 'first_name'},
      {inputName: 'Фамилия', value: 'ser.surname', fieldName: 'second_name'},
      {inputName: 'Имя в чате', value: 'user.nik', fieldName: 'display_name'},
      {inputName: 'Телефон', value: 'user.phone', fieldName: 'phone'},
    ],
    buttons: [
      {title: 'Изменить данные', var: 'primary', action: 'alert("trololo")'},
      {title: 'Изменить пароль', var: 'primary', action: 'alert("trololo")'},
      {title: 'Выйти', var: 'danger', action: 'alert("trololo")'},
    ],
  },
})

const card = new CardBlock({title: 'Иван Иванов', content: form})

// app —3 это class дива в корне DOM
render('#app', card)
