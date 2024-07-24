import Block from '@/abstract/Block'
import './style.css'

type MessageData = (
  | {img: string; text?: never}
  | {img?: never; text: string}
) & {
  isYours: boolean
  isSeen?: boolean
  time: string
}

const template = /*jsx*/ `
<div
  class="chat-page__chat__message
    {{#if !!img}}chat-page__chat__message_image{{/if}}
    {{#if isYours}}chat-page__chat__message_yours{{/if}}"
>
    {{#if !!img}}
      <img src="/assets/images/m.png" alt="printscreen"/>
    {{else}} 
      {{text}}
    {{/if}}
    <div class="chat-page__chat__additional">
    {{#if isYours}}
      <div class="chat-page__chat__baige chat-page__chat__baige_seen">
        <svg>
            <use href="/assets/images/sprites.svg#seen"></use>
        </svg>
      </div>
    {{/if}}
      <span class="chat-page__chat__time">{{time}}</span>
  </div>
</div>                               
`

export default class ChatMessage extends Block {
  constructor(data: MessageData) {
    super(data)
    this._template = template
    this.init()
  }
}
