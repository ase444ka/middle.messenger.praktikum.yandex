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
        fieldName: 'email',
        readonly: false,
        type: 'email',
        inputClass: 'form__input',
      },

      {
        inputName: 'Пароль',
        fieldName: 'password',
        readonly: false,
        type: 'password',
        inputClass: 'form__input',
      },
    ],
    buttons: [{title: 'Авторизоваться', var: 'primary', submit: true}],
  },
  linkHref: '/signup_page',
  linkText: 'Нет аккаунта?',
})

const card = new CardBlock({title: 'Вход', content: form})

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
