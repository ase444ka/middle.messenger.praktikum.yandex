import Block from '@/abstract/Block'
import './style.css'

const template = /*jsx*/ `
  <а href="#" class="chat-page__tosettings">
    <span>Профиль</span>
    <svg class="chat-page__tosettings__icon">
        <use href="/assets/images/sprites.svg#right"></use>
    </svg>
  </а>
`

export default class ProfileLink extends Block {
  constructor() {
    super()
    this._template = template
    this.init()
  }
}
