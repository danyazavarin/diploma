import { useDispatch } from 'react-redux';
import styles from './AccountPage.module.scss';
import { LIST } from './constants';
import { signOutUser } from '../../utils/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    // TODO: endpoint to sign out
    dispatch(signOutUser());
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <div className={styles['infoBlock']}>
      <main className={styles['infoBlock__content']}>
        <header className={styles['infoBlock__header']}>Личная информация</header>
        <div className={styles['infoBlock__list']}>
          {LIST.map((element, index) => (
            <div key={index} className={styles['infoBlock__row']}>
              <span>{element.name}</span>
              <span>{element.value}</span>
            </div>
          ))}
        </div>
        <div className={styles['infoBlock__button']}>
          <button onClick={onClick}>Выйти из аккаунта</button>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
