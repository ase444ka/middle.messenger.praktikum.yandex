import Block from '@/abstract/Block'
import './style.css'

const template = /*jsx*/ `
<div class="reference-page">
  <header>
    <h1 class="reference-page__title">
    Ниже представлены сверстанные страницы (без перекрестной навигации)
    </h1>
  </header>
  <nav>
    <ul class="reference-page__list">
      <li class="reference-page__item">
        <a href="signup_page" class="reference-page__ref">
        страница регистрации
        </a>
      </li>
      <li class="reference-page__item">
        <a href="signin_page" class="reference-page__ref">
        страница авторизации
        </a>
      </li>
      <li class="reference-page__item">
        <a href="user_page" class="reference-page__ref">
        страница пользователя
        </a>
      </li>
      <li class="reference-page__item">
        <a href="chats_page" class="reference-page__ref">
        страница с чатами
        </a>
      </li>
      <li class="reference-page__item">
        <a href="404_page" class="reference-page__ref">
        страница 404
        </a>
      </li>
      <li class="reference-page__item">
        <a href="500_page" class="reference-page__ref">
        страница 500
        </a>
      </li>
    </ul>
  </nav>   
</div>                                        
`

export default class ReferenceView extends Block {
  constructor() {
    super()
    this._template = template
    this.init()
  }
}
