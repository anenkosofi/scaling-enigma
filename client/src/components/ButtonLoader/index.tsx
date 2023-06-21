import React, { FC } from 'react';
import { Oval } from 'react-loader-spinner';

import { Colors } from '@types';

export const ButtonLoader: FC = () => {
  return (
    <Oval
      height={24}
      width={24}
      color={Colors.ACCENT}
      visible
      ariaLabel="oval-loading"
      secondaryColor={Colors.ACCENT}
      strokeWidth={8}
      strokeWidthSecondary={2}
    />
  );
};
