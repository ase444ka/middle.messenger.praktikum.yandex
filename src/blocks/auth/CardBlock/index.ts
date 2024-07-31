import Block from '@/abstract/Block'
import './style.css'

export type CardData = {title: string; content: Block}

const template = /*jsx*/ `
<div class="card">
    <h1 class="card__title">{{title}}</h1>
    {{{content}}}
    
</div>                                              
`

export default class CardBlock extends Block {
  constructor(data: CardData) {
    super(data)
    this._template = template
    this.init()
  }
}
