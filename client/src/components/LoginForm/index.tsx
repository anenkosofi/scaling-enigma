import React, { FC, useState } from 'react';

import { useAppDispatch } from '@hooks';
import { login } from '@store/auth/operations';

import './LoginForm.scss';

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(form));

    setForm({ email: '', password: '' });
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <h1 className="login__title">Sign in</h1>
        <form
          className="login__form"
          autoComplete="off"
          onSubmit={submitHandler}
        >
          <input
            type="password"
            name="new-password"
            autoComplete="new-password"
            style={{ display: 'none' }}
          />
          <div className="login__field">
            <input
              id="email"
              type="email"
              placeholder=" "
              name="email"
              value={form.email}
              onChange={onChangeHandler}
              className="login__input"
              autoComplete="off"
            />
            <label htmlFor="email" className="login__label">
              padawan@mail.com
            </label>
          </div>
          <div className="login__field">
            <input
              id="password"
              type="password"
              placeholder=" "
              name="password"
              value={form.password}
              onChange={onChangeHandler}
              className="login__input"
              autoComplete="off"
            />
            <label htmlFor="password" className="login__label">
              padawan123
            </label>
          </div>
          <button type="submit" className="login__button">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
