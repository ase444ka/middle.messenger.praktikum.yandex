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
  settings?: BlockSettings
  [key: string]:
    | BlockSettings
    | Primitive
    | EventListeners
    | BlockChildrenData
    | undefined
    | Block
}

type BlockSettings = {selector?: string}

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
  _interactiveSelector: string
  _interactiveNode: HTMLElement

  constructor(data: BlockData = {}) {
    const {children, props, settings} = this._getData(data)
    this._children = children
    this._eventBus = new EventBus()
    this._id = makeUUID()
    this._interactiveSelector = settings?.selector || ''
    this._props = this._makePropsProxy(props)
    this._registerEvents()
  }

  _getData(data: BlockData) {
    const children: BlockChildren = {}
    const props: BlockProps = {}
    let settings: BlockSettings = {}
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'settings') {
        settings = value as BlockSettings
      } else if (value instanceof Block) {
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
    return {children, props, settings}
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
        const oldProps = {...receiver}
        const newProps = {...receiver, [prop]: value}
        Reflect.set(target, prop, value, receiver)
        this.dispatchComponentDidUpdate(oldProps, newProps)
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
    // создание плоских пропсов вместо вложенных элементов
    const generatePropsAndStubs = () => {
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
      return propsAndStubs
    }
    // создание шаблона с плоскими пропсами
    //  - заглушками вместо элементов
    const generateFlatTemplate = (
      propsAndStubs: BlockProps | {[el: string]: string[]},
    ) => {
      const template = compile(this._template)
      // отделяем содержимое шаблона
      // от корневого элемента шаблона
      const templateElement = document.createElement('template')
      templateElement.innerHTML = template(propsAndStubs)
      return templateElement
    }
    // вытаскиваем атрибуты для
    // корневого элемента из шаблона
    const getRootAttributes = (templateElement: HTMLTemplateElement) => {
      const prototype = templateElement.content.children[0]
      const attrs = prototype.attributes
      for (const attr of Array.from(attrs)) {
        this._node.setAttribute(
          attr.name,
          prototype.getAttribute(attr.name) as string,
        )
      }
    }
    // получаем внутренность шаблона,
    // все что внутри корневого элемента
    const getFlatInnerTemplate = (templateElement: HTMLTemplateElement) => {
      const inner = templateElement.content.children[0].innerHTML
      const innerTemplate = document.createElement('template')
      innerTemplate.innerHTML = inner
      return innerTemplate
    }
    // помещаем во внутренний "плоский"
    // шаблон настоящие дочерние элементы
    const generateNestedContentFragment = (
      templateElement: HTMLTemplateElement,
    ) => {
      Object.values(this._children).forEach(child => {
        child.forEach(c => generateChildContent(c, templateElement))
      })
      return templateElement.content
    }
    // создание дочерних элементов
    const generateChildContent = (
      child: Block,
      templateElement: HTMLTemplateElement,
    ) => {
      if (!child.id) {
        throw new Error(
          `Error! Seems like ${child.constructor.name} don't have id!`,
        )
      }
      const stub = templateElement.content.querySelector(
        `[data-id="${child.id}"]`,
      )
      if (!stub) {
        throw new Error('all blocks must have attribute "data-id"')
      }
      stub.replaceWith(child.getContent())
    }
    // задание узла, который будет реагировать
    // на действия пользователя
    const setInteractiveNode = (content: DocumentFragment) => {
      if (this._interactiveSelector) {
        this._interactiveNode =
          content.querySelector(this._interactiveSelector) || this._node
      } else {
        this._interactiveNode = this._node
      }
    }

    const propsAndStubs = generatePropsAndStubs()
    const templateElement = generateFlatTemplate(propsAndStubs)
    getRootAttributes(templateElement)
    const flatInnerTemplate = getFlatInnerTemplate(templateElement)
    const content = generateNestedContentFragment(flatInnerTemplate)
    setInteractiveNode(content)
    return content
  }

  get id() {
    return this._id
  }

  _addEvents() {
    const {events = {}} = this._props
    Object.keys(events).forEach(eventName => {
      this._interactiveNode.addEventListener(eventName, events[eventName])
    })
  }

  _removeEvents() {
    const events = this._props.events as EventListeners
    if (!events) {
      return
    }
    Object.keys(events).forEach(eventName => {
      this._interactiveNode.removeEventListener(eventName, events[eventName])
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
    this._node.innerHTML = ''
    this._node.append(block)
    this._addEvents()
    this.dispatchComponentDidMount()
  }

  getContent() {
    return this._node
  }

  dispatchComponentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    this._eventBus.emit(EVENTS.FLOW_CDU, oldProps, newProps)
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
