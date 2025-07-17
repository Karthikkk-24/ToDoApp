import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeType = 'light' | 'dark' | 'midnight' | 'forest' | 'ocean' | 'sunset';

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
  secondary: '#999999',
  accent: '#CBFF00',
  border: '#333333',
  cardBackground: '#0A0A0A',
  placeholder: '#666666',
  success: '#4CAF50',
  error: '#FF5252',
  warning: '#FF9800',
};

const midnightTheme: ThemeColors = {
  background: '#0D1117',
  text: '#F0F6FC',
  primary: '#CBFF00',
  secondary: '#8B949E',
  accent: '#CBFF00',
  border: '#30363D',
  cardBackground: '#161B22',
  placeholder: '#6E7681',
  success: '#4CAF50',
  error: '#FF5252',
  warning: '#FF9800',
};

const forestTheme: ThemeColors = {
  background: '#0F1419',
  text: '#E6FFFA',
  primary: '#CBFF00',
  secondary: '#81C784',
  accent: '#CBFF00',
  border: '#2E7D32',
  cardBackground: '#1B5E20',
  placeholder: '#4CAF50',
  success: '#4CAF50',
  error: '#FF5252',
  warning: '#FF9800',
};

const oceanTheme: ThemeColors = {
  background: '#0A1929',
  text: '#E3F2FD',
  primary: '#CBFF00',
  secondary: '#64B5F6',
  accent: '#CBFF00',
  border: '#1976D2',
  cardBackground: '#1565C0',
  placeholder: '#42A5F5',
  success: '#4CAF50',
  error: '#FF5252',
  warning: '#FF9800',
};

const sunsetTheme: ThemeColors = {
  background: '#1A0E0A',
  text: '#FFF3E0',
  primary: '#CBFF00',
  secondary: '#FFAB91',
  accent: '#CBFF00',
  border: '#FF5722',
  cardBackground: '#D84315',
  placeholder: '#FF8A65',
  success: '#4CAF50',
  error: '#FF5252',
  warning: '#FF9800',
};

const themes: Record<ThemeType, ThemeColors> = {
  light: lightTheme,
  dark: darkTheme,
  midnight: midnightTheme,
  forest: forestTheme,
  ocean: oceanTheme,
  sunset: sunsetTheme,
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
      if (savedTheme && Object.keys(themes).includes(savedTheme)) {
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

  const colors = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
