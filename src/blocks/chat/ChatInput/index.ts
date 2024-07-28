import {compile} from 'handlebars'
import Block, {EventListeners, BlockProps} from '@/abstract/Block'
import './style.css'
import controller from '@/controllers/main'
import inputController, {InputController} from '@/controllers/Form/input'
import {Validation} from '@/utils/validate'

const errorTemplate = compile(
  '<div class="input__error">{{errorMessage}}</div>',
)

const template = /*jsx*/ `
<div>
<input
    type="text"
    class="chat-page__form__message"
    name="{{inputName}}"
    type="{{type}}"
    placeholder="Сообщение"
/>   
</div>                                
`

const inputEvents: EventListeners = {
  focus: event => {
    console.log('foc')
    const target = event.target as HTMLInputElement
    const value = target.value
    const rootNode = target.closest('[data-id]')! as HTMLElement
    controller.dispatchEvent('focus', value, rootNode.dataset.id!)
  },

  blur: event => {
    const target = event.target! as HTMLInputElement
    const value = target.value
    const rootNode = target.closest('[data-id]')! as HTMLElement
    controller.dispatchEvent('blur', value, rootNode.dataset.id!)
  },
}

export default class ChatInput extends Block {
  controller: InputController

  constructor() {
    super({
      fieldName: 'message',
      inputName: 'сообщение',
      type: 'message',
      showError: false,
      errorMessage: '',
      isValid: false,
      events: inputEvents,
      settings: {selector: 'input'},
    })
    this.controller = inputController
    this._template = template
    this.init()
  }
  _makePropsProxy(props: BlockProps) {
    props = new Proxy(props, {
      set: (target, prop, value, receiver) => {
        if (prop === 'errorMessage') {
          Reflect.set(target, prop, value, receiver)
          return true
        } else if (prop === 'showError') {
          if (value === false && !!target.errorMessage) {
            this.deleteErrorMessage()
          } else if (value === true && !!target.errorMessage) {
            this.appendErrorMessage(target.errorMessage as string)
          }
          Reflect.set(target, prop, value, receiver)
          return true
        } else {
          const oldProps = {...receiver}
          const newProps = {...receiver, [prop]: value}

          Reflect.set(target, prop, value, receiver)
          this.dispatchComponentDidUpdate(oldProps, newProps)
          return true
        }
      },
      deleteProperty() {
        throw new Error('нет доступа')
      },
    })
    return props
  }

  appendErrorMessage(errorMessage: string) {
    const templateElement = document.createElement('template')
    templateElement.innerHTML = errorTemplate({errorMessage})
    console.log(templateElement)
    this._node.append(templateElement.content)
  }
  deleteErrorMessage() {
    const errorNode = this._node.querySelector('.input__error')
    errorNode?.remove()
  }

  get type() {
    return this._props.type as Validation
  }
}
