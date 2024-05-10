import { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const RequireAuth = (props: { children: ReactNode }) => {
  const { children } = props;
  const location = useLocation();
  const user = useAuth();
  const isAuth = !!user.firstName || !!user.lastName;

  return isAuth ? children : <Navigate to='/login' state={{ from: location.pathname }} />;
};
