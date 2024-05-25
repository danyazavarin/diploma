import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import styles from '../../pages/LoginPage/LoginPage.module.scss';
import classNames from 'classnames';

interface IAuthorization {
  onSubmit: () => void;
  onToggle: () => void;
  onTouch: () => void;
}

export const AuthorizationEntity: FC<IAuthorization> = ({ onSubmit, onToggle, onTouch }) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useFormContext();

  return (
    <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
      <main className={styles['form__content']}>
        <header className={styles['form__header']}>Авторизация</header>
        <div className={styles['form__row']}>
          <Controller
            control={control}
            name='authorization.email'
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
                  className={classNames(styles['form__input'], {
                    [styles['form__input_error']]: error,
                  })}
                  type='email'
                  placeholder='Введите свой email'
                  {...field}
                />
                {error && <div style={{ color: 'red' }}>{error.message}</div>}
              </div>
            )}
          />
          <Controller
            control={control}
            name='authorization.password'
            rules={{
              required: 'Введите пароль',
              minLength: { value: 2, message: 'Пароль не может быть меньше 2 символов' },
            }}
            render={({ field, fieldState: { error } }) => (
              <div className={styles['form__block']}>
                <input
                  className={classNames(styles['form__input'], {
                    [styles['form__input_error']]: error,
                  })}
                  type='text'
                  placeholder='Введите пароль'
                  {...field}
                />
                {error && <div style={{ color: 'red' }}>{error.message}</div>}
              </div>
            )}
          />
        </div>
        <div className={styles['form__buttons']}>
          <button className={styles['form__button']} type='submit' disabled={!isValid}>
            Авторизоваться
          </button>
        </div>
        <div className={styles['form__footer']}>
          <span onClick={onToggle}>Зарегистрироваться</span>
          <span onClick={onTouch}>Продолжить без авторизации</span>
        </div>
      </main>
    </form>
  );
};
