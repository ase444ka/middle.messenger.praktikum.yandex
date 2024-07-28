import render from '@/utils/render.js'
// import CardBlock from '@/blocks/auth/CardBlock'
// import FormBlock from '@/blocks/auth/FormBlock'
import ChatView, {ChatViewData} from '@/views/ChatView'

const chatData: ChatViewData = {
  elements: {
    currentChat: [
      {
        name: 'Петр',
        elements: {
          dailyBlocks: [
            {
              date: '11/12',
              elements: {
                messages: [
                  {text: '11', isYours: true, isSeen: false, time: '2323'},
                  {text: '12', isYours: true, isSeen: false, time: '2323'},
                  {text: '113', isYours: true, isSeen: false, time: '2323'},
                  {
                    text: '11123123 123 123123',
                    isYours: false,
                    isSeen: false,
                    time: '2323',
                  },
                  {text: '11', isYours: true, isSeen: false, time: '111'},
                  {text: '11', isYours: false, isSeen: true, time: '232113'},
                ],
              },
            },
            {
              date: '11/13',
              elements: {
                messages: [
                  {text: '11', isYours: true, isSeen: false, time: '2323'},
                  {text: '12', isYours: true, isSeen: false, time: '2323'},
                  {text: '113', isYours: true, isSeen: false, time: '2323'},
                  {
                    text: 'asdfasdfasdf asdfasdfasdf',
                    isYours: false,
                    isSeen: false,
                    time: '2323',
                  },
                  {text: '11', isYours: true, isSeen: false, time: '111'},
                  {text: '11', isYours: false, isSeen: true, time: '232113'},
                ],
              },
            },
          ],
        },
      },
    ],
    chatLinks: [
      {
        name: 'string',
        isYours: true,
        chatLast: 'string',
        chatDate: 'string',
        counter: 15,
      },
      {
        name: 'string',
        isYours: true,
        chatLast: 'string',
        chatDate: 'string',
        counter: 15,
      },
      {
        name: 'string',
        isYours: true,
        chatLast: 'string',
        chatDate: 'string',
        counter: 15,
      },
      {
        name: 'string',
        isYours: false,
        chatLast: 'string',
        chatDate: 'string',
        counter: 0,
      },
      {
        name: 'string',
        isYours: true,
        chatLast: 'string',
        chatDate: 'string',
        counter: 15,
      },
    ],
  },
}

console.log(chatData)

const chat = new ChatView(chatData)
// import SignupView from '@/views/SignupView'

// const view = new SignupView()
render('#app', chat)
