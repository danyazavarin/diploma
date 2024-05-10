import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/appStore';

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.userInfo.user);

  return useMemo(() => user, [user]);
};
