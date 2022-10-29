import { useColorScheme } from "react-native";

// TODO: definir DarkMode manualmente independente do sistema (setDarkMode)

export const getScheme = () => useColorScheme();
export const isDarkModeScheme = ():boolean => getScheme() === 'dark';
export const isLightModeScheme = ():boolean => getScheme() === 'light';
