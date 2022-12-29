import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    text: {
      fontSize: 16,
      paddingTop: 20,
      paddingBottom: 5,
      alignSelf: 'center',
      color: isDarkMode ? 'white' : 'black'
    },
    grafico: {
      margin: 10,
      elevation: 2,
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      shadowColor: '#545454',
      borderRadius: 15
    },
    consultasCadastradas: {
      color: DefaultTheme.colors.primary
    },
    consultasFinalizadas: {
      color: '#00ffee'
    }

  });
};

export default getStyles;
