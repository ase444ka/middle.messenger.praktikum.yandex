import Block from '@/abstract/Block'
import CardBlock from '@/blocks/auth/CardBlock'
import FormBlock from '@/blocks/auth/FormBlock'
import './style.css'

const form = new FormBlock({
  readonly: false,
  action: 'signup',
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
        inputName: 'Логин',
        fieldName: 'login',
        readonly: false,
        type: 'name',
        inputClass: 'form__input',
      },
      {
        inputName: 'Имя',
        fieldName: 'first_name',
        readonly: false,
        type: 'name',
        inputClass: 'form__input',
      },
      {
        inputName: 'Фамилия',
        fieldName: 'second_name',
        readonly: false,
        type: 'name',
        inputClass: 'form__input',
      },
      {
        inputName: 'Телефон',
        fieldName: 'phone',
        readonly: false,
        type: 'phone',
        inputClass: 'form__input',
      },
      {
        inputName: 'Пароль',
        fieldName: 'password',
        readonly: false,
        type: 'password',
        inputClass: 'form__input',
      },
      {
        inputName: 'Пароль (еще раз)',
        fieldName: 'password_2',
        readonly: false,
        type: 'password',
        inputClass: 'form__input',
      },
    ],
    buttons: [{title: 'Зарегистрироваться', var: 'primary', submit: true}],
  },
  linkText: 'Выйти',
  linkHref: '/',
})

const card = new CardBlock({title: 'Регистрация', content: form})

const template = /*jsx*/ `
<main>{{{card}}}</main>                                
`

export default class SignupView extends Block {
  constructor() {
    super({card})
    this._template = template
    this.init()
  }
}
