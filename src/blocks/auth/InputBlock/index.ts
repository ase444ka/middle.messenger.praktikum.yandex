import Block from '@/abstract/Block'
import './style.css'

export type InputData = {
  type?: string
  inputClass?: string
  fieldName: string
  inputName: string
  value?: string | number | boolean
  readonly?: boolean
  isValid: boolean
  showError: boolean
  errorMessage: string
}

const template = /*jsx*/ `
<div class='input 
  {{inputClass}}
  {{#if showError}}
  input_error
  {{/if}}
  
'>
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
      {{#if readonly}}
      readonly
      {{/if}}
    />
    
  </div>
  {{#if showError}}
    <div class='input__error'>{{errorMessage}}</div>
    {{/if}}
</div>                                               
`

export default class InputBlock extends Block {
  constructor(data: InputData) {
    super(data)
    this._template = template
    this.init()
  }
}
