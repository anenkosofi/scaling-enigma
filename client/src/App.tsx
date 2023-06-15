import React, { lazy, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';

import Layout from '@components/Layout';
import { Loader } from '@components/Loader';
import { PrivateRoute } from '@components/PrivateRoute';
import { RestrictedRoute } from '@components/RestrictedRoute';
import { useAppDispatch, useAppSelector } from '@hooks';
import { refreshUser } from '@store/auth/operations';
import { selectIsRefreshing } from '@store/auth/selectors';
import { Pathname } from '@types';
const TodosPage = lazy(() => import('@pages/Todos'));
const AuthPage = lazy(() => import('@pages/Auth'));

export const App = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path={Pathname.TODOS} element={<Layout />}>
          <Route
            path={Pathname.LOGIN}
            element={
              <RestrictedRoute
                redirectTo={Pathname.TODOS}
                component={<AuthPage />}
              />
            }
          />
          <Route
            path={Pathname.TODOS}
            element={
              <PrivateRoute
                redirectTo={Pathname.LOGIN}
                component={<TodosPage />}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
};
