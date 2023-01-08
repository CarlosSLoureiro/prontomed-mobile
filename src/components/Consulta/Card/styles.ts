import { StyleSheet } from 'react-native';

import ThemeScheme from '@utils/ThemeScheme';

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
      backgroundColorDoDia: isDarkMode ? '#27262f' : '#edf8ff',
      backgroundColorAgendada: isDarkMode ? '#23292d' : '#fff',
      backgroundColorFinalizada: isDarkMode ? '#202420' : '#eeffed',
      backgroundColorAtrasada: isDarkMode ? '#312c2c' : '#ffeded'
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
        color: '#797979'
      }
    }
  });
};

export default getStyles;
