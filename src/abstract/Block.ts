// import {v4 as makeUUID} from 'uuid';
import {compile} from 'handlebars'
import EventBus from './EventBus'

const makeUUID = () => '23a91df9-2a89-4357-b297-ec2924d854e3'

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

type BlockChildren = {[key: string]: Block}
type BlockSettings = {whithInternalId?: boolean}
type EventListeners = {[eventName: string]: EventListenerOrEventListenerObject}
type BlockProps = {
  [key: string]: string | boolean | EventListeners | undefined
  events?: EventListeners
}

export default class Block {
  _id: null | string
  _children: BlockChildren
  _eventBus: EventBus
  _props: BlockProps
  _node: HTMLElement
  _template: string

  constructor(data = {}) {
    const {children, props, settings} = this._getData(data)
    this._id = null
    this._children = children
    this._eventBus = new EventBus()
    if (settings?.whithInternalId) {
      this._id = makeUUID()
    }
    this._props = this._makePropsProxy(props)
    this._registerEvents()
  }

  _getData(data: {
    [key: string]:
      | boolean
      | string
      | Block
      | BlockSettings
      | {[eventName: string]: (ev: Event) => void}
  }) {
    const children: BlockChildren = {}
    const props: BlockProps = {}
    let settings: BlockSettings = {}
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'settings') {
        settings = value as BlockSettings
      } else if (value instanceof Block) {
        children[key] = value
      } else if (key === 'events') {
        props[key] = value as EventListeners
      } else {
        props[key] = value as boolean | string
      }
    })
    return {children, props, settings}
  }

  _makePropsProxy(props: BlockProps) {
    props = new Proxy(props, {
      set: (target, prop, value, receiver) => {
        const oldProps = Reflect.get(target, prop, receiver)
        const newProps = {...receiver, [prop]: value}
        Reflect.set(target, prop, value, receiver)
        this._eventBus.emit(EVENTS.FLOW_CDU, oldProps, newProps)
        return true
      },
      deleteProperty() {
        throw new Error('нет доступа')
      },
    })
    return props
  }

  _registerEvents() {
    this._eventBus.on(EVENTS.INIT, this._init.bind(this))
    this._eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    this._eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    this._eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  _componentDidMount() {
    this.componentDidMount()
    Object.values(this._children).forEach(child => {
      child.dispatchComponentDidMount()
    })
  }

  componentDidMount() {}

  _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this.render()
  }

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    const oldKeys = Object.keys(oldProps)
    const newKeys = Object.keys(newProps)

    if (oldKeys.length !== newKeys.length) {
      return true
    }
    for (const key of oldKeys) {
      if (newProps[key] !== oldProps[key]) {
        return true
      }
    }
    return false
  }

  init() {
    this._eventBus.emit(EVENTS.INIT)
  }

  _init() {
    this._createResourses()
    this._eventBus.emit(EVENTS.FLOW_RENDER)
  }

  _createResourses() {
    const tag = this._template.match(/<(\w+)/)?.[1]
    this._node = document.createElement(tag as string)
    if (this._id) {
      this._node.setAttribute('data-id', this._id)
    }
  }

  _compile() {
    const propsAndStubs = {...this._props}
    const getRootAttributes = () => {
      const prototype = fragment.content.children[0]
      const attrs = prototype.attributes
      for (const attr of Array.prototype.slice.apply(null, attrs)) {
        this._node.setAttribute(
          attr.name,
          prototype.getAttribute(attr.name) as string,
        )
      }
    }
    const childishTemplate = compile('<div data-id="{{id}}"></div>')
    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = childishTemplate({id: child._id})
    })

    const template = Handlebars.compile(this._template)

    // отделяем содержимое шаблона от корневого элемента шаблона
    const fragment = document.createElement('template')
    fragment.innerHTML = template(propsAndStubs)
    getRootAttributes()
    const content = fragment.content.children[0].innerHTML
    fragment.innerHTML = content

    Object.values(this._children).forEach(child => {
      console.log(this._children)
      if (!child.id) {
        throw new Error('children must have setting "with id"')
      }
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`)
      if (!stub) {
        throw new Error('children must have attribute "data-id"')
      }
      stub.replaceWith(child.getContent())
    })
    return fragment.content
  }

  get id() {
    return this._id || false
  }

  _addEvents() {
    const {events = {}} = this._props
    Object.keys(events).forEach(eventName => {
      this._node.addEventListener(eventName, events[eventName])
    })
  }

  _removeEvents() {
    const {events = {}} = this._props
    console.log(this)
    Object.keys(events).forEach(eventName => {
      this._node.removeEventListener(eventName, events[eventName])
    })
  }

  setProps: (nextProps: BlockProps | undefined) => void = (
    nextProps: BlockProps,
  ) => {
    if (!nextProps) {
      return
    }
    Object.assign(this._props, nextProps)
  }

  render() {
    this._render()
  }

  _render() {
    const block = this._compile()
    this._removeEvents()
    this._node.innerHTML = '' // удаляем предыдущее содержимое
    console.log(this._node)
    console.log(typeof this._node)
    this._node.append(block)
    this._addEvents()
  }

  getContent() {
    return this._node
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(EVENTS.FLOW_CDM)
  }

  show() {
    this.getContent().style.display = 'block'
  }

  hide() {
    this.getContent().style.display = 'none'
  }
}
