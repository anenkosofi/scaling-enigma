import React, { FC, useContext, useState } from 'react';

import { Container } from '@components/Container';
import { LoginForm } from '@components/LoginForm';
import { RegisterForm } from '@components/RegisterForm';
import { ThemeContext } from '@components/ThemeProvider';

import './Auth.scss';

const AuthPage: FC = () => {
  const { theme } = useContext(ThemeContext);

  const [isLoginPage, setIsLoginPage] = useState(true);

  const switchFormHandler = () => {
    setIsLoginPage(prevState => !prevState);
  };

  return (
    <section className={`auth theme-${theme}`}>
      <Container>
        {isLoginPage ? (
          <LoginForm toggleForm={switchFormHandler} />
        ) : (
          <RegisterForm toggleForm={switchFormHandler} />
        )}
      </Container>
    </section>
  );
};

export default AuthPage;
