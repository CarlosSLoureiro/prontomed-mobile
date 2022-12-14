import { StyleSheet } from 'react-native';

import ThemeScheme from '@utils/ThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: isDarkMode ? '#111' : '#eee'
    },
    headerTitle: {
      color: isDarkMode ? '#ffffff' : '#000000'
    },
    header: {
      backgroundColor: isDarkMode ? '#000' : '#fff',
      borderColor: isDarkMode ? '#000' : '#fff'
    },
    conteudo: {
      flexGrow: 1,
      minHeight: '100%'
    },
    menu: {
      bottom: 30
    },
    text: {
      fontSize: 16,
      paddingVertical: 20,
      alignSelf: 'center',
      color: isDarkMode ? 'white' : 'black'
    },
    icon: {
      alignSelf: 'center',
      color: isDarkMode ? 'white' : 'black'
    }
  });
};

export default getStyles;
