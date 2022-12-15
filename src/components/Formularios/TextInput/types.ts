import { MutableRefObject } from 'react';
import { KeyboardType, ViewStyle } from 'react-native';

export interface TextInputContrato {
  inputRef?: MutableRefObject<any>;
  nextInputRef?: MutableRefObject<any>;
  nome: string;
  icon?: string;
  valor?: string;
  telefone?: boolean;
  keyboard?: KeyboardType;
  callback: (str: string) => any;
  onFocusIn?: () => void;
  onFocusOut?: () => void;
  style?: ViewStyle;
}
