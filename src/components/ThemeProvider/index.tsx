import React, { FC, createContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type ThemeContext = { theme: Theme; toggleTheme: () => void };
type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

const getDefaultTheme = (): Theme => {
  const theme = localStorage.getItem('theme');
  return (theme as Theme) || 'light';
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getDefaultTheme());

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const color = theme === 'light' ? '#010101' : '#fafafa';
  const backgroundColor = theme === 'light' ? '#fafafa' : '#1E1F28';

  const bodyEl = document.getElementById('body') as HTMLElement;
  bodyEl.style.color = color;
  bodyEl.style.backgroundColor = backgroundColor;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
