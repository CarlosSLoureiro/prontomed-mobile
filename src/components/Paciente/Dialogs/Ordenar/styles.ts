import { StyleSheet } from 'react-native';

import ThemeScheme from '@utils/ThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();
  const theme = ThemeScheme.getTheme();

  return StyleSheet.create({
    botoes: {
      color: isDarkMode ? '#fff' : '#000',
      labelsChecked: theme.colors.primary
    }
  });
};

export default getStyles;
