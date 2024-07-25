import render from '@/utils/render.js'
// import CardBlock from '@/blocks/auth/CardBlock'
// import FormBlock from '@/blocks/auth/FormBlock'
import ChatView, {ChatViewData} from '@/views/ChatView'

// const form = new FormBlock({
//   readonly: true,
//   cursor: 'default',
//   name: 'Петр',

//   elements: {
//     fields: [
//       {inputName: 'Почта', value: 'sdfg',
// fieldName: 'email'},
//       {inputName: 'Логин',
// value: 'user.username', fieldName: 'login'},
//       {inputName: 'Имя',
// value: 'user.name',
// fieldName: 'first_name'},
//       {inputName: 'Фамилия', value: 'ser.surname',
// fieldName: 'second_name'},
//       {inputName: 'Имя в чате', value:
// 'user.nik', fieldName: 'display_name'},
//       {inputName: 'Телефон',
// value: 'user.phone', fieldName: 'phone'},
//     ],
//     buttons: [
//       {title: 'Изменить данные', var:
// 'primary', action: 'alert("trololo")'},
//       {title: 'Изменить пароль',
// var: 'primary', action: 'alert("trololo")'},
//       {title: 'Выйти', var: 'danger',
// action: 'alert("trololo")'},
//     ],
//   },
// })

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

// app —3 это class дива в корне DOM
render('#app', chat)
