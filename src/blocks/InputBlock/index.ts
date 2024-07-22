import Block, {BlockData} from '../../abstract/Block'
import './styles.css'

const template = /*jsx*/ `
<div class='input {{input-class}}'>
  <label for='{{field-name}}' class='input__label'>
    {{input-name}}
  </label>
  <div class='input__wrapper'>
    <input
      type='{{type}}'
      id='{{field-name}}'
      class='input__input'
      name='{{field-name}}'
      value='{{value}}'
    />
  </div>
</div>                                               
`

export default class InputBlock extends Block {
  constructor(props: BlockData) {
    super({...props, settings: {whithInternalId: true}})
    this._template = template
    this.init()
  }
}
