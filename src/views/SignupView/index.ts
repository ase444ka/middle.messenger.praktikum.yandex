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
      },

      {
        inputName: 'Пароль',
        fieldName: 'password',
        readonly: false,
        type: 'password',
      },
    ],
    buttons: [
      {title: 'Авторизоваться', var: 'primary', submit: true},
      {
        title: 'Нет аккаунта?',
        var: 'danger',
        action: 'alert("Давай, до свидания!")',
      },
    ],
  },
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
