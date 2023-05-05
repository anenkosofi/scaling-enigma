import React, { useContext } from 'react';
import { RiCalendarTodoLine } from 'react-icons/ri';

import { Container } from '../Container';
import { ThemeContext } from '../ThemeProvider';

import './ThemeToggler.scss';

export const ThemeToggler = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <Container>
        <div className="header__wrapper">
          <div className="header__logo">
            <RiCalendarTodoLine size={24} />
          </div>
          <button type="button" className="switch-body" onClick={toggleTheme}>
            <span
              className={
                theme === 'dark'
                  ? 'switch-body__circle switch-body__circle--dark'
                  : 'switch-body__circle'
              }
            ></span>
          </button>
        </div>
      </Container>
    </header>
  );
};
