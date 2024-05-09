import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss'
import { FC } from 'react';

const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles['notFoundPage']}>
      <div>Такой страницы не существует!</div>
      <button onClick={() => navigate(-1)}>Вернуться назад</button>
    </div>
  );
}

export default NotFoundPage;