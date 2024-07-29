import Block, {BlockChildrenData, EventListeners} from '@/abstract/Block'
import './style.css'
const svgUrl = new URL('@/assets/images/sprites.svg#seen', import.meta.url).href
const imgUrl = new URL('@/assets/images/m.png', import.meta.url).href

export type MessageData = {
  img?: string
  text?: string
  isYours: boolean
  isSeen: boolean
  time: string
  elements?: BlockChildrenData
  events?: EventListeners
}

const template = /*jsx*/ `
<div
  class="chat-page__chat__message
    {{#if img}}
    chat-page__chat__message_image
    {{/if}}
    {{#if isYours}}
    chat-page__chat__message_yours
    {{/if}}
    "
>
    {{#if img}}
      <img src="{{imgUrl}}" alt="printscreen"/>
    {{else}} 
      {{text}}
    {{/if}}
    <div class="chat-page__chat__additional">
    {{#if isYours}}
      <div class="chat-page__chat__baige chat-page__chat__baige_seen">
        <svg>
            <use href="{{svgUrl}}"></use>
        </svg>
      </div>
    {{/if}}
      <span class="chat-page__chat__time">{{time}}</span>
  </div>
</div>                               
`

export default class ChatMessage extends Block {
  constructor(data: MessageData) {
    super({...data, svgUrl, imgUrl})
    this._template = template
    this.init()
  }
}
