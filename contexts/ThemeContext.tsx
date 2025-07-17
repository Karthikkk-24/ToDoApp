import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeType = 'light' | 'dark';

interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  cardBackground: string;
  placeholder: string;
  success: string;
  error: string;
  warning: string;
}

interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const lightTheme: ThemeColors = {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#CBFF00',
  secondary: '#666666',
  accent: '#CBFF00',
  border: '#E0E0E0',
  cardBackground: '#F8F8F8',
  placeholder: '#999999',
  success: '#4CAF50',
  error: '#FF5252',
  warning: '#FF9800',
};

const darkTheme: ThemeColors = {
  background: '#000000',
  text: '#FFFFFF',
  primary: '#CBFF00',
  secondary: '#666666',
  accent: '#CBFF00',
  border: '#333333',
  cardBackground: '#111111',
  placeholder: '#666666',
  success: '#4CAF50',
  error: '#FF5252',
  warning: '#FF9800',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>('dark');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('app_theme');
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setThemeState(savedTheme as ThemeType);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const saveTheme = async (newTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem('app_theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    saveTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
