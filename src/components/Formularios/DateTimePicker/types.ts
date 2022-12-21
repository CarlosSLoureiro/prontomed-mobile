import { MutableRefObject } from 'react';
import { ViewStyle } from 'react-native';

export interface DateTimePickerContrato {
  inputRef?: MutableRefObject<any>;
  nextInputRef?: MutableRefObject<any>;
  nome: string;
  valor?: Date;
  callback: (data: Date) => any;
  style?: ViewStyle;
}
