import Block, {EventListeners} from '@/abstract/Block'
import './style.css'

export type ButtonData = {
  title: string
  var?: string
  action?: string
  submit?: boolean
  events?: EventListeners
  buttonClass?: string
  hidden?: boolean
}

const template = /*jsx*/ `
<button class='
  button
  button_{{var}} 
  {{#if hidden}}
  hidden
  {{/if}}
  '
        onclick='{{action}}'
        {{#if submit}}type="submit"{{/if}}>
  {{title}}
</button>
                                             
`

export default class ButtonBlock extends Block {
  constructor(data: ButtonData) {
    super({hidden: false, ...data})
    this._template = template
    this.init()
  }
  toggleVisibility() {
    this._props.hidden = !this._props.hidden
  }
}
