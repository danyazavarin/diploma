import { ContactsForm } from '../../entities/contactsForm';
import styles from './ContactsPage.module.scss';
import { GoogleOutlined, PhoneOutlined } from '@ant-design/icons';

const ContactsPage = () => {
  return (
    <main className={styles['contacts']}>
      <div className={styles['contacts__block']}>
        <section className={styles['contacts__hero']}>
          <div className={styles['contacts__header']}>Информация для связи</div>
          <p className={styles['contacts__content']}>
            Используйте нашу контактную форму для всех информационных запросов или свяжитесь с нами
            напрямую, используя контактную информацию ниже.
          </p>
          <p className={styles['contacts__content']}>
            Свяжитесь с нами по электронной почте или телефону.
          </p>
          <hr />
          <div className={styles['link']}>
            <GoogleOutlined className={styles['link__img']} />
            <div className={styles['link__info']}>
              <span className={styles['link__header']}>Почта</span>
              <span className={styles['link__description']}>bioTracker@gmail.com</span>
            </div>
          </div>
          <div className={styles['link']}>
            <PhoneOutlined className={styles['link__img']} />
            <div className={styles['link__info']}>
              <span className={styles['link__header']}>Телефон (стационарный)</span>
              <p className={styles['link__description']}>+7 (912) 345-67-89</p>
            </div>
          </div>
        </section>
          <ContactsForm />
      </div>
    </main>
  );
};

export default ContactsPage;
