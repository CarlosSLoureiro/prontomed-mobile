import { Generos, TiposSanguineos } from '@entity/Paciente/enums';

export interface BuscarPacientesContrato {
  nome: string;
  generos: Array<Generos>;
  tiposSanguineos: Array<TiposSanguineos>;
}

export interface OrdenacaoPacientesContrato {
  ordem: string;
  chave: string;
}

export interface FiltrosDeBuscarPacientesContrato {
  busca?: BuscarPacientesContrato;
  ordenacao: OrdenacaoPacientesContrato;
}
