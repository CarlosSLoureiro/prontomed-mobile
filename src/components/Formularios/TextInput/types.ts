import { ViewStyle } from 'react-native';

export interface TextInputContrato {
  nome: string;
  icon?: string;
  valor?: string;
  callback: (str: string) => any;
  style?: ViewStyle;
}
