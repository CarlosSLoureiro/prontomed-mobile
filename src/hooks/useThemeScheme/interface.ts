import { ColorSchemeName } from 'react-native';
import { Theme } from 'react-native-paper';

export default interface ThemeSchemeInterface {
  getScheme: () => ColorSchemeName;
  isDarkModeScheme: () => void;
  isLightModeScheme: () => void;
  getTheme: () => Theme;
}
