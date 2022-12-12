import { ViewStyle } from 'react-native';

export interface DatePickerContrato {
  nome: string;
  valor?: Date;
  callback: (data: Date) => any;
  style?: ViewStyle;
}
