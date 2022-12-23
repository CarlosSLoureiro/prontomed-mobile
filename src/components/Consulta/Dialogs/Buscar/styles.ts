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
    incluirFinalizadas: {
      paddingVertical: 15,
      backgroundColor: '#ffffff',
      text: {
        fontSize: 18,
        left: 0
      }
    },
    valor: {
    },
    botaoSwitch: {
      position: 'absolute',
      right: 0,
      top: '50%'
    }
  });
};

export default getStyles;
