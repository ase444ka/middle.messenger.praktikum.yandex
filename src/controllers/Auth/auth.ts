import controller, {MainController} from '@/controllers/main'
import router from '@/abstract/Router'

export class AuthController {
  controller: MainController
  constructor() {
    this.controller = controller
    this.registerEvents()
  }
  registerEvents() {
    controller.on('login', () => {
      router.go('/chats_page')
    })
  }
}

const authController = new AuthController()
export default authController
