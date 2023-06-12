import React, { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Loader } from '@components/Loader';

const SharedLayout: FC = () => {
  return (
    <main>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default SharedLayout;
