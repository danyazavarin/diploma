import { useDispatch } from 'react-redux';
import styles from './AccountPage.module.scss';
import { LIST } from './constants';
import { signOutUser } from '../../utils/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const alertSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Вы вышли из аккаунта',
    });
  };

  const onClick = () => {
    // TODO: endpoint to sign out
    alertSuccess();
    dispatch(signOutUser());
    localStorage.removeItem('userInfo');
    setTimeout(() => navigate('/authorization'), 1500);
  };

  return (
    <div className={styles['infoBlock']}>
      {contextHolder}
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
          <Button
            style={{
              height: '65px',
              lineHeight: 1,
              minWidth: '25rem',
              padding: '20px 30px',
              fontWeight: 500,
            }}
            onClick={() => onClick()}
          >
            Выйти из аккаунта
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
