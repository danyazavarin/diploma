interface IConstProps {
  [key: string]: string;
}

export const PAGE_INFO: IConstProps = {
  title: 'Tracker',
  account: 'Войдите в аккаунт',
  user: 'Данные пользователя',
  out: 'Выйти из аккаунта',
};

export const NAV: { name: string; path: string }[] = [
  { name: 'Главная', path: '/main' },
  { name: 'Библиотека данных', path: '/library' },
  { name: 'Контакты', path: '/contacts' },
  { name: 'О проекте', path: '/about' },
];

export const AUTH_ACCOUNT: { name: string; path: string }[] = [
  { name: 'Авторизуйтесь', path: '/authorization' },
  { name: 'Зарегистрируйтесь', path: '/registration' },
];

export const USER_ACCOUNT: { name: string; path: string }[] = [
  { name: 'Личная информация', path: '/account' },
  { name: 'Контактная информация', path: '/contacts' },
];
