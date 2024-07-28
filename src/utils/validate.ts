enum Validations {
  name = '^[A-ZА-ЯЁ][a-zа-яё-]*',
  password = '^[-_\\d\\w]*[a-zA-Z]+[-_\\d\\w]*$',
  // eslint-disable-next-line
  email = "^[\\d\\w-_.!#$%&'*+/=?^`{}|~]+@[a-zA-Z]+.[\\d\\w-_.!#$%&'*+/=?^`{}|~]+$",
  message = '.',
  phone = '^\\+?\\d+$',
}
export type Validation = keyof typeof Validations

type ValMap<V extends string | number | symbol, T> = {[property in V]: T}

const Errors: ValMap<Validation, string> = {
  name: `латиница или кириллица, первая буква должна быть заглавной,
  без пробелов и без цифр, нет спецсимволов (допустим только дефис).`,
  password: `от 8 до 40 символов, обязательно хотя
  бы одна заглавная буква и цифра.`,
  email: `латиница, может включать цифры и спецсимволы
    вроде дефиса и подчёркивания,
    обязательнодолжна быть «собака» (@) и точка после неё, но перед точкой
    обязательно должны быть буквы.`,
  message: 'не должно быть пустым',
  phone: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса.',
}

const Lengths: ValMap<Validation, {min?: number; max?: number}> = {
  name: {},
  password: {min: 8, max: 40},
  email: {},
  message: {min: 1},
  phone: {min: 10, max: 15},
}

class Validator {
  constructor(
    public type: Validation,
    public str: string,
  ) {}
  checkLength() {
    const {min, max} = Lengths[this.type]
    if (typeof min === 'number') {
      if (this.str.length < min) {
        return false
      }
    }
    if (typeof max === 'number') {
      if (this.str.length > max) {
        return false
      }
    }
    return true
  }

  checkRegex() {
    const regex = new RegExp(Validations[this.type])
    return regex.test(this.str)
  }

  checkAll() {
    if (!this.checkRegex() || !this.checkLength()) {
      throw new Error(Errors[this.type])
    }
  }
}
function validate(type: Validation, str: string) {
  const checker = new Validator(type, str)
  checker.checkAll()
  return true
}

export default validate
