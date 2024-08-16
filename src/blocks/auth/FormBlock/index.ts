import Block, {EventListeners} from '@/abstract/Block'
import InputBlock, {InputData} from '@/blocks/auth/InputBlock'
import controller from '@/controllers/main'
import formController, {FormController} from '@/controllers/Form/form'
import ButtonBlock, {ButtonData} from '@/blocks/auth/ButtonBlock'
import './style.css'

type FormElements = {
  fields: InputData[]
  buttons: ButtonData[]
}

export type FormBlockData = {
  readonly: boolean
  action: 'signin' | 'signup'
  elements: FormElements
  linkText?: string
  linkHref?: string
  linkClass?: string
}

const template = /*jsx*/ `
  <form class="form">
    {{#each fields}}
      {{{this}}}
    {{/each}}
    <div class="form__buttons">
      {{#each buttons}}
        {{{this}}}
      {{/each}}
    </div>
    {{#if linkText}}
    <a class="form__link {{linkClass}}" href="{{linkHref}}">{{linkText}}</a>
    {{/if}}
  </form>
`

function serializeForm(formNode: HTMLFormElement) {
  const {elements} = formNode
  const data = Array.from(elements)
    .filter(item => item instanceof HTMLInputElement)
    .map(element => {
      const {name, value, type} = element

      return {name, value, type}
    })
  return data
}

const formEvents: EventListeners = {
  submit: event => {
    event.preventDefault()
    const target = event.target as HTMLFormElement
    const receivedData = serializeForm(target)
    const rootNode = target.closest('[data-id]')! as HTMLElement
    controller.dispatchEvent('submit', receivedData, rootNode.dataset.id!)
  },
}

export default class FormBlock extends Block {
  controller: FormController
  action: 'signin' | 'signup'
  constructor(data: FormBlockData) {
    super({...data, events: formEvents})
    this.controller = formController
    this._template = template
    this.action = data.action
    this.init()
  }

  getElements(els: FormElements) {
    const fields = els.fields.map(f => new InputBlock(f))
    const buttons = els.buttons.map(b => new ButtonBlock(b))
    return {fields, buttons}
  }

  toggleButtons() {
    this._children.buttons.forEach(b => {
      const bl = b as ButtonBlock
      bl.toggleVisibility()
    })
  }

  setEditable() {
    this.toggleButtons()
    this._children.fields.forEach(f => {
      f.setProps({readonly: false})
    })

    const firstField = this._children.fields[0]
      .getContent()
      .querySelector('input')
    const end = firstField!.value.length
    firstField?.focus()
    const t = firstField!.getAttribute('type')
    if (t === 'email') {
      setTimeout(() => {
        firstField!.setAttribute('type', 'text')
        firstField!.setSelectionRange(end, end)
        firstField!.setAttribute('type', 'email')
      })
    } else {
      firstField!.setSelectionRange(end, end)
    }
  }
  setReadonly() {
    this.toggleButtons()
    this._children.fields.forEach(f => {
      f.setProps({readonly: true})
    })
  }
}
