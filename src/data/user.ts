const user = {
  name: 'Ася',
  surname: 'Истомина',
  email: 'istomina.asia@yandex.ru',
  username: 'ase444ka',
  nik: 'Ася',
  phone: '+7-981-911-58-79',
}

const chatList = [
  {
    name: 'Маша',
    isYours: false,
    counter: 3,
    chatLast: 'очень здорово! давай так и сделаем',
    chatDate: '14:09',
  },
  {
    name: 'дружок',
    isYours: false,
    counter: 0,
    chatLast: 'зачем???',
    chatDate: 'вчера',
  },
  {
    name: 'поддержка озона',
    isYours: false,
    counter: 3,
    chatLast: 'мы сожалеем, что товар не оправдал ваших ожиданий.',
    chatDate: 'ср',
  },
  {
    name: 'Семен Викторович',
    isYours: true,
    counter: 0,
    chatLast: 'да уж.. странно..',
    chatDate: 'вт',
  },
  {
    name: 'злой бот',
    isYours: false,
    counter: 3,
    chatLast: 'все будет ПЛОХО ПЛОХО ПЛОХООО',
    chatDate: 'пн',
  },
  {
    name: 'луна моей жизни',
    isYours: false,
    counter: 10,
    chatLast: 'ах!',
    chatDate: 'вс',
  },
  {
    name: 'анонимус',
    isYours: true,
    counter: 0,
    chatLast: 'что?',
    chatDate: 'вс',
  },
  {
    name: 'Андрюха',
    isYours: false,
    counter: 20,
    chatLast: 'хахахахахахххх',
    chatDate: 'сб',
  },
]
const pageData: {[key: string]: object} = {
  '/pages/signin_page/index.html': {
    title: 'Вход',
    fields: [
      {name: 'логин', fieldName: 'login'},
      {name: 'пароль', fieldName: 'password', type: 'password'},
    ],
    buttons: [
      {title: 'авторизация', var: 'primary', action: 'alert("trololo")'},
      {title: 'нет аккаунта?', var: 'secondary', action: 'alert("trololo")'},
    ],
  },
  '/pages/signup_page/index.html': {
    title: 'Регистрация',
    fields: [
      {name: 'логин', fieldName: 'login'},
      {name: 'имя', fieldName: 'first_name'},
      {name: 'фамилия', fieldName: 'kjkjkjkj'},
      {name: 'телефон', fieldName: 'phone'},
      {name: 'пароль', fieldName: 'password', type: 'password'},
      {name: 'пароль (ещё раз)', type: 'password'},
    ],
    buttons: [
      {
        title: 'зарегистрироваться',
        var: 'primary',
        action: 'alert("trololo")',
      },
      {title: 'войти', var: 'secondary', action: 'alert("trololo")'},
    ],
  },
  '/pages/user_page/index.html': {
    readonly: true,
    cursor: 'default',
    name: user.name,
    fields: [
      {name: 'Почта', value: user.email, fieldName: 'email'},
      {name: 'Логин', value: user.username, fieldName: 'login'},
      {name: 'Имя', value: user.name, fieldName: 'first_name'},
      {name: 'Фамилия', value: user.surname, fieldName: 'second_name'},
      {name: 'Имя в чате', value: user.nik, fieldName: 'display_name'},
      {name: 'Телефон', value: user.phone, fieldName: 'phone'},
    ],
    buttons: [
      {title: 'Изменить данные', var: 'primary', action: 'alert("trololo")'},
      {title: 'Изменить пароль', var: 'primary', action: 'alert("trololo")'},
      {title: 'Выйти', var: 'danger', action: 'alert("trololo")'},
    ],
  },
  '/pages/chats_page/index.html': {
    chatList,
  },
}

export default pageData
