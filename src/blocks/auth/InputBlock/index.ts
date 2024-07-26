import Block from '@/abstract/Block'
import './style.css'

export type InputData = {
  type?: string
  inputClass?: string
  fieldName: string
  inputName: string
  value?: string | number | boolean
}

const template = /*jsx*/ `
<div class='input {{inputClass}}'>
  <label for='{{fieldName}}' class='input__label'>
    {{inputName}}
  </label>
  <div class='input__wrapper'>
    <input
      type='{{type}}'
      id='{{fieldName}}'
      class='input__input'
      name='{{fieldName}}'
      value='{{value}}'
    />
  </div>
</div>                                               
`

export default class InputBlock extends Block {
  constructor(data: InputData) {
    super(data)
    this._template = template
    this.init()
  }
}
