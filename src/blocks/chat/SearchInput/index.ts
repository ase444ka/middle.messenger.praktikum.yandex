import Block from '@/abstract/Block'
import './style.css'

const template = /*jsx*/ `
<div class="chat-page__search">
  <svg class="chat-page__search__icon">
      <use href="/assets/images/sprites.svg#magnify"></use>
  </svg>
    <input class="chat-page__search__input" placeholder="Поиск"></input>
</div>                                   
`

export default class SearchInput extends Block {
  constructor() {
    super()
    this._template = template
    this.init()
  }

  render() {
    super.render()
    const input = this.getContent().querySelector('.chat-page__search__input')
    if (!input) {
      throw new Error('input did not rendered!')
    }
    input.addEventListener('input', e => console.log(e.target))
  }
}
