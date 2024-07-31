import controller, {MainController} from '@/controllers/main'
import UserView from '@/views/UserView'
import FormBlock from '@/blocks/auth/FormBlock'

export class UserController {
  controller: MainController
  constructor() {
    this.controller = controller
    this.registerEvents()
  }
  registerEvents() {
    controller.on('editUser', (block: FormBlock) => {
      block.setEditable()
    })

    controller.on('saveUser', (block: FormBlock) => {
      block.setReadonly()
    })

    controller.on(
      'changeForm',
      (block: UserView, forms: {oldForm: FormBlock; newForm: FormBlock}) => {
        block.changeForm(forms.oldForm, forms.newForm)
      },
    )
  }
}

const userController = new UserController()
export default userController
