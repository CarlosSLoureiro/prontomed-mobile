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
      color: '#f192ff'
    },
    consultasFinalizadas: {
      color: '#68fff5'
    },
    config: {
      backgroundColor: '#ffffff',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: '5',
        strokeWidth: '2'
        // stroke: '#ffa726'
      }
    }
  });
};

export default getStyles;
