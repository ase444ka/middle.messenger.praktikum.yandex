const user = {
    name: 'Ася', 
    surname: 'Истомина',
    email: 'istomina.asia@yandex.ru',
    username: 'ase444ka',
    nik: 'Ася',
    phone: '+7-981-911-58-79',
}
export default {
    '/pages/signin_page/index.html': {
      title: 'Вход',
      fields: [{name: 'имя'}, {name: 'пароль'}],
      buttons: [
        {title: 'авторизация', var: 'primary', action: 'alert("trololo")'},
        {title: 'нет аккаунта?', var: 'secondary', action: 'alert("trololo")'},
      ],
    },
    '/pages/signup_page/index.html': {
      title: 'Регистрация',
      fields: [
        {name: 'почта'},
        {name: 'логин'},
        {name: 'имя'},
        {name: 'фамилия'},
        {name: 'телефон'},
        {name: 'пароль'},
        {name: 'пароль (ещё раз)', type: 'password'},
      ],
      buttons: [
        {title: 'зарегистрироваться', var: 'primary', action: 'alert("trololo")'},
        {title: 'войти', var: 'secondary', action: 'alert("trololo")'},
      ],
    },
    '/pages/user_page/index.html': {
      readonly: true,
      cursor: 'default',
      name: user.name,
      fields: [
        {name: 'Почта', value: user.email},
        {name: 'Логин', value: user.username},
        {name: 'Имя', value: user.name},
        {name: 'Фамилия', value: user.surname},
        {name: 'Имя в чате', value: user.nik},
        {name: 'Телефон', value: user.phone},
      ],
      buttons: [
        {title: 'Изменить данные', var: 'primary', action: 'alert("trololo")'},
        {title: 'Изменить пароль', var: 'primary', action: 'alert("trololo")'},
        {title: 'Выйти', var: 'danger', action: 'alert("trololo")'},
      ],
    },
  };