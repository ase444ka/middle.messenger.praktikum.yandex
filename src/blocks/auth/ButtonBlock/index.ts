import Block, {EventListeners} from '@/abstract/Block'
import './style.css'

export type ButtonData = {
  title: string
  var?: string
  action?: string
  submit?: boolean
  events?: EventListeners
}

const template = /*jsx*/ `
<button class='button button_{{var}}'
        onclick='{{action}}'
        {{#if submit}}type="submit"{{/if}}>
  {{title}}
</button>
                                             
`

export default class ButtonBlock extends Block {
  constructor(props: ButtonData) {
    super(props)
    this._template = template
    this.init()
  }
}
