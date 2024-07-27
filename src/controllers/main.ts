import Block from '@/abstract/Block'

class MainController {
  mountedBlocks: Block[]
  constructor() {
    this.mountedBlocks = []
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
