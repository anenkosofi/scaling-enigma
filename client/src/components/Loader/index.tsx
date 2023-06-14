import React, { FC } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const GREEN_COLOR = '#6a983c';

export const Loader: FC = () => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color={GREEN_COLOR}
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      visible={true}
    />
  );
};
