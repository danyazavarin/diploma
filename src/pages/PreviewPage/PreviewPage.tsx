import { createPortal } from 'react-dom';
import styles from './PreviewPage.module.scss';
import { PREVIEW } from './constants';
import { Button } from '../../utils/ui';
import { useNavigate } from 'react-router-dom';

const PreviewPage = () => {
  const navigate = useNavigate();

  return createPortal(
    <div className={styles['preview']}>
      <div className={styles['preview__block']}>
        <p className={styles['preview__header']}>
          {PREVIEW.header[0]}
          <br />
          {PREVIEW.header[1]}
        </p>
        <p className={styles['preview__description']}>{PREVIEW.description}</p>
      </div>
      <Button
        style={{ opacity: 1, width: '300px', height: '70px', fontSize: '30px' }}
        onClick={() => navigate('/main', { replace: true })}
      >
        Начать
      </Button>
    </div>,
    document.getElementById('root')!,
  );
};

export default PreviewPage;
