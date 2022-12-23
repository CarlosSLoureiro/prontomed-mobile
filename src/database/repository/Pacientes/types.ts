import { Generos, TiposSanguineos } from '@entity/Paciente/enums';

export interface BuscarPacientesContrato {
  nome: string;
  generos: Array<Generos>;
  tiposSanguineos: Array<TiposSanguineos>;
}

export type ValoresDeBusca = 'nome' | 'idade' | 'peso' | 'altura' | 'id';

export type ValoresDeOrdem = 'decrescente' | 'crescente';

export interface OrdenacaoPacientesContrato {
  ordem: ValoresDeOrdem;
  chave: ValoresDeBusca;
}

export interface FiltrosDeBuscarPacientesContrato {
  busca?: BuscarPacientesContrato;
  ordenacao: OrdenacaoPacientesContrato;
}
