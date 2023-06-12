import React, { FC, useContext } from 'react';

import { Container } from '@components/Container';
import { LoginForm } from '@components/LoginForm';
import { ThemeContext } from '@components/ThemeProvider';

const AuthPage: FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`theme-${theme}`}>
      <Container>
        <LoginForm />
      </Container>
    </div>
  );
};

export default AuthPage;
