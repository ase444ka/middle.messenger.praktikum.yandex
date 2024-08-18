import {ChatViewData} from '@/views/ChatView'
export const chatData: ChatViewData = {
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

export const userFormData = {
  readonly: true,
  action: 'setUser',
  elements: {
    fields: [
      {
        inputName: 'Почта',
        // txt: 'user@user',
        fieldName: 'email',
        readonly: true,
        type: 'email',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Логин',
        // txt: 'Vasily',
        fieldName: 'login',
        readonly: true,
        type: 'name',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Имя',
        // txt: 'Вася',
        fieldName: 'first_name',
        readonly: true,
        type: 'name',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Фамилия',
        // txt: 'Васин',
        fieldName: 'second_name',
        readonly: true,
        type: 'name',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Телефон',
        // txt: '+98898983234',
        fieldName: 'phone',
        readonly: true,
        type: 'phone',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Пароль',
        // txt: 'kkkj1_-Dlj',
        fieldName: 'password',
        readonly: true,
        type: 'password',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Пароль (еще раз)',
        // txt: 'kkkj1_-Dlj',
        fieldName: 'password_2',
        readonly: true,
        type: 'password',
        inputClass: 'userdata__input',
      },
    ],
    buttons: [
      {
        title: 'Изменить данные',
        var: 'primary',
      },
      {
        title: 'Изменить пароль',
        var: 'primary',
      },
      {
        title: 'Сохранить',
        var: 'primary',
        submit: true,
        hidden: true,
      },
    ],
  },

  linkText: 'Выйти',
  linkHref: '/',
  linkClass: 'userdata__link',
}

export const userPasswordData = {
  readonly: false,
  elements: {
    fields: [
      {
        inputName: 'Старый пароль',
        // txt: 'kkkj1_-Dlj',
        fieldName: 'password',
        type: 'password',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Новый пароль',
        // txt: 'kkkj1_-Dlj',
        fieldName: 'password_2',
        type: 'password',
        inputClass: 'userdata__input',
      },
      {
        inputName: 'Повторите новый пароль',
        // txt: 'kkkj1_-Dlj',
        fieldName: 'password_3',
        type: 'password',
        inputClass: 'userdata__input',
      },
    ],
    buttons: [
      {
        title: 'Сохранить',
        var: 'primary',
        submit: true,
      },
    ],
  },
  linkText: 'Выйти',
  linkHref: '/',
  linkClass: 'userdata__link',
}
