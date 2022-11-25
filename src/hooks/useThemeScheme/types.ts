import { ColorSchemeName } from 'react-native';

export interface ThemeSchemeContrato {
  getScheme: () => ColorSchemeName;
  isDarkModeScheme: () => void;
  isLightModeScheme: () => void;
}
