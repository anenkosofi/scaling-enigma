import { FC } from 'react';

import './Button.scss';

type ButtonProps = {
  selected: boolean;
  type?: 'button';
  children: React.ReactNode;
} & React.HTMLProps<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  selected = false,
  type = 'button',
  children,
  ...otherProps
}) => {
  return (
    <button
      type={type}
      className={
        selected ? 'filter-button filter-button--selected' : 'filter-button'
      }
      {...otherProps}
    >
      {children}
    </button>
  );
};
