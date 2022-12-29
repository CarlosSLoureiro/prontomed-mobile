import { ColorSchemeName, useColorScheme } from 'react-native';

import ThemeSchemeInterface from './interface';

// TODO: definir DarkMode manualmente independente do sistema (setDarkMode)

class ThemeScheme implements ThemeSchemeInterface {
  private static _instancia: ThemeScheme;

  public static get Instancia (): ThemeScheme {
    return this._instancia || (this._instancia = new this());
  }

  public getScheme = (): ColorSchemeName => useColorScheme();
  public isDarkModeScheme = (): boolean => this.getScheme() === 'dark';
  public isLightModeScheme = (): boolean => this.getScheme() === 'light';
}

export default ThemeScheme.Instancia;
