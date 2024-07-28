import Block from '@/abstract/Block'
import CardBlock from '@/blocks/auth/CardBlock'
import FormBlock from '@/blocks/auth/FormBlock'
import './style.css'

const form = new FormBlock({
  readonly: false,
  elements: {
    fields: [
      {
        inputName: 'Почта',
        fieldName: 'login',
        readonly: false,
        type: 'email',
      },
      {
        inputName: 'Логин',
        fieldName: 'login',
        readonly: false,
        type: 'name',
      },
      {
        inputName: 'Имя',
        fieldName: 'first_name',
        readonly: false,
        type: 'name',
      },
      {
        inputName: 'Фамилия',
        fieldName: 'second_name',
        readonly: false,
        type: 'name',
      },
      {
        inputName: 'Телефон',
        fieldName: 'phone',
        readonly: false,
        type: 'phone',
      },
      {
        inputName: 'Пароль',
        fieldName: 'password',
        readonly: false,
        type: 'password',
      },
      {
        inputName: 'Пароль (еще раз)',
        fieldName: 'password_2',
        readonly: false,
        type: 'password',
      },
    ],
    buttons: [
      {title: 'Изменить данные', var: 'primary', action: 'alert("trololo")'},
      {title: 'Изменить пароль', var: 'primary', action: 'alert("trololo")'},
      {title: 'Выйти', var: 'danger', action: 'alert("trololo")'},
    ],
  },
})

const card = new CardBlock({title: 'Регистрация', content: form})

const template = /*jsx*/ `
<main>{{{card}}}</main>                                
`

export default class SigninView extends Block {
  constructor() {
    super({card})
    this._template = template
    this.init()
  }
}
