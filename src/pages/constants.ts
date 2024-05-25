interface IConstProps {
  [key: string]: string;
}

export const PAGE: IConstProps = {
  title: 'BioTracker',
  account: 'Войти в аккаунт',
  accountLink: '/account',
  footer:
    '© 2024 Бесплатное программное обеспечение BioTracker - Все права защищены',
};

export const NAV: { name: string; path: string }[] = [
  { name: 'Главная', path: '/main' },
  { name: 'Библиотека данных', path: '/library' },
  { name: 'Контакты', path: '/contacts' },
];
