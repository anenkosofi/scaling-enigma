import React, { FC, useContext } from 'react';

import { Container } from '@components/Container';
import { LoginForm } from '@components/LoginForm';
import { ThemeContext } from '@components/ThemeProvider';

import './Login.scss';

const LoginPage: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`auth theme-${theme}`}>
      <Container>
        <LoginForm />
      </Container>
    </div>
  );
};

export default LoginPage;
