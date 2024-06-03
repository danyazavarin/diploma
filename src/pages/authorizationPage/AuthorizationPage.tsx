import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './AuthorizationPage.module.scss';
import { Input } from '../../utils/ui';
import { useNavigate } from 'react-router-dom';
// import { useAuthorizationMutation } from '../../utils/api/authApi';
import { signInUser } from '../../utils/slices/userSlice';
import { useDispatch } from 'react-redux';
import { Button, message } from 'antd';

interface IForm {
  email: string;
  password: string;
}

const AuthorizationPage: FC = () => {
  // const [auth, { isLoading }] = useAuthorizationMutation();
  const navigate = useNavigate();
  const dispatchUser = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const alertSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Вы успешно авторизовались',
    });
  };

  const methods = useForm<IForm>({
    mode: 'onTouched',
    resetOptions: {
      keepErrors: true,
      keepDirtyValues: true,
    },
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    control,
    formState: { isValid },
    // handleSubmit,
    reset,
    // getValues,
  } = methods;

  const onSubmit = async () => {
    try {
      // const userInfo = await auth(getValues('authorization')).unwrap();
      // dispatchUser(signInUser(userInfo as IUserInfo));
      dispatchUser(
        signInUser({
          user: { firstName: 'Даниил', lastName: 'Заварин' },
          userToken: 'danyazavarin',
        }),
      );
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          user: { firstName: 'Даниил', lastName: 'Заварин' },
          userToken: 'danyazavarin',
        }),
      );
      reset();
      alertSuccess();
      setTimeout(() => navigate('/main', { replace: true }), 1500);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <form className={styles['form']}>
      {contextHolder}
      <main className={styles['form__content']}>
        <header className={styles['form__header']}>Авторизация</header>
        <div className={styles['form__row']}>
          <Controller
            control={control}
            name='email'
            rules={{
              required: 'Введите свой email',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: 'Неверный формат email',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <div className={styles['form__block']}>
                <Input
                  isError={!!error}
                  className={styles['form__input']}
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
            name='password'
            rules={{
              required: 'Введите пароль',
              minLength: { value: 2, message: 'Пароль не может быть меньше 2 символов' },
            }}
            render={({ field, fieldState: { error } }) => (
              <div className={styles['form__block']}>
                <Input
                  isError={!!error}
                  className={styles['form__input']}
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
          <Button
            disabled={!isValid}
            style={{
              minHeight: '65px',
              lineHeight: 1,
              minWidth: '25rem',
              padding: '20px 30px',
              fontWeight: 500,
            }}
            onClick={() => onSubmit()}
          >
            Авторизоваться
          </Button>
        </div>
        <div className={styles['form__footer']}>
          <span onClick={() => navigate('/registration')}>Зарегистрироваться</span>
          <span onClick={() => navigate('/main')}>Продолжить без авторизации</span>
        </div>
      </main>
    </form>
  );
};

export default AuthorizationPage;
