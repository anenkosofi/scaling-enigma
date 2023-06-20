import React, { FC } from 'react';
import { IconType } from 'react-icons/lib';

type FormFieldProps = {
  id: string;
  type: string;
  name: string;
  label: string;
  value: string;
  error: string | null;
  icon: IconType;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onFocus: React.FocusEventHandler<HTMLInputElement>;
};

export const FormField: FC<FormFieldProps> = ({
  id,
  type,
  name,
  label,
  value,
  error,
  icon: Icon,
  onChange,
  onBlur,
  onFocus,
}) => {
  return (
    <div className="login__field">
      <input
        id={id}
        type={type}
        placeholder=" "
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className="login__input"
        autoComplete="off"
      />
      <Icon size="24" className="login__icon" />
      <label htmlFor={id} className="login__label">
        {label}
      </label>
      {error && <p className="login__input-error">{error}</p>}
    </div>
  );
};
