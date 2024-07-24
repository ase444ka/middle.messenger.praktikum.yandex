import Block from '@/abstract/Block'
import './style.css'

const template = /*jsx*/ `
<div class="chat-page">
  <nav class="chat-page__nav">
    <button class="chat-page__tosettings">
      <span>Профиль</span>
      <svg class="chat-page__tosettings__icon">
          <use href="/assets/images/sprites.svg#right"></use>
      </svg>
    </button>
    <div class="chat-page__search">
      <svg class="chat-page__search__icon">
          <use href="/assets/images/sprites.svg#magnify"></use>
      </svg>
      {{searchInput}}
    </div>
      {{#each chatLinks}}
        {{{this}}}
      {{/each}}
  </nav>
  {{{currentChat}}}
    </div>                                           
`

export default class ErrorView extends Block {
  constructor(data: {status: string; message: string}) {
    super(data)
    this._template = template
    this.init()
  }
}
