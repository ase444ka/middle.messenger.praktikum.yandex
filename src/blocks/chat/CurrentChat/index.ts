import Block from '@/abstract/Block'
import ChatForm from '@/blocks/chat/ChatForm'
import DailyBlock, {DailyBlockData} from '@/blocks/chat/DailyBlock'
import './style.css'

export type CurrentChatData = {
  name: string
  elements: {
    dailyBlocks: DailyBlockData[]
  }
}

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
  constructor(data: CurrentChatData) {
    super({...data, form})
    this._template = template
    this.init()
  }
  getElements(elements: {dailyBlocks: DailyBlockData[]}): {
    dailyBlocks: DailyBlock[]
  } {
    const dailyBlocks: DailyBlock[] = []
    elements.dailyBlocks.forEach(b => {
      dailyBlocks.push(new DailyBlock(b))
    })
    return {dailyBlocks}
  }
}
