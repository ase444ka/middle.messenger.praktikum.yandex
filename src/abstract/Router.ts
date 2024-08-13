import Block, {BlockProps} from '@/abstract/Block'
import render from '@/utils/render.js'

class Route {
  pathname: string
  _pathname: string
  _blockClass: typeof Block
  _block: Block | null
  _props: BlockProps
  constructor(pathname: string, view: typeof Block, props: BlockProps) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave() {
    if (this._block) {
      this._block.hide()
    }
  }

  match(pathname: string) {
    return pathname === this._pathname
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass()
      render(this._props.rootQuery as string, this._block)
      return
    }

    this._block.show()
  }
}

export class Router {
  static __instance: Router
  routes: Route[]
  history: History
  _rootQuery: string
  _currentRoute?: Route | null
  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    Router.__instance = this
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery})
    this.routes.push(route)
    return this
  }

  start() {
    window.addEventListener('popstate', () => {
      this._onRoute(window.location.pathname)
    })
    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname)

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    if (route) {
      route.render()
    } else {
      throw new Error('no route:(')
    }
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname))
  }
}
