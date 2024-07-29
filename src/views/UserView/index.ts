import Block from '@/abstract/Block'
import FormBlock, {FormBlockData} from '@/blocks/auth/FormBlock'
import './style.css'
const imgUrl = new URL('@/assets/images/ava.png', import.meta.url).href
import controller from '@/controllers/main'
import userController, {UserController} from '@/controllers/UserData/user'
import {userFormData, userPasswordData} from '@/data/user'

const passwordEvents: EventListenerOrEventListenerObject[] = [
  // нажатие на кнопку сохранить при изменении пароля возвращает
  // обратно форму юзера
  e => {
    const target = e.target as HTMLElement
    const rootNode = target.closest('main')! as HTMLElement
    form = new FormBlock(userFormData as FormBlockData)
    controller.dispatchEvent(
      'changeForm',
      {oldForm: passwordForm, newForm: form},
      rootNode.dataset.id!,
    )
  },
]
const dataEvents: EventListenerOrEventListenerObject[] = [
  // включение редактирования пользователя
  e => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const rootNode = target.closest('.form')! as HTMLElement
    controller.dispatchEvent('editUser', true, rootNode.dataset.id!)
  },
  // включение редактирования пароля
  e => {
    e.preventDefault()
    const target = e.target as HTMLElement

    const rootNode = target.closest('main')! as HTMLElement
    passwordForm = new FormBlock(userPasswordData as FormBlockData)
    controller.dispatchEvent(
      'changeForm',
      {oldForm: form, newForm: passwordForm},
      rootNode.dataset.id!,
    )
  },
  // сохранение пользователя
  e => {
    const target = e.target as HTMLElement
    const rootNode = target.closest('.form')! as HTMLElement
    controller.dispatchEvent('saveUser', true, rootNode.dataset.id!)
  },
]
userFormData.elements.buttons = userFormData.elements.buttons.map((v, i) => {
  return {...v, events: {click: dataEvents[i]}}
})
userPasswordData.elements.buttons = userPasswordData.elements.buttons.map(
  (v, i) => {
    return {...v, events: {click: passwordEvents[i]}}
  },
)
let form = new FormBlock(userFormData as FormBlockData)

let passwordForm = new FormBlock(userPasswordData as FormBlockData)

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
