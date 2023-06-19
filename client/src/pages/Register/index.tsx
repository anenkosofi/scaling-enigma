import React, { FC, useContext } from 'react';

import { Container } from '@components/Container';
import { RegisterForm } from '@components/RegisterForm';
import { ThemeContext } from '@components/ThemeProvider';

const RegisterPage: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`auth theme-${theme}`}>
      <Container>
        <RegisterForm />
      </Container>
    </div>
  );
};

export default RegisterPage;
