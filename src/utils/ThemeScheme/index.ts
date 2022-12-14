import { ColorSchemeName, useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, Theme } from 'react-native-paper';

import ThemeSchemeInterface from './interface';

// TODO: definir DarkMode manualmente independente do sistema (setDarkMode)

class ThemeScheme implements ThemeSchemeInterface {
  private static _instancia: ThemeScheme;

  public static get Instancia (): ThemeScheme {
    return this._instancia || (this._instancia = new this());
  }

  public getScheme = (): ColorSchemeName => useColorScheme();
  public isDarkModeScheme = (): boolean => (global.isDarkMode = this.getScheme() === 'dark');
  public isLightModeScheme = (): boolean => (global.isLightMode = this.getScheme() === 'light');
  public getTheme = (): Theme => this.isDarkModeScheme() ? DarkTheme : DefaultTheme;
}

export default ThemeScheme.Instancia;
