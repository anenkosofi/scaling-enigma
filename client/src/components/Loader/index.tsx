import React, { FC } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import { Colors } from '@types';

export const Loader: FC = () => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color={Colors.ACCENT}
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      visible
    />
  );
};
