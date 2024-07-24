import Block from '@/abstract/Block'
import './style.css'

const template = /*jsx*/ `
<a class='chat-page__link'>
  <div class='chat-page__chat-avatar'>
  </div>
  <div class='chat-page__chat-title'>
    {{name}}
  </div>
  <div class='chat-page__chat-last'>
    {{#if isYours}}
      <span class='chat-page__chat-yours'>
        Вы:
      </span>
    {{/if}}
    {{chatLast}}
  </div>
  <div class='chat-page__chat-date'>
    {{chatDate}}
  </div>
  {{#if counter}}
    <div class='chat-page__chat-counter'>
      {{counter}}
    </div>
  {{/if}}
</a>                                             
`

export default class ChatLink extends Block {
  constructor(data: {
    name: string
    isYours: boolean
    chatLast: string
    chatDate: string
    counter: number
  }) {
    super(data)
    this._template = template
    this.init()
  }
}
