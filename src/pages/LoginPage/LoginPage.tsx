import { FC, FormEvent } from 'react';
import styles from './LoginPage.module.scss'
export const LoginPage: FC = () => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <form className={styles['form']} onSubmit={onSubmit}>
      <input type="text" />
      <input type="text" />
      <button type='submit'>Отправить данные</button>
    </form>
  )
}