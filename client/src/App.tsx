import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '@components/Layout';
import { PrivateRoute } from '@components/PrivateRoute';
import { Pathname } from '@types';
const TodosPage = lazy(() => import('@pages/Todos'));
const AuthPage = lazy(() => import('@pages/Auth'));

export const App = () => {
  return (
    <Routes>
      <Route path={Pathname.TODOS} element={<Layout />}>
        <Route path={Pathname.LOGIN} element={<AuthPage />} />
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
  );
};
