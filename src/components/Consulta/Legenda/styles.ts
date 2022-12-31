import { StyleSheet } from 'react-native';

import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    container: {
      justifyContent: 'center'
    },
    text: {
      color: isDarkMode ? 'white' : 'black'
    },
    legendas: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingBottom: 10
    },
    badges: {
      marginLeft: 5
    }
  });
};

export default getStyles;
