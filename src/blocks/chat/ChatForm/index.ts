import Block, {EventListeners} from '@/abstract/Block'
import controller from '@/controllers/main'
import formController, {FormController} from '@/controllers/Form/form'
import './style.css'
import ChatInput from '@/blocks/chat/ChatInput'
const svgUrl1 = new URL(
  '@/assets/images/sprites.svg#attachment',
  import.meta.url,
).href
const svgUrl2 = new URL(
  '@/assets/images/sprites.svg#arrow-right',
  import.meta.url,
).href

const template = /*jsx*/ `
<form class="chat-page__form">
  <label for="file" class="chat-page__form__attachment">
    <input type="file" id="file" name="file">
    <div class="chat-page__form__attachment__control">
        <svg>
            <use href="{{svgUrl1}}"></use>
        </svg>
    </div>
  </label>
  {{{input}}}
  <button type="submit" class="chat-page__form__submit">
      <svg>
          <use href="{{svgUrl2}}"></use>
      </svg>
  </button>
</form>                                  
`
const formEvents: EventListeners = {
  submit: event => {
    event.preventDefault()
    const target = event.target as HTMLFormElement
    const value = (
      target.querySelector('input:not([type="file"])') as HTMLInputElement
    )?.value
    const receivedData = [{value, name: 'message', type: 'message'}]
    const rootNode = target.closest('[data-id]')! as HTMLElement
    controller.dispatchEvent('submit', receivedData, rootNode.dataset.id!)
  },
}
export default class ChatForm extends Block {
  controller: FormController
  constructor() {
    super({svgUrl1, svgUrl2, input: new ChatInput(), events: formEvents})
    this.controller = formController
    this._template = template
    this.init()
  }
}
