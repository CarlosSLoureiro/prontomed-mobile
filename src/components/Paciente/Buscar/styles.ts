import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    dialog: {
      backgroundColor: '#ffffff',
      botoes: {
        color: '#000000'
      }
    },
    nome: {
    },
    select: {
      backgroundColor: '#f9f9f9',
      dialog: {
        backgroundColor: '#ffffff',
        checkboxColor: DefaultTheme.colors.primary,
        checkboxLabel: {
          color: '#000000'
        },
        botoes: {
          color: '#000000'
        }
      },
      genero: {
        paddingTop: 15
      },
      tipoSanguineo: {
        paddingTop: 10
      }
    }
  });
};

export default getStyles;
