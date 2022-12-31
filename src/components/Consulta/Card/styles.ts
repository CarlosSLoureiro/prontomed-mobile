import { StyleSheet } from 'react-native';

import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    card: {
      marginHorizontal: 4,
      marginVertical: 8,
      alignSelf: 'center',
      ultimo: {
        marginBottom: 130
      },
      backgroundColorDoDia: isDarkMode ? '#373645' : '#edf8ff',
      backgroundColorAgendada: isDarkMode ? '#363f45' : '#fff',
      backgroundColorFinalizada: isDarkMode ? '#313731' : '#eeffed',
      backgroundColorAtrasada: isDarkMode ? '#4b4343' : '#ffeded'
    },
    texts: {
      color: isDarkMode ? 'white' : 'black'
    },
    icon: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
      bottom: 0,
      marginRight: 0,
      size: 24,
      text: {
        fontSize: 24,
        paddingLeft: 5,
        color: isDarkMode ? 'white' : 'black'
      }
    }
  });
};

export default getStyles;
