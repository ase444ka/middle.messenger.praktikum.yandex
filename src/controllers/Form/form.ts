import controller, {MainController} from '@/controllers/main'
import FormBlock from '@/blocks/auth/FormBlock'
import ChatForm from '@/blocks/chat/ChatForm'
import validate, {Validation} from '@/utils/validate'

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
            alert(`Ошибка в поле "${entry.name}": ${e.message}`)
          }
        }
        console.log('Данные проверены, все ОК', value)
      },
    )
  }
}

const formController = new FormController()
export default formController
