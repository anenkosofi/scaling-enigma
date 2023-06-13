import React, { FC, useState, useRef } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Oval } from 'react-loader-spinner';

import { useAppDispatch, useAppSelector } from '@hooks';
import { login } from '@store/auth/operations';
import { selectIsLoading, selectError } from '@store/auth/selectors';
import { validateTextLength, validateEmail } from '@utils';

import './LoginForm.scss';

const GREEN_COLOR = '#6a983c';

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const passwordRef = useRef(null);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{
    email: string | null;
    password: string | null;
  }>({ email: null, password: null });
  const [focusedField, setFocusedField] = useState({
    email: false,
    password: false,
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const validateRequiredFields = () => {
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
    return setErrors(prevState => ({
      ...prevState,
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
    if (!form.email.length || !form.password.length) {
      return validateRequiredFields();
    }

    dispatch(login(form));

    setForm({ email: '', password: '' });
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
        <h1 className="login__title">Sign in</h1>
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
          <div className="login__field">
            <input
              id="email"
              type="email"
              placeholder=" "
              name="email"
              value={form.email}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              onFocus={onFocusHandler}
              className="login__input"
              autoComplete="off"
            />
            <FiMail size="24" className="login__icon" />
            <label htmlFor="email" className="login__label">
              E-mail
            </label>
            {errors.email && (
              <p className="login__input-error">{errors.email}</p>
            )}
          </div>
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
                color={GREEN_COLOR}
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor={GREEN_COLOR}
                strokeWidth={8}
                strokeWidthSecondary={2}
              />
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
