import Block, {BlockChildrenData, BlockData} from '@/abstract/Block'
import InputBlock from '@/blocks/auth/InputBlock'
import ButtonBlock from '@/blocks/auth/ButtonBlock'
import './style.css'

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
  _fields: Block[]
  _buttons: Block[]
  constructor(data: BlockData) {
    super(data)

    this._template = template
    this.init()
  }

  getElements(els: BlockChildrenData) {
    const fields = els.fields.map(
      f =>
        new InputBlock({
          inputName: f.inputName as string,
          type: f.type as string,
          fieldName: f.fieldName as string,
          inputClass: 'form__input',
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
