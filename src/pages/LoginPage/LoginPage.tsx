import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInUser, IUserInfo } from '../../utils/slices/userSlice';
import { FormProvider, useForm } from 'react-hook-form';
import { RegistrationEntity } from '../../entities/registrationEntity';
import { AuthorizationEntity } from '../../entities/authorizationEntity';
import { useLoginMutation } from '../../utils/api/authApi';

interface IForm {
  registration: {
    firstName: string;
    lastName: string;
    dateOfBirthday: string;
    email: string;
    password: string;
  };
  authorization: {
    email: string;
    password: string;
  };
}

const LoginPage: FC = () => {
  const [login, {}] = useLoginMutation();
  const [option, setOption] = useState<'registration' | 'authorization'>('authorization');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatchUser = useDispatch();

  const fromPage = location?.state?.from || '/main';

  const methods = useForm<IForm>({
    mode: 'onTouched',
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    },
    defaultValues: {
      registration: {
        firstName: '',
        lastName: '',
        dateOfBirthday: '',
        email: '',
        password: '',
      },
      authorization: {
        email: '',
        password: '',
      },
    },
  });

  const { reset, getValues } = methods;

  const onSubmit = async () => {
    try {
      // const userInfo =
      //   option === 'registration'
      //     ? await login(getValues('registration')).unwrap()
      //     : await login(getValues('authorization')).unwrap();
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
      navigate(fromPage, { replace: true });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <FormProvider {...methods}>
      {option === 'registration' ? (
        <RegistrationEntity
          onSubmit={() => onSubmit()}
          onToggle={() => setOption('authorization')}
          onTouch={() => navigate('/main')}
        />
      ) : (
        <AuthorizationEntity
          onSubmit={() => onSubmit()}
          onToggle={() => setOption('registration')}
          onTouch={() => navigate('/main')}
        />
      )}
    </FormProvider>
  );
};

export default LoginPage;
