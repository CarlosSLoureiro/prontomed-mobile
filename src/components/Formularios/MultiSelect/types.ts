import { ViewStyle } from 'react-native';

import { Generos, TiposSanguineos } from '@entity/Paciente/enums';

export interface ListagemContrato {
  _id: string;
  value: Generos | TiposSanguineos;
}

export interface MultiSelectContrato {
  titulo: string;
  selecionarTodos?: boolean;
  valor: string;
  listagem: Array<ListagemContrato>;
  selecionados: Array<ListagemContrato>;
  callback: (value: any) => void;
  style: ViewStyle;
}
