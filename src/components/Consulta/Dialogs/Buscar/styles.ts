import { StyleSheet } from 'react-native';

import ThemeScheme from '@utils/ThemeScheme';

const getStyles = () => {
  const theme = ThemeScheme.getTheme();
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    botoes: {
      color: isDarkMode ? '#fff' : '#000'
    },
    incluirFinalizadas: {
      paddingVertical: 15,
      backgroundColor: 'transparent',
      text: {
        fontSize: 18,
        left: 0,
        color: isDarkMode ? '#fff' : '#000'
      }
    },
    valor: {
    },
    botaoSwitch: {
      position: 'absolute',
      right: 0,
      top: '50%',
      activeColor: theme.colors.primary,
      unactiveColor: 'gray',
      thumbColor: isDarkMode ? '#dfdfdf' : '#fff'
    }
  });
};

export default getStyles;
