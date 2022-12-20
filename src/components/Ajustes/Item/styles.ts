import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    item: {
      paddingVertical: 15,
      backgroundColor: '#ffffff'
    },
    text: {
      fontSize: 18,
      left: 0,
      paddingLeft: 10
    },
    botao: {
      position: 'absolute',
      right: 10,
      top: '50%'
    }
  });
};

export default getStyles;
