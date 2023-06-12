import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@hooks';

type PrivateRouteProps = {
  component: JSX.Element;
  redirectTo: string;
};

export const PrivateRoute = ({
  component: Component,
  redirectTo = '/',
}: PrivateRouteProps): JSX.Element => {
  const { isAuthorized } = useAuth();
  const shouldRedirect = !isAuthorized;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
