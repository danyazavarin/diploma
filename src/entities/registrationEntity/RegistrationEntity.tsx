import { FC } from 'react';
import styles from '../../pages/LoginPage/LoginPage.module.scss';
import { useFormContext, Controller } from 'react-hook-form';

interface IRegistration {
  onSubmit: () => void;
  onToggle: () => void;
  onTouch: () => void;
}

export const RegistrationEntity: FC<IRegistration> = ({ onSubmit, onToggle, onTouch }) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useFormContext();

  return (
    <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
      <main className={styles['form__content']}>
        <header className={styles['form__header']}>Регистрация</header>
        <div className={styles['form__row']}>
          <Controller
            control={control}
            name='registration.firstName'
            rules={{
              required: 'Введите имя',
              minLength: { value: 2, message: 'Имя должно содержать минимум 2 буквы' },
              pattern: { value: /^[-a-zA-Z\u0410-\u044F`]+$/, message: 'Неверный формат имени' },
            }}
            render={({ field, fieldState: { error } }) => (
              <div className={styles['form__block']}>
                <input
                  className={error ? styles['form__input_error'] : styles['form__input']}
                  type='text'
                  placeholder='Введите ваше имя'
                  {...field}
                />
                {error && <div style={{ color: 'red' }}>{error.message}</div>}
              </div>
            )}
          />
          <Controller
            control={control}
            name='registration.lastName'
            rules={{
              required: 'Введите фамилию',
              pattern: { value: /^[-a-zA-Z\u0410-\u044F`]+$/, message: 'Неверный формат фамилии' },
            }}
            render={({ field, fieldState: { error } }) => (
              <div className={styles['form__block']}>
                <input
                  className={error ? styles['form__input_error'] : styles['form__input']}
                  type='text'
                  placeholder='Введите вашу фамилию'
                  {...field}
                />
                {error && <div style={{ color: 'red' }}>{error.message}</div>}
              </div>
            )}
          />
        </div>
        <div className={styles['form__row']}>
          <Controller
            control={control}
            name='registration.dateOfBirthday'
            rules={{
              required: 'Введите дату рождения',
            }}
            render={({ field, fieldState: { error } }) => (
              <div className={styles['form__block']}>
                <input
                  className={error ? styles['form__input_error'] : styles['form__input']}
                  type='text'
                  placeholder='Введите дату рождения'
                  {...field}
                />
                {error && <div style={{ color: 'red' }}>{error.message}</div>}
              </div>
            )}
          />
          <Controller
            control={control}
            name='registration.email'
            rules={{
              required: 'Введите свой email',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: 'Неверный формат email',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <div className={styles['form__block']}>
                <input
                  className={error ? styles['form__input_error'] : styles['form__input']}
                  type='email'
                  placeholder='Введите свой email'
                  {...field}
                />
                {error && <div style={{ color: 'red' }}>{error.message}</div>}
              </div>
            )}
          />
        </div>
        <div className={styles['form__row']}>
          <Controller
            control={control}
            name='registration.password'
            rules={{
              required: 'Введите пароль',
              minLength: { value: 2, message: 'Пароль не может быть меньше 2 символов' },
            }}
            render={({ field, fieldState: { error } }) => (
              <div className={styles['form__block']}>
                <input
                  className={error ? styles['form__input_error'] : styles['form__input']}
                  type='text'
                  placeholder='Придумайте пароль'
                  {...field}
                />
                {error && <div style={{ color: 'red' }}>{error.message}</div>}
              </div>
            )}
          />
        </div>
        <div className={styles['form__buttons']}>
          <button className={styles['form__button']} type='submit' disabled={!isValid}>
            Зарегистрироваться
          </button>
        </div>
        <div className={styles['form__footer']}>
          <span onClick={onToggle}>Войти</span>
          <span onClick={onTouch}>Продолжить без регистрации</span>
        </div>
      </main>
    </form>
  );
};
