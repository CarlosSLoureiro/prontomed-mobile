import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    select: {
      backgroundColor: '#f9f9f9',
      dialog: {
        backgroundColor: '#ffffff',
        checkboxColor: DefaultTheme.colors.primary,
        checkboxLabel: {
          color: '#000000'
        },
        botoes: {
          color: '#000000'
        }
      }
    }
  });
};

export default getStyles;
