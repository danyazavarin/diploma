import { FC, useEffect } from 'react';
import { NAV, PAGE } from '../constants.ts';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './LayoutPage.module.scss';
import { useAuth } from '../../utils/hooks/useAuth.ts';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../utils/slices/userSlice.ts';

const LayoutPage: FC = () => {
  const user = useAuth();
  const dispatchUser = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatchUser(signInUser(JSON.parse(user)));
    }
  }, []);

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
            {(user.firstName &&
              user.lastName &&
              `${user.firstName + ' ' + user.lastName[0].toUpperCase()}.`) ||
              PAGE.account}
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
