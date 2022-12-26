import { StyleSheet } from 'react-native';

import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    dialog: {
      backgroundColor: '#ffffff',
      maxHeight: '70%',
      botoes: {
        color: '#000000'
      }
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
