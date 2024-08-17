import controller, {MainController} from '@/controllers/main'
import actions from '@/actions/auth'
import router from '@/abstract/Router'

export class AuthController {
  controller: MainController
  constructor() {
    this.controller = controller
    this.registerEvents()
  }
  registerEvents() {
    controller.on('login', () => {
      console.log(document.cookie)
      actions.getUser()
      router.go('/chats_page')
    })
  }
}

const authController = new AuthController()
export default authController
