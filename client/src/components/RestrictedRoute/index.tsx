import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector, useAuth } from '@hooks';

type RestrictedRouteProps = {
  component: JSX.Element;
  redirectTo: string;
};

export const RestrictedRoute = ({
  component: Component,
  redirectTo = '/',
}: RestrictedRouteProps): JSX.Element => {
  const { isAuthorized } = useAuth();
  return isAuthorized ? <Navigate to={redirectTo} /> : Component;
};
