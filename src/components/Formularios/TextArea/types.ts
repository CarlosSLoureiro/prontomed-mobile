import { MutableRefObject } from 'react';
import { ViewStyle } from 'react-native';

export interface TextAreaContrato {
  inputRef?: MutableRefObject<any>;
  nextInputRef?: MutableRefObject<any>;
  focar?: boolean;
  nome: string;
  valor?: string;
  callback: (str: string | undefined) => any;
  onFocusIn?: () => void;
  onFocusOut?: () => void;
  style?: ViewStyle;
}
