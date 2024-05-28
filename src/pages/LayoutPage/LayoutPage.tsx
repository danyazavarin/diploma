import { FC, useEffect, useState } from 'react';
import { AUTH_ACCOUNT, NAV, PAGE_INFO, USER_ACCOUNT } from '../constants.ts';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './LayoutPage.module.scss';
import { useAuth } from '../../utils/hooks/useAuth.ts';
import { useDispatch } from 'react-redux';
import { signInUser, signOutUser } from '../../utils/slices/userSlice.ts';
import { Popover } from 'antd';
import { UserOutlined, ContainerOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Button } from '../../utils/ui/index.ts';

export const LayoutPage: FC = () => {
  const user = useAuth();
  const dispatchUser = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      dispatchUser(signInUser(JSON.parse(userInfo)));
    }
  }, []);

  const handleClick = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const authContent = (
    <div className={styles['account']}>
      <div className={styles['account__info']}>
        <div className={styles['account__avatar']}>{'U'}</div>
        <div className={styles['account__block']}>
          <span className={styles['account__header']}>
            {(user.firstName && user.lastName && `${user.firstName + ' ' + user.lastName}`) ||
              'Пользователь'}
          </span>
        </div>
      </div>
      <hr />
      <ul className={styles['account__list']}>
        {AUTH_ACCOUNT.map((link) => (
          <div className={styles['account__line']} onClick={() => handleClick(link.path)}>
            <ContainerOutlined className={styles['account__tip']} />
            <li key={link.name} className={styles['account__row']}>
              {link.name}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );

  const userContent = (
    <div className={styles['account']}>
      <div className={styles['account__info']}>
        <div className={styles['account__avatar']}>
          {(user.firstName &&
            user.lastName &&
            `${user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}`) ||
            'U'}
        </div>
        <div className={styles['account__block']}>
          <span className={styles['account__header']}>
            {(user.firstName && user.lastName && `${user.firstName + ' ' + user.lastName}`) ||
              'Пользователь'}
          </span>
          <span className={styles['account__header']}>{'danyazavarin'}</span>
        </div>
      </div>
      <hr />
      <ul className={styles['account__list']}>
        {USER_ACCOUNT.map((link) => (
          <div className={styles['account__line']} onClick={() => handleClick(link.path)}>
            <ContainerOutlined className={styles['account__tip']} />
            <li key={link.name} className={styles['account__row']}>
              {link.name}
            </li>
          </div>
        ))}
      </ul>
      <Button
        onClick={() => {
          dispatchUser(signOutUser());
          localStorage.removeItem('userInfo');
        }}
      >
        {PAGE_INFO.out}
      </Button>
    </div>
  );

  return (
    <div className={styles['bodyContainer']}>
      <header className={styles['header']}>
        <div className={styles['header__present']}>
          <img src='/src/assets/icons/leaf-shape.svg' alt='logo' />
          <div className={styles['header__title']}>
            <span>Bio</span>
            <span>{PAGE_INFO.title}</span>
          </div>
        </div>
        <nav className={styles['header__nav']}>
          <div className={styles['header__list']}>
            {NAV.map((link, index) => (
              <NavLink
                to={link.path}
                key={index}
                className={({ isActive }) =>
                  classNames(styles['header__link'], { [styles['header__link_active']]: isActive })
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          <Popover
            content={user.firstName || user.lastName ? userContent : authContent}
            open={open}
            onOpenChange={(newOpen: boolean) => setOpen(newOpen)}
            trigger='click'
          >
            <UserOutlined className={styles['account__icon']} />
          </Popover>
        </nav>
      </header>
      <div className={styles['outlet']}>
        <Outlet />
      </div>
    </div>
  );
};
