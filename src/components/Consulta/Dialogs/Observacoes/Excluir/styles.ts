import { StyleSheet } from 'react-native';

import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    dialog: {
      backgroundColor: '#ffffff',
      botoes: {
        color: '#000000'
      },
      excluir: {
        color: '#FF0000'
      }
    },
    text: {
      fontSize: 16
    },
    msg: {
      fontStyle: 'italic',
      fontWeight: '300'
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
