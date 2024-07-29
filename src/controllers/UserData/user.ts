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
    controller.on(
      'editUser',

      (block: UserView) => {
        console.log(block._children)
        console.log(block._props)
        const fields = block._children.fields
        fields.forEach(f => {
          f.setProps({readonly: false})
        })
        const firstField = fields[0].getContent().querySelector('input')
        const end = firstField!.value.length
        console.log(end)
        firstField?.focus()
        setTimeout(() => {
          firstField!.setAttribute('type', 'text')
          firstField!.setSelectionRange(end, end)
          firstField!.setAttribute('type', 'email')
        })
      },
    )

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
