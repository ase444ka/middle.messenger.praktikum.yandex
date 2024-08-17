import authApi from '@/api/auth-api'
import store from '@/abstract/Store'
import controller from '@/controllers/main'

type FormDataTypes = {
  first_name?: string
  second_name?: string
  login?: string
  email?: string
  password?: string
  phone?: string
}

export default {
  async signin(data: FormDataTypes) {
    await authApi.signin(data)
    controller.dispatchEvent('login', '33')
  },

  async signup(data: FormDataTypes) {
    try {
      const id = await authApi.signup({
        first_name: data.first_name,
        second_name: data.second_name,
        login: data.login,
        email: data.email,
        password: data.password,
        phone: data.phone,
      })
      store.set('userId', id)
      controller.dispatchEvent('login', id)
    } catch (e) {
      alert(e.message)
    }
  },

  async getUser() {
    try {
      // await authApi.logout()
      const data = await authApi.getUser()
      console.log(data)
      console.log('lololo')
    } catch (e) {
      console.error('bad :( ', e.message)
    }
  },
}
