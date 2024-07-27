import Block from '@/abstract/Block'

class MainController {
  private static instance: MainController
  mountedBlocks: Block[]
  constructor() {
    if (!MainController.instance) {
      MainController.instance = new MainController()
      MainController.instance.mountedBlocks = []
    } else {
      return MainController.instance
    }
  }
  addBlock(block: Block) {
    this.mountedBlocks.push(block)
  }
  removeBlock(id: string) {
    this.mountedBlocks = this.mountedBlocks.filter(b => b.id !== id)
  }
}

const controller = new MainController()

export default controller
