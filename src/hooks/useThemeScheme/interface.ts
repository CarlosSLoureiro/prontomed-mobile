import { ColorSchemeName } from 'react-native';

export default interface ThemeSchemeInterface {
  getScheme: () => ColorSchemeName;
  isDarkModeScheme: () => void;
  isLightModeScheme: () => void;
}
