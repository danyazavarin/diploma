import { ConfigProvider, Spin } from 'antd';
import styles from './Preloader.module.scss';

export const Preloader = () => {
  return (
    <div className={styles['preloader']}>
      <ConfigProvider
        theme={{
          components: {
            Spin: {
              colorPrimary: 'green',
              algorithm: true,
            },
          },
        }}
      >
      <Spin size='large' className={styles['preloader__spin']} />
      </ConfigProvider>
      <span className={styles['preloader__text']}>Loading...</span>
    </div>
  );
};
