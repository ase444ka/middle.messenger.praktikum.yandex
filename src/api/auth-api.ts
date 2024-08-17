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
      withCredentials: true,
    })
    if (response instanceof XMLHttpRequest) {
      const received = JSON.parse(response.response)
      return received.id
    } else {
      throw new Error('Unknown response :(')
    }
  }

  async signin(data: FormDataTypes) {
    await authAPIInstance.post('/signin', {data, withCredentials: true})
    return true
  }

  async getUser() {
    const response = await authAPIInstance.get('/user')
    if (response instanceof XMLHttpRequest) {
      console.log(response)
      const received = JSON.parse(response.response)
      return received
    } else {
      throw new Error('Unknown response :(')
    }
  }

  async logout() {
    await authAPIInstance.post('/logout')
  }
}

export default new AuthAPI()
