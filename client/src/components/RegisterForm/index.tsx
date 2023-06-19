import React, { FC, useState, useRef } from 'react';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Oval } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';

import { FormField } from '@components/FormField';
import { useAppDispatch, useAppSelector } from '@hooks';
import { register } from '@store/auth/operations';
import { selectIsLoading, selectError } from '@store/auth/selectors';
import { Colors, Pathname } from '@types';
import { validateTextLength, validateEmail } from '@utils';

import '@components/LoginForm/LoginForm.scss';
import '@pages/Login/Login.scss';

export const RegisterForm: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const passwordRef = useRef(null);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{
    username: string | null;
    email: string | null;
    password: string | null;
  }>({ username: null, email: null, password: null });
  const [focusedField, setFocusedField] = useState({
    username: false,
    email: false,
    password: false,
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const validateRequiredFields = () => {
    let usernameError: string | null = null;
    let emailError: string | null = null;
    let passwordError: string | null = null;
    if (focusedField.email) {
      emailError = !form.email.length
        ? validateTextLength(form.email)
        : validateEmail(form.email);
    }
    if (focusedField.password) {
      passwordError = validateTextLength(form.password);
    }
    if (focusedField.username) {
      usernameError = validateTextLength(form.username);
    }
    return setErrors(prevState => ({
      ...prevState,
      name: usernameError,
      email: emailError,
      password: passwordError,
    }));
  };

  const onBlurHandler: React.FocusEventHandler<HTMLInputElement> = () => {
    validateRequiredFields();
  };

  const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    setFocusedField(prevState => ({
      ...prevState,
      [name]: true,
    }));
    setErrors(prevState => ({
      ...prevState,
      [name]: null,
    }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email.length || !form.username.length || !form.password.length) {
      return validateRequiredFields();
    }

    dispatch(register(form));

    setForm({ username: '', email: '', password: '' });
  };

  const setInputType = (type: string) => {
    if (passwordRef.current) {
      (passwordRef.current as HTMLInputElement).type = type;
    }
  };

  const showPasswordHandler = () => {
    setInputType('text');
    setTimeout(() => {
      setInputType('password');
    }, 3000);
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <h1 className="login__title">Sign up</h1>
        <p className="login__error">{error}</p>
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
          <FormField
            id="username"
            type="text"
            name="username"
            label="Username"
            value={form.username}
            error={errors.username}
            icon={FiUser}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
          />
          <FormField
            id="email"
            type="email"
            name="email"
            label="E-mail"
            value={form.email}
            error={errors.email}
            icon={FiMail}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
          />
          <div className="login__field">
            <input
              id="password"
              type="password"
              placeholder=" "
              name="password"
              value={form.password}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              onFocus={onFocusHandler}
              className="login__input"
              autoComplete="off"
              ref={passwordRef}
            />
            <button
              type="button"
              className="login__icon login__icon_password"
              onClick={showPasswordHandler}
            >
              <FiLock size="24" />
            </button>
            <label htmlFor="password" className="login__label">
              Password
            </label>
            {errors.password && (
              <p className="login__input-error">{errors.password}</p>
            )}
          </div>
          <button type="submit" className="login__button" disabled={isLoading}>
            {isLoading ? (
              <Oval
                height={24}
                width={24}
                color={Colors.ACCENT}
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor={Colors.ACCENT}
                strokeWidth={8}
                strokeWidthSecondary={2}
              />
            ) : (
              'Sign up'
            )}
          </button>
        </form>
      </div>
      <p className="login__question">
        Alredy have an account?
        <NavLink to={`/${Pathname.LOGIN}`} className="login__link">
          Sign in
        </NavLink>
      </p>
    </div>
  );
};
