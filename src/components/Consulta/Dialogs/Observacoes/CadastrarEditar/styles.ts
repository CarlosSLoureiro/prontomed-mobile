import { StyleSheet } from 'react-native';

import ThemeScheme from '@utils/ThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    botoes: {
      color: isDarkMode ? '#fff' : '#000'
    },
    textInput: {
      height: 130
    }
  });
};

export default getStyles;
