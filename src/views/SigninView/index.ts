import Block from '@/abstract/Block'
import CardBlock from '@/blocks/auth/CardBlock'
import FormBlock from '@/blocks/auth/FormBlock'
import './style.css'

const form = new FormBlock({
  readonly: true,
  elements: {
    fields: [
      {
        inputName: 'Почта',
        fieldName: 'email',
        value: 'kjkjkj',
        readonly: true,
        isValid: true,
        showError: false,
        errorMessage: 'kjkjkjkjk kjkj',
      },
      {
        inputName: 'Почта',
        fieldName: 'email',
        value: 'kjkjkj',
        readonly: true,
        isValid: true,
        showError: true,
        errorMessage: 'kjkjkjkjk kjkj',
      },
      {
        inputName: 'Почта',
        fieldName: 'email',
        value: 'kjkjkj',
        readonly: true,
        isValid: true,
        showError: true,
        errorMessage: 'kjkjkjkjk kjkj',
      },
      {
        inputName: 'Почта',
        fieldName: 'email',
        value: 'kjkjkj',
        readonly: true,
        isValid: true,
        showError: true,
        errorMessage: 'kjkjkjkjk kjkj',
      },
      {
        inputName: 'Почта',
        fieldName: 'email',
        value: 'kjkjkj',
        readonly: true,
        isValid: true,
        showError: true,
        errorMessage: 'kjkjkjkjk kjkj',
      },
      // {inputName: 'Логин', fieldName: 'login'},
      // {inputName: 'Имя', fieldName: 'first_name'},
      // {inputName: 'Фамилия', fieldName: 'second_name'},
      // {inputName: 'Телефон', fieldName: 'phone'},
      // {inputName: 'Пароль', fieldName: 'phone'},
      // {inputName: 'Пароль еще раз', fieldName: 'phone'},
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
