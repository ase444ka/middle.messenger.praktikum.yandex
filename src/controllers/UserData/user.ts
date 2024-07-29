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

      (block: FormBlock) => {
        const fields = block._children.fields
        fields.forEach(f => {
          f.setProps({readonly: false})
        })
        const firstField = fields[0].getContent().querySelector('input')
        const end = firstField!.value.length
        firstField?.focus()
        setTimeout(() => {
          firstField!.setAttribute('type', 'text')
          firstField!.setSelectionRange(end, end)
          firstField!.setAttribute('type', 'email')
        })
        try {
          block.setEditable()
        } catch {
          console.log('catch', block)
        }
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
