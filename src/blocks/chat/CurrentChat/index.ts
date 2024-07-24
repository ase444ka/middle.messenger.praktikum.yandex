import Block, {BlockChildrenData} from '@/abstract/Block'
import ChatForm from '@/blocks/chat/ChatForm'
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

const form = new ChatForm()

export default class CurrentChat extends Block {
  constructor(data: {name: string; messages: BlockChildrenData}) {
    super({...data, form})
    this._template = template
    this.init()
  }
}
