import { FC } from 'react';
import { NAV, PAGE } from '../constants.ts';
import { Outlet } from 'react-router-dom';
import styles from './MainPage.module.scss'

export const MainPage: FC = () => {
  return (
    <>
      <header className={styles['header']}>
        <div className={styles['header__present']}>
          <img src="/src/assets/icons/magnifier-svgrepo-com.svg" alt="logo" />
          <div className={styles['header__title']}>{PAGE.title}</div>
        </div>
        <nav className={styles['header__nav']}>
          <ul className={styles['header__list']}>
            {NAV.map((link, index) => <li key={index} className={styles['header__link']}>{link}</li>)}
          </ul>
          <div className={styles['header__account']}>{PAGE.account}</div>
        </nav>
      </header>
      <Outlet />
      <footer className={styles['footer']}>{PAGE.footer}</footer>
    </>
  );
};