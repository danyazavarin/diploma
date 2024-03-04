import styles from './NotFoundPage.module.scss'
import { FC } from 'react';
export const NotFoundPage: FC = () => {
  return (
    <div className={styles['notFoundPage']}>Такой страницы не существует!</div>
  )
}