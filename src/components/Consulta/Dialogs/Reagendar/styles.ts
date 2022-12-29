import { StyleSheet } from 'react-native';

import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    dialog: {
      backgroundColor: '#ffffff',
      botoes: {
        color: '#000000'
      }
    },
    text: {
      fontSize: 16
    },
    input: {
      marginTop: 10
    }
  });
};

export default getStyles;
