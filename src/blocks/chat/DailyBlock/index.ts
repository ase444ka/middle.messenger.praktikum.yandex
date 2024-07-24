import Block, {BlockChildData} from '@/abstract/Block'
import './style.css'

const template = /*jsx*/ `
<div class="chat-page__chat__daily-block">
  
      <div class="chat-page__chat__date">{{date}}</div>
      {{#each messages}}
        {{{this}}}
      {{/each}}
    </div>                                           
`

export default class DailyBlock extends Block {
  constructor(data: {date: string; messages: BlockChildData}) {
    super(data)
    this._template = template
    this.init()
  }
}
