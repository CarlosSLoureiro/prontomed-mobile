import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    botoes: {
      color: isDarkMode ? '#fff' : '#000'
    },
    excluir: {
      color: isDarkMode ? '#f55' : '#f00'
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
