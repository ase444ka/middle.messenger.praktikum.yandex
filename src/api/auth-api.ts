import HTTPTransport from '@/abstract/HTTPTransport'

const authAPIInstance = new HTTPTransport('/auth')

export class AuthAPI {
  signup(data: {
    first_name: string
    second_name: string
    login: string
    email: string
    password: string
    phone: string
  }) {
    return authAPIInstance.post('/signup', {data})
  }

  signin(data: {login: string; password: string}) {
    return authAPIInstance.post('/signin', {data})
  }

  getUser() {
    return authAPIInstance.get('/user')
  }

  logout() {
    return authAPIInstance.post('/logout')
  }
}
