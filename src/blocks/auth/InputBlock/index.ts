import {compile} from 'handlebars'
import Block, {EventListeners, BlockProps} from '@/abstract/Block'
import controller from '@/controllers/main'
import './style.css'
import inputController, {InputController} from '@/controllers/Signin/input'
import {Validation} from '@/utils/validate'

export type InputData = {
  type: Validation
  inputClass?: string
  fieldName: string
  inputName: string
  txt?: string | number | boolean
  readonly?: boolean
}

const template = /*jsx*/ `
<div class='input 
  {{inputClass}}
  {{#if showError}}
  input_error
  {{/if}}
  
'>
  <label for='{{fieldName}}' class='input__label'>
    {{inputName}}
  </label>
  <div class='input__wrapper'>
    <input
      type='{{type}}'
      id='{{fieldName}}'
      class='input__input'
      name='{{fieldName}}'
      value='{{txt}}'
      {{#if readonly}}
      readonly
      {{/if}}
    />
    
  </div>
</div>                                               
`

const errorTemplate = compile(
  '<div class="input__error">{{errorMessage}}</div>',
)

const inputEvents: EventListeners = {
  focus: event => {
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

export default class InputBlock extends Block {
  controller: InputController
  isRendering: boolean
  isFocused: boolean

  constructor(data: InputData) {
    super({
      ...data,
      showError: false,
      errorMessage: '',
      isValid: false,
      events: inputEvents,
      settings: {selector: 'input'},
    })
    this.controller = inputController
    this.isRendering = false
    this.isFocused = false
    this._template = template
    this.init()
  }
  render() {
    this.isRendering = true
    this._render()
    if (this.isFocused) {
      this._node.querySelector('input')?.focus()
    }
    this.isRendering = false
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
