import React, { FC, useContext } from 'react';

import { Container } from '@components/Container';
import { LoginForm } from '@components/LoginForm';
import { ThemeContext } from '@components/ThemeProvider';

import './Auth.scss';

const AuthPage: FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`auth theme-${theme}`}>
      <Container>
        <LoginForm />
      </Container>
    </div>
  );
};

export default AuthPage;
