import { selectUser, selectIsAuthorized } from '@store/auth/selectors';

import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
  const user = useAppSelector(selectUser);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  return {
    isAuthorized,
    user,
  };
};
