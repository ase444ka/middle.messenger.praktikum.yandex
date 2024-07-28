import Block from '@/abstract/Block'
import './style.css'
import ChatInput from '@/blocks/chat/ChatInput'

const template = /*jsx*/ `
<form class="chat-page__form">
  <label for="file" class="chat-page__form__attachment">
    <input type="file" id="file" name="file">
    <div class="chat-page__form__attachment__control">
        <svg>
            <use href="/assets/images/sprites.svg#attachment"></use>
        </svg>
    </div>
  </label>
  {{{input}}}
  <button type="submit" class="chat-page__form__submit">
      <svg>
          <use href="/assets/images/sprites.svg#arrow-right"></use>
      </svg>
  </button>
</form>                                  
`
export default class ChatForm extends Block {
  constructor() {
    super({input: new ChatInput()})
    this._template = template
    this.init()
  }
}
