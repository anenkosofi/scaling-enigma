import React, { FC, createContext, useState, useEffect } from 'react';

import { Theme } from 'types/theme';

type ThemeContext = { theme: Theme; toggleTheme: () => void };
type ThemeProviderProps = {
  children: React.ReactNode;
};

const themeColors = {
  lightColor: '#fafafa',
  darkColor: '#010101',
  darkBackground: '#1E1F28',
};

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

const getDefaultTheme = (): Theme => {
  return localStorage.getItem('theme') as Theme;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getDefaultTheme() || Theme.LIGHT);

  const toggleTheme = () => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const color =
    theme === Theme.LIGHT ? themeColors.darkColor : themeColors.lightColor;
  const backgroundColor =
    theme === Theme.LIGHT ? themeColors.lightColor : themeColors.darkBackground;

  const bodyEl = document.getElementById('body') as HTMLElement;
  bodyEl.style.color = color;
  bodyEl.style.backgroundColor = backgroundColor;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
