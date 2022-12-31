import { StyleSheet } from 'react-native';

import ThemeScheme from '@hooks/useThemeScheme';

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
