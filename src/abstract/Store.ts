import EventBus from '@/abstract/EventBus'
export enum StoreEvents {
  Updated = 'updated',
}

type Indexed = {
  [key: string]: unknown
}
class Store extends EventBus {
  private state: Indexed = {}

  constructor() {
    super()
    const state = localStorage.getItem('state')
    this.state = state ? JSON.parse(state) : {}
  }

  public getState() {
    return this.state
  }

  public set(path: string, value: unknown) {
    console.log('store is setting ', path)
    this.state[path] = value
    localStorage.setItem('state', JSON.stringify(this.state))
    this.emit(StoreEvents.Updated)
  }

  public saveToLocalStorage() {}
}

const store = new Store()

export default store
