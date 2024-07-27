import {v4 as makeUUID} from 'uuid'
import {compile} from 'handlebars'
import EventBus from './EventBus'
import controller from '@/controllers/main'

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
  FLOW_UNMOUNT = 'flow:unmount',
}

export type EventListeners = {
  [eventName: string]: EventListenerOrEventListenerObject
}
export type Primitive = string | boolean | number

export type BlockData = {
  elements?: BlockChildrenData
  events?: EventListeners
  [key: string]:
    | Primitive
    | EventListeners
    | BlockChildrenData
    | undefined
    | Block
}

export type BlockChildren = {[key: string]: Block[]}

// тип string[] используется для массива заглушек
// дочерних элементов
export type BlockProps = {
  events?: EventListeners
  [key: string]: Primitive | EventListeners | undefined | string[]
}

// допускаются дочерние элементы трех степеней вложенности,
// события регистрируются для всех одинаковые в конструкторе
export type BlockChildrenData = {
  [children: string]: BlockData[]
}

export default class Block {
  _id: string
  _children: BlockChildren
  _eventBus: EventBus
  _props: BlockProps
  _node: HTMLElement
  _template: string

  constructor(data: BlockData = {}) {
    const {children, props} = this._getData(data)
    this._children = children
    this._eventBus = new EventBus()
    this._id = makeUUID()
    this._props = this._makePropsProxy(props)
    this._registerEvents()
  }

  _getData(data: BlockData) {
    const children: BlockChildren = {}
    const props: BlockProps = {}
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = [value]
      } else if (key === 'events') {
        props[key] = value as EventListeners
      } else if (key === 'elements') {
        const blocks = this.getElements(data.elements!)
        Object.assign(children, blocks)
      } else {
        props[key] = value as boolean | string
      }
    })
    return {children, props}
  }

  getElements(els: BlockChildrenData): BlockChildren | [] {
    if (els.length || Object.keys(els).length) {
      throw new Error(`метод getElements должен быть переопределен,
      т.к. в пропсах есть описание дочерних элементов!`)
    }
    return []
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
    this._eventBus.on(EVENTS.FLOW_CDM, this.componentDidMount.bind(this))
    this._eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    this._eventBus.on(EVENTS.FLOW_RENDER, this.render.bind(this))
    this._eventBus.on(EVENTS.FLOW_UNMOUNT, this._componentDidUnmount.bind(this))
  }

  _registerBlock() {
    controller.addBlock(this)
  }

  _unregisterBlock() {
    controller.removeBlock(this._id)
  }

  _componentDidMount() {
    Object.values(this._children).forEach(child => {
      child.forEach(c => c.dispatchComponentDidMount())
    })
    this._registerBlock()
  }

  componentDidMount() {
    this._componentDidMount()
  }

  _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this.render()
  }

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
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

  _componentDidUnmount() {
    this.componentDidUnmount()
    this._removeEvents()
    this._unregisterBlock()
  }

  componentDidUnmount() {}

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
    this._node.setAttribute('data-id', this._id)
  }

  _compile() {
    const getRootAttributes = () => {
      const prototype = fragment.content.children[0]
      const attrs = prototype.attributes
      for (const attr of Array.from(attrs)) {
        this._node.setAttribute(
          attr.name,
          prototype.getAttribute(attr.name) as string,
        )
      }
    }
    const generateChildContent = (child: Block) => {
      if (!child.id) {
        throw new Error(
          `Error! Seems like ${child.constructor.name} don't have id!`,
        )
      }
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`)
      if (!stub) {
        throw new Error('all blocks must have attribute "data-id"')
      }
      stub.replaceWith(child.getContent())
    }

    const propsAndStubs: BlockProps | {[el: string]: string[]} = {
      ...this._props,
    }

    const childishTemplate = compile('<div data-id="{{id}}"></div>')

    Object.entries(this._children).forEach(([key, child]) => {
      const childArr: string[] = []
      child.forEach(c => {
        childArr.push(childishTemplate({id: c.id}))
      })
      propsAndStubs[key] = childArr
    })

    const template = compile(this._template)
    // отделяем содержимое шаблона от корневого элемента шаблона
    const fragment = document.createElement('template')
    fragment.innerHTML = template(propsAndStubs)

    getRootAttributes()

    const content = fragment.content.children[0].innerHTML
    fragment.innerHTML = content

    Object.values(this._children).forEach(child => {
      child.forEach(c => generateChildContent(c))
    })

    return fragment.content
  }

  get id() {
    return this._id
  }

  _addEvents() {
    const {events = {}} = this._props
    Object.keys(events).forEach(eventName => {
      this._node.addEventListener(eventName, events[eventName])
    })
  }

  _removeEvents() {
    const events = this._props.events as EventListeners
    if (!events) {
      return
    }
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
    this._node.append(block)
    this._addEvents()
  }

  getContent() {
    return this._node
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(EVENTS.FLOW_CDM)
  }
  dispatchComponentDidUnmount() {
    this._eventBus.emit(EVENTS.FLOW_UNMOUNT)
  }

  show() {
    this.getContent().style.display = 'block'
  }

  hide() {
    this.getContent().style.display = 'none'
  }
}
