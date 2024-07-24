import Block, {BlockChildData} from '@/abstract/Block'
import './style.css'

const template = /*jsx*/ `
<main class="chat-page__content">
  <div class="chat-page__title">
    <div class="chat-page__title__avatar"></div>
    <h3 class="chat-page__title__header">{{name}}</h3>
    <button class="chat-page__title__button">...</h3>
  </div>
  <div class="chat-page__chat">
  {{#each dailyBlocks}}
  {{{this}}}
  {{/each}}
    </div>
    {{{form}}}
</main>                                          
`

export default class CurrentChat extends Block {
  constructor(data: {date: string; messages: BlockChildData}) {
    super(data)
    this._template = template
    this.init()
  }
}
