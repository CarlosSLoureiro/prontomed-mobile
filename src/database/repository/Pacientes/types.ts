import { Generos, TiposSanguineos } from '@entity/Paciente/enums';

export interface BuscarPacientesContrato {
  nome: string;
  generos: Array<Generos>;
  tiposSanguineos: Array<TiposSanguineos>;
}

export type ValoresDeBuscaPacientes = 'nome' | 'idade' | 'peso' | 'altura' | 'id';

export type ValoresDeOrdemPacientes = 'decrescente' | 'crescente';

export interface OrdenacaoPacientesContrato {
  ordem: ValoresDeOrdemPacientes;
  chave: ValoresDeBuscaPacientes;
}

export interface FiltrosDeBuscarPacientesContrato {
  busca?: BuscarPacientesContrato;
  ordenacao: OrdenacaoPacientesContrato;
}
