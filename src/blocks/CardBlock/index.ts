import Block, {BlockChildData, BlockData} from '../../abstract/Block'
import InputBlock from '../InputBlock'
import ButtonBlock from '../ButtonBlock'
import './styles.css'

const template = /*jsx*/ `
<div class="card">
    <h1 class="card__title">{{title}}</h1>
    <form>
        {{#each fields}}
            {{{this}}}
        {{/each}}
        <div class="card__buttons">
            {{#each buttons}}
                {{{this}}}
            {{/each}}
        </div>
    </form>
    
</div>                                              
`

export default class CardBlock extends Block {
  _fields: Block[]
  _buttons: Block[]
  constructor(data: BlockData) {
    super(data)

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
          inputClass: 'card__input',
        }),
    )
    const buttons = els.buttons.map(
      b => new ButtonBlock({title: b.title, var: b.var, action: b.action}),
    )
    return {fields, buttons}
  }
}
