import { FC, FormEvent, useId, useReducer, useState } from 'react';
import styles from './LoginPage.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInUser, IPayloadAction } from '../../utils/slices/userSlice';
import { FormProvider, useForm } from 'react-hook-form';
import { RegistrationEntity } from '../../entities/registrationEntity';
import { AuthorizationEntity } from '../../entities/authorizationEntity';

const LoginPage: FC = () => {
  const [option, setOption] = useState<'registration' | 'authorization'>('authorization');

  const navigate = useNavigate();
  const location = useLocation();
  // const users = useSelector((state: RootState) => state.usersData.users);
  const dispatchUser = useDispatch();

  const fromPage = location?.state?.from || '/';

  // const onSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   dispatchUser(signInUser({ id: id, ...stateData } as IPayloadAction));
  //   navigate(fromPage, { replace: true});
  // };

  const methods = useForm({
    mode: 'onBlur',
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

  return (
    <FormProvider {...methods}>
      {option === 'registration' ? (
        <RegistrationEntity
          onToggle={() => setOption('authorization')}
          onTouch={() => navigate('/main')}
        />
      ) : (
        <AuthorizationEntity
          onToggle={() => setOption('registration')}
          onTouch={() => navigate('/main')}
        />
      )}
    </FormProvider>
  );
};

export default LoginPage;
