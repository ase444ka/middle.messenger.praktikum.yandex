import Block, {BlockData} from '@/abstract/Block'
import './styles.css'

const template = /*jsx*/ `
<div class="card">
    <h1 class="card__title">{{title}}</h1>
    {{{content}}}
    
</div>                                              
`

export default class CardBlock extends Block {
  constructor(data: BlockData) {
    super(data)
    this._template = template
    this.init()
  }
}
