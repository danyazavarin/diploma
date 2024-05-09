import { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

export const RequireAuth = (props: { children: ReactNode }) => {
  const { children } = props;
  const location = useLocation();
  const isAuth = !!location?.state;

  return isAuth ? children : <Navigate to='/login' state={{ from: location.pathname }} />;
};
