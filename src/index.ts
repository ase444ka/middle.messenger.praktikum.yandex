import render from '@/utils/render.js'

import Block from '@/abstract/Block'

import {chatData} from '@/data/user'
import SignupView from '@/views/SignupView'
import SigninView from '@/views/SigninView'
import UserView from '@/views/UserView'
import ErrorView from '@/views/ErrorView'
import ChatView from '@/views/ChatView'
import ReferenceView from '@/views/ReferenceView'

let current: Block | null = null

const changeCurrent = (newBlock: Block | null) => {
  if (current) {
    current.dispatchComponentDidUnmount()
  }
  current = newBlock
  render('#app', current!)
}

const navigate = (href: string) => {
  switch (href) {
    case 'signin_page': {
      const signin = new SigninView()
      changeCurrent(signin)
      break
    }
    case 'signup_page': {
      const signup = new SignupView()
      changeCurrent(signup)
      break
    }
    case 'chats_page': {
      const chat = new ChatView(chatData)
      changeCurrent(chat)
      break
    }
    case 'user_page': {
      const user = new UserView()
      changeCurrent(user)
      break
    }
    case '404_page': {
      const err404 = new ErrorView({
        status: '404',
        message: 'не туда попали',
      })
      changeCurrent(err404)
      break
    }
    case '500_page': {
      const err500 = new ErrorView({
        status: '500',
        message: 'ошибка на сервере',
      })
      changeCurrent(err500)
      break
    }
    case '': {
      const ref = new ReferenceView()
      changeCurrent(ref)
      break
    }
    default: {
      const err404 = new ErrorView({
        status: '404',
        message: 'не туда попали',
      })
      changeCurrent(err404)
    }
  }
}

window.addEventListener('load', () => {
  const url = window.location.pathname
  navigate(url.slice(1))
})
