import HTTPTransport from '@/abstract/HTTPTransport'

const authAPIInstance = new HTTPTransport('/auth')

type FormDataTypes = {
  first_name?: string
  second_name?: string
  login?: string
  email?: string
  password?: string
  phone?: string
}

class AuthAPI {
  async signup(data: FormDataTypes) {
    const response = await authAPIInstance.post('/signup', {
      data,
    })
    if (response instanceof XMLHttpRequest) {
      const received = JSON.parse(response.response)
      return received.id
    } else {
      throw new Error('Unknown response :(')
    }
  }

  async signin(data: FormDataTypes) {
    await authAPIInstance.post('/signin', {data})
    return true
  }

  getUser() {
    return authAPIInstance.get('/user')
  }

  logout() {
    return authAPIInstance.post('/logout')
  }
}

export default new AuthAPI()
