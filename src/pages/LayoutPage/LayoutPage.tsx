import { FC } from 'react';
import { NAV, PAGE } from '../constants.ts';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './LayoutPage.module.scss';
import { useAuth } from '../../utils/hooks/useAuth.ts';

const LayoutPage: FC = () => {
  const user = useAuth();

  return (
    <>
      <header className={styles['header']}>
        <div className={styles['header__present']}>
          <img src='/src/assets/icons/magnifier-svgrepo-com.svg' alt='logo' />
          <div className={styles['header__title']}>{PAGE.title}</div>
        </div>
        <nav className={styles['header__nav']}>
          <div className={styles['header__list']}>
            {NAV.map((link, index) => (
              <NavLink
                to={link.path}
                key={index}
                className={({ isActive }) =>
                  isActive ? styles['header__link_active'] : styles['header__link']
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          <NavLink to={PAGE.accountLink} className={styles['header__account']}>
            {user.firstName || PAGE.account}
          </NavLink>
        </nav>
      </header>
      <div className={styles['outlet']}>
        <Outlet />
      </div>
      <footer className={styles['footer']}>{PAGE.footer}</footer>
    </>
  );
};

export default LayoutPage;
