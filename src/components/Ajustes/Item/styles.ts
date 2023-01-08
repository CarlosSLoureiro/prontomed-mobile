import { StyleSheet } from 'react-native';

import ThemeScheme from '@utils/ThemeScheme';

const getStyles = () => {
  const theme = ThemeScheme.getTheme();
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
      top: '50%',
      activeColor: theme.colors.primary,
      unactiveColor: 'gray',
      thumbColor: isDarkMode ? '#dfdfdf' : '#fff'
    }
  });
};

export default getStyles;
