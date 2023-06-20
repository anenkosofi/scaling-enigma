import React, { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Loader } from '@components/Loader';

const Layout: FC = () => {
  return (
    <main>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default Layout;
