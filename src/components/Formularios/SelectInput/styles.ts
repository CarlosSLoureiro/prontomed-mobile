import { StyleSheet } from 'react-native';

import ThemeScheme from '@utils/ThemeScheme';

const getStyles = () => {
  const theme = ThemeScheme.getTheme();
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    select: {
      backgroundColor: isDarkMode ? '#111' : '#f9f9f9',
      outline: {
        color: isDarkMode ? '#a1a1a1' : '#555555'
      },
      dialog: {
        backgroundColor: isDarkMode ? '#383838' : '#fff',
        checkboxColor: theme.colors.primary,
        checkboxLabel: {
          color: isDarkMode ? '#fff' : '#000'
        },
        botoes: {
          color: isDarkMode ? '#fff' : '#000'
        }
      }
    }
  });
};

export default getStyles;
