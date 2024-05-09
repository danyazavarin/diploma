interface IConstProps {
  [key: string]: string;
}

export const PAGE: IConstProps = {
  title: 'BioTracker',
  account: 'Личный аккаунт',
  accountLink: '/account',
  footer: '2024',
}

export const NAV: { name: string; path: string }[] = [
  { name: 'Главная', path: '/main' },
  { name: 'Биологические данные', path: '' },
  { name: 'Процессы', path: '' },
  { name: 'Контакты', path: '' },
  { name: 'Доп информация', path: '' },
];