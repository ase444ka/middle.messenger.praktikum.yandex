import HTTPTransport from '@/abstract/HTTPTransport'

const userAPIInstance = new HTTPTransport('/user')

type FormDataTypes = {
  first_name?: string
  second_name?: string
  login?: string
  email?: string
  password?: string
  phone?: string
  display_name?: string
}

class UserAPI {
  async changeUserData(data: FormDataTypes) {
    const response = await userAPIInstance.put('/profile', {
      data,
    })
    if (response instanceof XMLHttpRequest) {
      const received = JSON.parse(response.response)
      return received
    } else {
      throw new Error('Unknown response :(')
    }
  }
}

export default new UserAPI()
