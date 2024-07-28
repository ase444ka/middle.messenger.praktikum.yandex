import controller, {MainController} from '@/controllers/main'
import InputBlock from '@/blocks/auth/InputBlock'
import validate from '@/utils/validate'

export class InputController {
  controller: MainController
  constructor() {
    this.controller = controller
    this.registerEvents()
  }
  registerEvents() {
    controller.on('blur', (block: InputBlock, value: string) => {
      try {
        validate(block.type, value)
        block.setProps({
          errorMessage: '',
          showError: false,
        })
      } catch (e) {
        block.setProps({
          errorMessage: e.message,
          showError: true,
        })
      }
    })
    controller.on('focus', (block: InputBlock) => {
      if (block.isRendering) {
        return
      }
      block.isFocused = true
      block.setProps({
        showError: false,
      })
    })
  }
}

const inputController = new InputController()
export default inputController
