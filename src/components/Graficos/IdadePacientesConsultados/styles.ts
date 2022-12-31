import { StyleSheet } from 'react-native';

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
      shadowColor: isDarkMode ? '#b3b3b3' : '#545454',
      borderRadius: 15,
      marginBottom: 150
    },
    config: {
      backgroundColor: isDarkMode ? '#000' : '#fff',
      backgroundGradientFrom: isDarkMode ? '#000' : '#fff',
      backgroundGradientTo: isDarkMode ? '#000' : '#fff',
      decimalPlaces: 0,
      color: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }
  });
};

export default getStyles;
