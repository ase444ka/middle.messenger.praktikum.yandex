import controller, {MainController} from '@/controllers/main'
import FormBlock from '@/blocks/auth/FormBlock'
import ChatForm from '@/blocks/chat/ChatForm'
import validate, {Validation} from '@/utils/validate'
import actions from '@/actions'

type FormDataTypes = {
  first_name?: string
  second_name?: string
  login?: string
  email?: string
  password?: string
  phone?: string
}

export class FormController {
  controller: MainController
  constructor() {
    this.controller = controller
    this.registerEvents()
  }
  registerEvents() {
    controller.on(
      'submit',
      (
        block: FormBlock | ChatForm,
        value: {name: string; value: string; type: Validation}[],
      ) => {
        console.log(`Проверка формы ${block.id} `)
        for (const entry of value) {
          try {
            validate(entry.type, entry.value)
          } catch (e) {
            alert(`Ошибка в поле "${entry.name}": ${e.message}`),
              controller.dispatchEvent('validated', false, block.id)
          }
        }
        controller.dispatchEvent(
          'validated',
          value.reduce(
            (p: {[key: string]: unknown}, c) => ({...p, [c.name]: c.value}),
            {},
          ),
          block.id,
        )
      },
    )
    controller.on(
      'validated',

      (block: FormBlock | ChatForm, data: FormDataTypes) => {
        if (typeof data === 'boolean') {
          throw new Error('bad validation')
        } else {
          actions[block.action](data)
        }
      },
    )
  }
}

const formController = new FormController()
export default formController
