import Block from '@/abstract/Block'
import './style.css'

const template = /*jsx*/ `
<form class="chat-page__form">
  <label for="message" class="chat-page__form__attachment">
    <input type="file" id="message" name="message">
    <div class="chat-page__form__attachment__control">
        <svg>
            <use href="/assets/images/sprites.svg#attachment"></use>
        </svg>
    </div>
  </label>
  <input
    type="text"
    class="chat-page__form__message"
    name="message"
    placeholder="Сообщение"
  />
  <button type="submit" class="chat-page__form__submit">
      <svg>
          <use href="/assets/images/sprites.svg#arrow-right"></use>
      </svg>
  </button>
</form>                                  
`
export default class ChatForm extends Block {
  constructor() {
    super()
    this._template = template
    this.init()
  }
}
