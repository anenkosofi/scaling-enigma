import React, { FC, useState } from 'react';

import { Container } from '@components/Container';
import { LoginForm } from '@components/LoginForm';
import { RegisterForm } from '@components/RegisterForm';

import './Auth.scss';

const AuthPage: FC = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const switchFormHandler = () => {
    setIsLoginPage(prevState => !prevState);
  };

  return (
    <section className="auth">
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
