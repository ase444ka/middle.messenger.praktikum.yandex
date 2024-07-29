import Block from '@/abstract/Block'
import FormBlock from '@/blocks/auth/FormBlock'
import './style.css'
const imgUrl = new URL('@/assets/images/ava.png', import.meta.url).href

const form = new FormBlock({
  readonly: true,
  elements: {
    fields: [
      {
        inputName: 'Почта',
        txt: 'user@user',
        fieldName: 'email',
        readonly: true,
        type: 'email',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Логин',
        txt: 'Vasily',
        fieldName: 'login',
        readonly: true,
        type: 'name',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Имя',
        txt: 'Вася',
        fieldName: 'first_name',
        readonly: true,
        type: 'name',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Фамилия',
        txt: 'Васин',
        fieldName: 'second_name',
        readonly: true,
        type: 'name',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Телефон',
        txt: '+98898983234',
        fieldName: 'phone',
        readonly: true,
        type: 'phone',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Пароль',
        txt: 'kkkj1_-Dlj',
        fieldName: 'password',
        readonly: true,
        type: 'password',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Пароль (еще раз)',
        txt: 'kkkj1_-Dlj',
        fieldName: 'password_2',
        readonly: true,
        type: 'password',
        inputClass: 'userdata__input',
      },
    ],
    buttons: [
      {title: 'Изменить данные', var: 'primary'},
      {title: 'Изменить пароль', var: 'primary'},
      {title: 'Выйти', var: 'danger', action: 'alert("Давай, до свидания!")'},
    ],
  },
})

const template = /*jsx*/ `
<main>
    <div class="userdata">
      <div class="userdata__avatar">
        <img
          src="{{ava}}"
          alt="avatar"
          class="userdata__avatar-image" />
      </div>
      <h1 class="userdata__title">{{name}}</h1>
      {{{form}}}
    </div>
  </main>                               
`

export default class UserView extends Block {
  constructor() {
    super({ava: imgUrl, form})
    this._template = template
    this.init()
  }
}
