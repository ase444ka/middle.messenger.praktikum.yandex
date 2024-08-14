import HTTPTransport from '@/abstract/HTTPTransport'

const chatAPIInstance = new HTTPTransport('/chats')

export class ChatAPI {
  createChat(data: {title: string}) {
    return chatAPIInstance.post('/', {data})
  }

  getChatList(data: {offset?: number; limit?: number; title?: string} = {}) {
    return chatAPIInstance.get('/', {data})
  }

  addUsersToChat(data: {users: number[]; chatId: number}) {
    return chatAPIInstance.put('/users', {data})
  }

  deleteUsersFromChat(data: {users: number[]; chatId: number}) {
    return chatAPIInstance.delete('/users', {data})
  }
}
