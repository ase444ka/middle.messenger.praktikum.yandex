import Block from '@/abstract/Block'
import InputBlock, {InputData} from '@/blocks/auth/InputBlock'
import ButtonBlock, {ButtonData} from '@/blocks/auth/ButtonBlock'
import './style.css'

type FormElements = {
  fields: InputData[]
  buttons: ButtonData[]
}

export type FormBlockData = {
  readonly: boolean
  elements: FormElements
}

const template = /*jsx*/ `
  <form>
    {{#each fields}}
      {{{this}}}
    {{/each}}
    <div class="form__buttons">
      {{#each buttons}}
        {{{this}}}
      {{/each}}
    </div>
  </form>
`

export default class FormBlock extends Block {
  constructor(data: FormBlockData) {
    super(data)

    this._template = template
    this.init()
  }

  getElements(els: FormElements) {
    const fields = els.fields.map(
      f =>
        new InputBlock({
          type: f.type,
          fieldName: f.fieldName,
          inputName: f.inputName,
          inputClass: 'form__input',
          value: f.value as string,
        }),
    )
    const buttons = els.buttons.map(
      b =>
        new ButtonBlock({
          title: b.title as string,
          var: b.var as string,
          action: b.action as string,
        }),
    )
    return {fields, buttons}
  }
}
