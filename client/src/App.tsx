import React, { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';

import Layout from '@components/Layout';
import { PrivateRoute } from '@components/PrivateRoute';
import { RestrictedRoute } from '@components/RestrictedRoute';
import { Pathname } from '@types';
const TodosPage = lazy(() => import('@pages/Todos'));
const AuthPage = lazy(() => import('@pages/Auth'));

export const App = () => {
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
            path={Pathname.REGISTER}
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
