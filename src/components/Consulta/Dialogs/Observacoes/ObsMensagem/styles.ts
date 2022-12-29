import { StyleSheet } from 'react-native';

import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    mensagem: {
      marginTop: 20,
      paddingRight: 25
    },
    fundo: {
      backgroundColor: '#dedede',
      padding: 10,
      borderRadius: 5,
      marginLeft: '10%',
      alignSelf: 'flex-start',
      maxWidth: 500,
      zIndex: 2,
      alignItems: 'center'
    },
    seta: {
      position: 'absolute',
      backgroundColor: '#dedede',
      width: 12,
      height: 12,
      bottom: 0,
      borderBottomRightRadius: 5,
      borderTopLeftRadius: 200,
      left: -6
    },
    texto: {
      fontSize: 16,
      color: '#000',
      justifyContent: 'center'
    },
    data: {
      fontSize: 12,
      color: '#000',
      marginLeft: '11%'
    }
  });
};

export default getStyles;
