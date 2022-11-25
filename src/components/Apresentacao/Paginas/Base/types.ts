import { ColorValue } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface PaginaBaseContrato {
  corDeFundo: ColorValue;
  icone: any;
  titulo: string;
}

export interface PaginaContrato {
  alterarPagina: Function;
  navigation?: StackNavigationProp<ParamListBase>;
}
