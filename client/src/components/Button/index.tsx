import React, { FC } from 'react';

import { ButtonType } from '@types';

import './Button.scss';

type ButtonProps = {
  selected: boolean;
  type?: ButtonType;
  children: React.ReactNode;
} & React.HTMLProps<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  selected = false,
  type = ButtonType.BUTTON,
  children,
  ...otherProps
}) => {
  return (
    <button
      type={type}
      className={
        selected ? 'filter-button filter-button_selected' : 'filter-button'
      }
      {...otherProps}
    >
      {children}
    </button>
  );
};
