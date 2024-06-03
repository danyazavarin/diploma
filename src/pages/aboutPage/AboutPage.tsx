import styles from './AboutPage.module.scss';
import { Link } from 'react-router-dom';
import { ABOUT } from './constants';

const AboutPage = () => {
  return (
    <div className={styles['about']}>
      <p className={styles['about__header']}>О проекте</p>
      <hr />
      <p className={styles['about__text']}>{ABOUT.text}</p>
      <div className={styles['about__links']}>
        <Link
          to={'https://github.com/danyazavarin/diploma'}
          target='_blank'
          className={styles['about__link']}
        >
          {ABOUT.more}
        </Link>
        <Link to={'/contacts'} className={styles['about__link']}>
          {ABOUT.contacts}
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
