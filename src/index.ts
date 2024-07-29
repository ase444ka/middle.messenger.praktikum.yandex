import render from '@/utils/render.js'

import Block from '@/abstract/Block'

import {chatData} from '@/data/user'
import SignupView from '@/views/SignupView'
import SigninView from '@/views/SigninView'
import UserView from '@/views/UserView'
import ErrorView from '@/views/ErrorView'
import ChatView from '@/views/ChatView'

let current: Block | null = null

const hideMainPage = () => {
  const nav = document.querySelector('nav')
  const header = document.querySelector('header')
  if (nav) {
    nav.style.display = 'none'
  }
  if (header) {
    header.style.display = 'none'
  }
}

const showMainPage = () => {
  const nav = document.querySelector('nav')
  const header = document.querySelector('header')
  if (nav) {
    nav.style.display = 'block'
  }
  if (header) {
    header.style.display = 'block'
  }
}

const changeCurrent = (newBlock?: Block | null) => {
  if (current) {
    current.dispatchComponentDidUnmount()
  }
  if (newBlock) {
    current = newBlock
  } else showMainPage()
}

const navigate = (href: string) => {
  switch (href) {
    case 'signin_page': {
      const signin = new SigninView()
      changeCurrent(signin)
      render('#app', signin)
      break
    }
    case 'signup_page': {
      const signup = new SignupView()
      changeCurrent(signup)
      render('#app', signup)
      break
    }
    case 'chats_page': {
      const chat = new ChatView(chatData)
      changeCurrent(chat)
      render('#app', chat)
      break
    }
    case 'user_page': {
      const user = new UserView()
      changeCurrent(user)
      render('#app', user)
      break
    }
    case '404_page': {
      const err404 = new ErrorView({
        status: '404',
        message: 'не туда попали',
      })
      changeCurrent(err404)
      render('#app', err404)
      break
    }
    case '500_page': {
      const err500 = new ErrorView({
        status: '500',
        message: 'ошибка на сервере',
      })
      changeCurrent(err500)
      render('#app', err500)
      break
    }
    case '':
      changeCurrent()
      break

    default: {
      const err404 = new ErrorView({
        status: '404',
        message: 'не туда попали',
      })
      changeCurrent(err404)
      render('#app', err404)
    }
  }
}

window.addEventListener('popstate', function () {
  const p = window.location.pathname.slice(1)
  navigate(p)
})

window.onload = () => {
  const links = document.querySelectorAll('a')
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()
      const link = e.target as HTMLAnchorElement
      const href = link.getAttribute('href')
      hideMainPage()
      history.pushState({}, '', href)
      navigate(href!)
    })
  })
}
