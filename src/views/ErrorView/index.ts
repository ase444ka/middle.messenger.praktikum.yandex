import Block from '@/abstract/Block'
import './style.css'

const template = /*jsx*/ `
<div class="error-page">
  <main>
    <div class='error-block'>
      <h1 class='error-block__status'>{{status}}</h1>
      <p class='error-block__message'>{{message}}</p>
    <a class='error-block__link' href='/'>Назад к чатам</a>
    </div>  
  </main>          
</div>                                                
`

export default class ErrorView extends Block {
  constructor(data: {status: string; message: string}) {
    super(data)
    this._template = template
    this.init()
  }
}
