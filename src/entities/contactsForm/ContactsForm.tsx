import { Controller, useForm } from 'react-hook-form';
import styles from '../../pages/contactsPage/ContactsPage.module.scss';
import { FC, Fragment } from 'react';
import classNames from 'classnames';
import { Button, message } from 'antd';
import { Input } from '../../utils/ui';

export const ContactsForm: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const alertSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Ваша форма успешно отправлена',
    });
  };

  const methods = useForm({
    mode: 'onTouched',
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    },
    defaultValues: { name: '', email: '', textarea: '' },
  });

  const {
    reset,
    control,
    formState: { isValid },
  } = methods;

  const onSubmit = () => {
    reset();
    alertSuccess();
  };

  return (
    <section className={styles['contacts__hero']}>
      {contextHolder}
      <div className={styles['contacts__header']}>Заполните форму</div>
      <form className={styles['form']}>
        <Controller
          control={control}
          name='name'
          rules={{
            required: 'Введите имя',
            minLength: { value: 2, message: 'Имя должно содержать минимум 2 буквы' },
            pattern: { value: /^[-a-zA-Z\u0410-\u044F`]+$/, message: 'Неверный формат имени' },
          }}
          render={({ field, fieldState: { error } }) => (
            <Fragment>
              <label className={styles['form__label']}>
                Ваше имя
                <Input isError={error} type='text' placeholder='Укажите свое имя' {...field} />
                {error && <div style={{ color: 'red' }}>{error.message}</div>}
              </label>
            </Fragment>
          )}
        />
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
            <label className={styles['form__label']}>
              Ваш email
              <Input isError={error} type='email' placeholder='Введите свой email' {...field} />
              {error && <div style={{ color: 'red' }}>{error.message}</div>}
            </label>
          )}
        />
        <Controller
          control={control}
          name='textarea'
          rules={{
            required: 'Напишите свои идеи и предложения',
            minLength: { value: 2, message: 'Не меньше 2 символов' },
          }}
          render={({ field, fieldState: { error } }) => (
            <label className={styles['form__label']}>
              Сообщение
              <textarea
                placeholder='Напишите свои идеи или предложения'
                className={classNames(styles['form__textarea'], {
                  [styles['form__textarea_error']]: error,
                })}
                {...field}
              />
              {error && <div style={{ color: 'red' }}>{error.message}</div>}
            </label>
          )}
        />
        <Button
          disabled={!isValid}
          style={{ minHeight: '65px', lineHeight: 1, fontWeight: 500 }}
          onClick={() => onSubmit()}
        >
          Отправить
        </Button>
      </form>
    </section>
  );
};
