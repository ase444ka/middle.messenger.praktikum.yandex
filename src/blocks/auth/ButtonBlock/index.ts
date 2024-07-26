import Block from '@/abstract/Block'
import './style.css'

export type ButtonData = {title: string; var?: string; action?: string}

const template = /*jsx*/ `
<button class='button button_{{var}}' onclick='{{action}}'>
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
