import ThemeScheme from '@hooks/useThemeScheme';

const getStyles = () => {
  const isDarkMode = ThemeScheme.isDarkModeScheme();

  return {
    menu: {
      backgroundColor: isDarkMode ? '#1f1f1f' : '#fff',
      shadow: {
        shadowRadius: 8,
        shadowOpacity: isDarkMode ? 0.5 : 0.3,
        shadowColor: isDarkMode ? '#fff' : '#000',
        shadowOffset: {
          width: 0,
          height: 0
        }
      }
    },
    item: {
      activeColor: '#03afff',
      inactiveColor: '#7d8094'
    }
  };
};

export default getStyles;
