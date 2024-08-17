import userApi from '@/api/user-api'
import store from '@/abstract/Store'

type FormDataTypes = {
  first_name?: string
  second_name?: string
  login?: string
  email?: string
  password?: string
  phone?: string
  display_name?: string
}

export default {
  async setUser(data: FormDataTypes) {
    try {
      const userData = await userApi.changeUserData({
        first_name: data.first_name,
        second_name: data.second_name,
        login: data.login,
        email: data.email,
        phone: data.phone,
        display_name: data.display_name,
      })
      store.set('userData', userData)
    } catch (e) {
      alert(e.message)
    }
  },
}
