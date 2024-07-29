import Block from '@/abstract/Block'
import './style.css'
const svgUrl = new URL('@/assets/images/sprites.svg#right', import.meta.url)
  .href

const template = /*jsx*/ `
  <a href="#" class="chat-page__tosettings">
    <span>Профиль</span>
    <svg class="chat-page__tosettings__icon">
        <use href="{{svgUrl}}"></use>
    </svg>
  </a>
`

export default class ProfileLink extends Block {
  constructor() {
    super({svgUrl})
    this._template = template
    this.init()
  }
}
