import Block, {BlockData} from '@/abstract/Block'
import './style.css'

const template = /*jsx*/ `
<button class='button button_{{var}}' onclick='{{action}}'>
  {{title}}
</button>
                                             
`

export default class ButtonBlock extends Block {
  constructor(props: BlockData) {
    super(props)
    this._template = template
    this.init()
  }
}
