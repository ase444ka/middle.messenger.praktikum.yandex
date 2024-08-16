import EventBus from '@/abstract/EventBus'
export enum StoreEvents {
  Updated = 'updated',
}

type Indexed = {
  [key: string]: string
}
class Store extends EventBus {
  private state: Indexed = {}

  public getState() {
    return this.state
  }

  public set(path: string, value: string) {
    this.state[path] = value
    // this.emit(StoreEvents.Updated)
  }
}

export default new Store()
