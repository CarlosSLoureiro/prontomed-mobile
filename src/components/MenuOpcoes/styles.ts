import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return {
    container: {
      paddingBottom: 100,
      marginRight: -10
    },
    fab: {
      backgroundColor: isDarkMode ? '#151515' : '#fff',
      shadowColor: isDarkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.5)'
    }
  };
};

export default getStyles;
