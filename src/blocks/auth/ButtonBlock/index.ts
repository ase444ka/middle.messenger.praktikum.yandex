import Block, {BlockData} from '@/abstract/Block'
import './styles.css'

const template = /*jsx*/ `
<button class='button button_{{var}}' onclick='{{action}}'>
  {{title}}
</button>
                                             
`

export default class ButtonBlock extends Block {
  constructor(props: BlockData) {
    super({...props, settings: {whithInternalId: true}})
    this._template = template
    this.init()
  }
}
