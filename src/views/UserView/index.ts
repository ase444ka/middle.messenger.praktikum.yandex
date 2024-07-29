import Block from '@/abstract/Block'
import FormBlock from '@/blocks/auth/FormBlock'
import './style.css'
const imgUrl = new URL('@/assets/images/ava.png', import.meta.url).href
import controller from '@/controllers/main'
import userController, {UserController} from '@/controllers/UserData/user'

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
      {
        title: 'Изменить данные',
        var: 'primary',
        events: {
          click: e => {
            e.preventDefault()
            const target = e.target as HTMLFormElement
            const rootNode = target.closest('.form')! as HTMLElement
            controller.dispatchEvent('editUser', true, rootNode.dataset.id!)
          },
        },
      },
      {
        title: 'Изменить пароль',
        var: 'primary',
        events: {
          click: e => {
            e.preventDefault()
            const target = e.target as HTMLElement

            const rootNode = target.closest('main')! as HTMLElement

            controller.dispatchEvent(
              'changeForm',
              {oldForm: form, newForm: passwordForm},
              rootNode.dataset.id!,
            )
          },
        },
      },
    ],
  },

  linkText: 'Выйти',
  linkHref: '/',
  linkClass: 'userdata__link',
})

const passwordForm = new FormBlock({
  readonly: false,
  elements: {
    fields: [
      {
        inputName: 'Старый пароль',
        txt: 'kkkj1_-Dlj',
        fieldName: 'password',
        type: 'password',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Новый пароль',
        txt: 'kkkj1_-Dlj',
        fieldName: 'password_2',
        type: 'password',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Повторите новый пароль',
        txt: 'kkkj1_-Dlj',
        fieldName: 'password_3',
        type: 'password',
        inputClass: 'userdata__input',
      },
    ],
    buttons: [
      {
        title: 'Сохранить',
        var: 'primary',
        submit: true,
      },
    ],
  },
  linkText: 'Выйти',
  linkHref: '/',
  linkClass: 'userdata__link',
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
  controller: UserController
  constructor() {
    super({ava: imgUrl, form})
    this._template = template
    this.controller = userController
    this.init()
  }

  changeForm(oldForm: FormBlock, newForm: FormBlock) {
    oldForm.dispatchComponentDidUnmount()
    this._node.querySelector('.userdata')!.append(newForm.getContent())
  }
}
