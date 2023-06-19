import React, { FC, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Container } from '@components/Container';
import { LoginForm } from '@components/LoginForm';
import { RegisterForm } from '@components/RegisterForm';
import { ThemeContext } from '@components/ThemeProvider';
import { Pathname } from '@types';

import './Auth.scss';

const AuthPage: FC = () => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  const [isLoginPage, setIsLoginPage] = useState(true);

  useEffect(() => {
    setIsLoginPage(location.pathname === Pathname.LOGIN);
  }, [location.pathname]);

  return (
    <section className={`auth theme-${theme}`}>
      <Container>{isLoginPage ? <LoginForm /> : <RegisterForm />}</Container>
    </section>
  );
};

export default AuthPage;
