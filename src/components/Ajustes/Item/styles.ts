import { StyleSheet } from 'react-native';

import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    item: {
      paddingVertical: 15,
      backgroundColor: isDarkMode ? '#000000' : '#ffffff'
    },
    text: {
      fontSize: 18,
      left: 0,
      paddingLeft: 10,
      color: isDarkMode ? '#ffffff' : '#000000'
    },
    botao: {
      position: 'absolute',
      right: 10,
      top: '50%'
    }
  });
};

export default getStyles;
