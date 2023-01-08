import { StyleSheet } from 'react-native';

import ThemeScheme from '@utils/ThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    botoes: {
      color: isDarkMode ? '#fff' : '#000'
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
