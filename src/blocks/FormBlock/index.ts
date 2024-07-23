import Block, {BlockChildData, BlockData} from '../../abstract/Block'
import InputBlock from '../InputBlock'
import ButtonBlock from '../ButtonBlock'
import './styles.css'

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
    super({...data, settings: {whithInternalId: true}})

    this._template = template
    this.init()
  }

  getElements(els: BlockChildData) {
    const fields = els.fields.map(
      f =>
        new InputBlock({
          inputName: f.inputName,
          type: f.type,
          fieldName: f.fieldName,
          inputClass: 'form__input',
        }),
    )
    const buttons = els.buttons.map(
      b => new ButtonBlock({title: b.title, var: b.var, action: b.action}),
    )
    return {fields, buttons}
  }
}
