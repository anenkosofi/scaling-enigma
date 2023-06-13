import React, { useContext } from 'react';
import { RiCalendarTodoLine } from 'react-icons/ri';

import { Container } from '@components/Container';
import { ThemeContext } from '@components/ThemeProvider';
import { UserMenu } from '@components/UserMenu';
import { useAuth } from '@hooks';
import { Theme } from '@types';

import './Header.scss';

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthorized } = useAuth();

  return (
    <header className="header">
      <Container>
        <div className="header__wrapper">
          <div className="header__logo">
            <RiCalendarTodoLine size={24} />
          </div>
          <div className="header__controls">
            {isAuthorized && <UserMenu />}
            <button type="button" className="switch-body" onClick={toggleTheme}>
              <span
                className={
                  theme === Theme.DARK
                    ? 'switch-body__circle switch-body__circle_dark'
                    : 'switch-body__circle'
                }
              ></span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};
