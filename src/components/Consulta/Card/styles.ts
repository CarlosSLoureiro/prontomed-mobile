import { StyleSheet } from 'react-native';

import { Generos } from '@entity/Paciente/enums';

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
      }
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
        paddingLeft: 5
      }
    }
  });
};

export default getStyles;
