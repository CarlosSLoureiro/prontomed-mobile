import { ColorSchemeName, useColorScheme } from 'react-native';

import { ThemeSchemeContrato } from './types';

// TODO: definir DarkMode manualmente independente do sistema (setDarkMode)

class ThemeScheme implements ThemeSchemeContrato {
  private static _instancia: ThemeScheme;

  public static get Instancia (): ThemeScheme {
    return this._instancia || (this._instancia = new this());
  }

  public getScheme = (): ColorSchemeName => useColorScheme();
  public isDarkModeScheme = (): boolean => false; // this.getScheme() === 'dark';
  public isLightModeScheme = (): boolean => this.getScheme() === 'light';
}

export default ThemeScheme.Instancia;
