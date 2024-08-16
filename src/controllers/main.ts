import Block from '@/abstract/Block'
import EventBus from '@/abstract/EventBus'

export class MainController extends EventBus {
  mountedBlocks: Block[]

  constructor() {
    super()
    this.mountedBlocks = []
  }
  addBlock(block: Block) {
    this.mountedBlocks.push(block)
  }
  removeBlock(id: string) {
    this.mountedBlocks = this.mountedBlocks.filter(b => b.id !== id)
  }
  dispatchEvent(eventName: string, value: unknown, id?: string) {
    const block: Block = this.mountedBlocks.find(b => b.id === id)!
    this.emit(eventName, block, value)
  }
}

const controller = new MainController()

export default controller
