import { Generos, TiposSanguineos } from '@entity/paciente/enums';

export interface ItemListagemDeGenerosContrato {
  _id: string;
  value: Generos;
}

export interface ListagemDeGenerosContrato {
  valor: string;
  listagem: Array<ItemListagemDeGenerosContrato>;
  selecionados: Array<ItemListagemDeGenerosContrato>;
}

export interface ItemListagemDeTiposSanguineosContrato {
  _id: string;
  value: TiposSanguineos;
}

export interface ListagemDeTiposSanguineosContrato {
  valor: string;
  listagem: Array<ItemListagemDeTiposSanguineosContrato>;
  selecionados: Array<ItemListagemDeTiposSanguineosContrato>;
}

export interface ValoresAtuaisFormulario {
  nome: string;
  generos: ListagemDeGenerosContrato;
  tiposSanguineos: ListagemDeTiposSanguineosContrato;
}

export interface BuscarPacienteCallbackContrato {
  nome: string;
  generos: Array<Generos>;
  tiposSanguineos: Array<TiposSanguineos>;
}

export interface BuscarPacienteContrato {
  visivel: boolean;
  setVisivel: Function;
  callback: (busca?: BuscarPacienteCallbackContrato) => void;
}
