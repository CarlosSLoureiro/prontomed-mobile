import { StyleSheet } from 'react-native';

import ThemeScheme from '@utils/ThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    dialog: {
      maxHeight: '70%'
    },
    botoes: {
      color: isDarkMode ? '#fff' : '#000'
    },
    text: {
      fontSize: 16
    },
    genero: {
      paddingTop: 15
    },
    tipoSanguineo: {
      paddingTop: 10
    }
  });
};

export default getStyles;
