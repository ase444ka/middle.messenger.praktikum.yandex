import Block from '@/abstract/Block'
import ChatMessage, {MessageData} from '@/blocks/chat/ChatMessage'
import './style.css'

export type DailyBlockData = {date: string; elements: {messages: MessageData[]}}

const template = /*jsx*/ `
<div class="chat-page__chat__daily-block">
  
      <div class="chat-page__chat__date">{{date}}</div>
      {{#each messages}}
        {{{this}}}
      {{/each}}
    </div>                                           
`

export default class DailyBlock extends Block {
  constructor(data: DailyBlockData) {
    super(data)
    this._template = template
    this.init()
  }
  getElements(elements: {messages: MessageData[]}): {messages: ChatMessage[]} {
    const messages: ChatMessage[] = []
    elements.messages.forEach(m => {
      if (m.text && m.img) {
        throw new Error(`В одном сообщении допустимо
        передать либо только текст либо картинку!
        Текст ${m.text} передан с изображением.`)
      }
      messages.push(new ChatMessage(m))
    })
    return {messages}
  }
}
