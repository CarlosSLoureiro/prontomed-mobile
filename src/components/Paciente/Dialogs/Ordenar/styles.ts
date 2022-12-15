import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    dialog: {
      backgroundColor: '#ffffff',
      title: {
        color: '#000000'
      },
      labels: {
        color: '#000000',
        checked: DefaultTheme.colors.primary
      },
      botoes: {
        color: '#000000'
      }
    }
  });
};

export default getStyles;
