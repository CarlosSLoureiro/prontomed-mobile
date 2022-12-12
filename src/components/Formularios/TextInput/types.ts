import { KeyboardType, ViewStyle } from 'react-native';

export interface TextInputContrato {
  nome: string;
  icon?: string;
  valor?: string;
  telefone?: boolean;
  keyboard?: KeyboardType;
  callback: (str: string) => any;
  style?: ViewStyle;
}
